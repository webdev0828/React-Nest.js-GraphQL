import { INPUT_TYPES } from '@codelab/component';
import { Model } from 'src/components/BuilderComponents/interfaces';
import ModelT from 'src/components/BuilderComponents/Model';
import {
  IRelationship,
  Relationship,
} from 'src/components/BuilderComponents/Relationship';
import { GET_MODEL } from 'src/components/Model/Model--queries';
import {
  FieldType,
  MutationCreateFieldArgs,
  MutationDeleteFieldArgs,
  MutationUpdateFieldArgs,
  OperatorType,
  Status,
} from 'src/graphql/__generated__/graphql-api';

export interface IField {
  key: string;
  type: string;
  relationship: Model<IRelationship> | null;
}

export class Field implements Model<IField> {
  public id: string;
  public key: string;
  public type: string;
  public relationship: Model<IRelationship> | null;

  constructor(field: Model<IField>) {
    this.id = field.id;
    this.key = field.key;
    this.type = field.type;
    this.relationship = field.relationship
      ? new Relationship(field.relationship)
      : null;
  }

  static createField({ values, modelId, mutate }): Promise<any> {
    /**
     * If field type is relationship then add appropriate data.
     */
    let relationship =
      values.fieldType === FieldType.Relationship
        ? {
            create: {
              status: Status.Published,
              type: values.relationshipType,
              name: values.field,
              subject: {
                connect: {
                  id: modelId,
                },
              },
              predicate: {
                connect: {
                  id: values.predicate_id,
                },
              },
            },
          }
        : {};

    let variables: MutationCreateFieldArgs = {
      data: {
        relationship,
        status: Status.Published,
        key: values.key,
        type: values.fieldType,
        model: {
          connect: {
            id: modelId,
          },
        },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_MODEL,
            variables: {
              where: {
                id: modelId,
              },
            },
          },
        ],
      }).then(() => {
        /**
         * Create the inverse relationship
         */
        if (values.fieldType === FieldType.Relationship) {
          relationship = {
            create: {
              status: Status.Published,
              type: values.relationshipType,
              name: values.key,
              subject: {
                connect: {
                  id: values.predicate_id,
                },
              },
              predicate: {
                connect: {
                  id: modelId,
                },
              },
            },
          };
          variables = {
            data: {
              relationship,
              status: Status.Published,
              key: values.field,
              type: values.fieldType,
              model: {
                connect: {
                  id: values.predicate_id,
                },
              },
            },
          };
          mutate({
            variables,
            refetchQueries: [
              {
                query: GET_MODEL,
                variables: {
                  where: {
                    id: modelId,
                  },
                },
              },
            ],
          });
        }
      });
      resolve('Success');
    });
  }

  static get fieldTypeOptions() {
    return Object.keys(FieldType).map(fieldType => ({
      label: FieldType[fieldType],
      value: FieldType[fieldType],
    }));
  }

  public editField(id, values, models, { mutate }): Promise<any> {
    let relationship = {};

    if (values.fieldType === FieldType.Relationship) {
      relationship = {
        create: {
          status: Status.Published,
          type: values.relationshipType,
          name: values.field,
          subject: {
            connect: {
              id,
            },
          },
          predicate: {
            connect: {
              id: values.predicate_id,
            },
          },
        },
      };
    }

    const variables: MutationUpdateFieldArgs = {
      data: {
        relationship,
        key: values.key,
        type: values.type,
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
            // query: GET_FIELDS,
          },
        ],
      });
      resolve('Success');
    });
  }

  public delete({ mutate, model }): Promise<any> {
    const variables: MutationDeleteFieldArgs = {
      where: {
        id: this.id,
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_MODEL,
            variables: {
              where: {
                id: model.id,
              },
            },
          },
        ],
      });
      resolve('Success');
    });
  }

  static get addFieldTypeFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'key',
        value: '',
        placeholder: 'Input New Field Name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'fieldType',
        placeholder: 'Choose New Field Type',
        options: Field.fieldTypeOptions,
        value: Field.fieldTypeOptions[0].value,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public editModelFormFields(models) {
    return {
      fields: [
        {
          inputType: INPUT_TYPES.Select,
          name: 'subject_id',
          label: 'Model',
          options: ModelT.modelFieldOptions(models),
          value: this.relationship ? this.relationship.subject.name : null,
          disabled: true,
          shouldRender: () => this.relationship,
        },
        {
          inputType: INPUT_TYPES.Text,
          name: 'key',
          label: 'Display Name',
          value: this.key,
          validation: [{ required: true, msg: 'Required!!' }],
        },
        {
          inputType: INPUT_TYPES.Select,
          name: 'type',
          value: this.type,
          label: 'Field Type',
          options: Field.fieldTypeOptions,
          validation: [{ required: true, msg: 'Required!!' }],
        },
      ],
      sections: [
        {
          label: 'Subject Model',
          position: 'subject_id',
          order: 'before',
        },
      ],
    };
  }

  public getQueryField() {
    switch (this.type) {
      case FieldType.Relationship:
        return [
          {
            inputType: INPUT_TYPES.Checkbox,
            name: `include_${this.id}`,
            label: `${this.type} : ${this.key}`,
          },
        ];
      case FieldType.String:
        return [
          {
            inputType: INPUT_TYPES.Checkbox,
            name: `include_${this.id}`,
          },
          {
            inputType: INPUT_TYPES.Select,
            name: `operator_${this.id}`,
            label: `${this.key} : ${this.type}`,
            options: this.operatorTypeOptions,
          },
          {
            inputType: INPUT_TYPES.Text,
            name: `value_${this.id}`,
            label: '',
          },
        ];
      case FieldType.Integer:
        return [
          {
            inputType: INPUT_TYPES.Checkbox,
            name: `include_${this.id}`,
          },
          {
            inputType: INPUT_TYPES.Select,
            name: `operator_${this.id}`,
            label: `${this.key} : ${this.type}`,
            options: this.operatorTypeOptions,
          },
          {
            inputType: INPUT_TYPES.Number,
            name: `value_${this.id}`,
          },
        ];
    }
    return [];
  }

  get operatorTypeOptions() {
    return Object.keys(OperatorType).map(type => {
      switch (OperatorType[type]) {
        case OperatorType.Greater:
          return {
            label: '<',
            value: type,
          };
        case OperatorType.Less:
          return {
            label: '>',
            value: type,
          };
        case OperatorType.Equal:
          return {
            label: '=',
            value: type,
          };
      }
      return {};
    });
  }

  static mapFields(fields: Model<IField>[] = []): Model<IField>[] {
    return fields.map((field: Model<IField>) => new Field(field));
  }
}

export default Field;
