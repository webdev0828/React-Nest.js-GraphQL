import { notification } from 'antd';
import React from 'react';
import slugify from 'slugify';
import { App, IApp } from 'src/components/App/App';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { USER_ME_QUERY } from 'src/components/User/User--queries';
import { MutationRegisterArgs } from 'src/graphql/__generated__/graphql-api';

export interface IUser {
  // From model
  username: string;
  slug: string;
  apps?: Model<IApp>[];
}

export class User implements Model<IUser> {
  apps: Model<IApp>[];
  id: string;
  username: string;

  constructor({ id, username, apps = [] }: Model<IUser>) {
    this.id = id;
    this.username = username;
    this.apps = App.mapApps(apps);
  }

  get slug() {
    return slugify(this.username, {
      replacement: '-',
      lower: true,
    });
  }

  public static register(data, { mutate, client }) {
    return new Promise(async (resolve, reject) => {
      const variables: MutationRegisterArgs = {
        data,
      };

      let res = await mutate({
        variables,
      });

      const {
        data: {
          register: { token },
        },
      } = res;

      // Store token
      localStorage.setItem('token', token);

      // Refetch with token
      res = await client.query({
        query: USER_ME_QUERY,
        fetchPolicy: 'network-only',
      });

      console.log(res);

      notification['success']({
        message: 'Register success!',
        description: 'You have successfully created an account',
      });

      resolve(res);
    });
  }

  public static login(data, { mutate, client }) {
    return new Promise(async (resolve, reject) => {
      const variables: MutationRegisterArgs = {
        data,
      };

      let res = await mutate({
        variables,
      });

      if (res.errors) {
        resolve();
        return;
      }

      const {
        data: {
          login: { token },
        },
      } = res;

      // Store token
      localStorage.setItem('token', token);

      // Refetch with token
      res = await client.query({
        query: USER_ME_QUERY,
        fetchPolicy: 'network-only',
      });

      notification['success']({
        message: 'Login success!',
        description: 'You have successfully logged in.',
      });

      resolve(res);
    });
  }

  public static logout() {
    localStorage.removeItem('token');
    notification['success']({
      message: 'Log out success!',
      description: 'You have successfully logged out.',
    });
  }
}
