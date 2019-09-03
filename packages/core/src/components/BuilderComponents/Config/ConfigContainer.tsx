import { Model } from 'src/components/BuilderComponents/interfaces';
import { MutationUpdateConfigContainerArgs } from 'src/graphql/__generated__/graphql-api';
import { GET_CONTAINERS } from 'src/state/apollo-local-state/container/containerState';

export interface IConfigContainer {
  responsive: boolean;
}

export class ConfigContainer implements Model<IConfigContainer> {
  public id: string;
  public responsive: boolean;

  constructor({ id, responsive }: Model<IConfigContainer>) {
    this.id = id;
    this.responsive = responsive;
  }

  public updateConfig(values, { mutate }): Promise<any> {
    const variables: MutationUpdateConfigContainerArgs = {
      where: {
        id: this.id,
      },
      data: { responsive: values.responsive === 2 ? true : false },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_CONTAINERS,
          },
        ],
      });
      resolve('Success');
    });
  }
}

export default ConfigContainer;
