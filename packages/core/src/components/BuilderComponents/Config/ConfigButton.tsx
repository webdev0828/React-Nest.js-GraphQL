import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  ButtonSize,
  ButtonType,
  MutationUpdateConfigButtonArgs,
} from 'src/graphql/__generated__/graphql-api';

export interface IConfigButton {
  type: ButtonType;
  size: ButtonSize;
  ghost: boolean;
  block: boolean;
}

export class ConfigButton implements Model<IConfigButton> {
  public id: string;
  public type: ButtonType;
  public size: ButtonSize;
  public ghost: boolean;
  public block: boolean;
  static fragments = () => gql`
    fragment ConfigButtonFragment on ConfigButton {
      id
      ghost
      block
      type
      size
    }
  `;

  constructor({ id, type, size, ghost, block }: Model<IConfigButton>) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.ghost = ghost;
    this.block = block;
  }

  public getEditFormFields() {
    const buttonTypeOptions = Object.keys(ButtonType).map(type => ({
      label: type,
      value: type,
    }));
    const sizeOptions = Object.keys(ButtonSize).map(size => ({
      label: size,
      value: size,
    }));
    return [
      {
        inputType: INPUT_TYPES.Select,
        name: 'type',
        options: buttonTypeOptions,
        value: this.type,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'size',
        options: sizeOptions,
        value: this.size,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Checkbox,
        name: 'ghost',
        value: this.ghost,
      },
      {
        inputType: INPUT_TYPES.Checkbox,
        name: 'block',
        value: this.block,
      },
    ];
  }

  public updateButton({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigButtonArgs = {
      data: {
        type: values.type,
        size: values.size,
        ghost: values.ghost,
        block: values.block,
      },
      where: {
        id: this.id,
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_PAGE(),
            variables: { where: { slug: pageSlug } },
          },
        ],
      });
      resolve('Success');
    });
  }

  static mapConfigButtons(
    configs: Model<IConfigButton>[],
  ): Model<IConfigButton>[] {
    return configs.map(
      (config: Model<IConfigButton>) => new ConfigButton(config),
    );
  }
}
