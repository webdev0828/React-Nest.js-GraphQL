import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import ModelT from 'src/components/BuilderComponents/Model';
import { IField } from 'src/components/Field/Field';
import {
  FieldType,
  RelationshipType,
} from 'src/graphql/__generated__/graphql-api';

export interface ISubject {
  id: string;
  name: string;
}

export interface IPredicate {
  id: string;
  name: string;
  fields: Model<IField>[];
}

export interface IRelationship {
  type: string;
  name: string;
  subject: Model<ISubject>;
  predicate: Model<IPredicate>;
}

export class Relationship implements Model<IRelationship> {
  public id: string;
  public type: string;
  public name: string;
  public subject: Model<ISubject>;
  public predicate: Model<IPredicate>;
  static fieldTypes: [];

  static fragments = () => gql`
    fragment RelationshipFragment on Relationship {
      id
      name
      type
      subject {
        name
      }
      predicate {
        name
      }
    }
  `;

  constructor(relationship: Model<IRelationship>) {
    this.id = relationship.id;
    this.type = relationship.type;
    this.name = relationship.name;
    this.subject = relationship.subject;
    this.predicate = relationship.predicate;
  }

  static get relationshipTypeOptions() {
    return Object.keys(RelationshipType).map(type => ({
      label: RelationshipType[type],
      value: RelationshipType[type],
    }));
  }

  static getEditRelationshipFormFields(field, models) {
    return {
      fields: [
        {
          inputType: INPUT_TYPES.Select,
          name: 'relationshipType',
          placeholder: 'Select a Field Type',
          label: 'Relation',
          value: field.relationship ? field.relationship.type : '',
          options: Relationship.relationshipTypeOptions,
          shouldRender: values => values.type === FieldType.Relationship,
        },
        {
          inputType: INPUT_TYPES.Select,
          name: 'predicate_id',
          placeholder: 'Select a Model',
          label: 'Model',
          value: field.relationship ? field.relationship.predicate.name : '',
          options: ModelT.modelFieldOptions(models),
          shouldRender: values => values.type === FieldType.Relationship,
        },
        {
          inputType: INPUT_TYPES.Text,
          name: 'field',
          label: 'Display Name',
          value: field.relationship ? field.relationship.name : [],
          placeholder: 'Input the Field Name of Selected Model',
          shouldRender: values => values.type === FieldType.Relationship,
        },
      ],
      sections: [
        {
          label: 'Predicate Model',
          position: 'predicate_id',
          order: 'before',
        },
      ],
    };
  }

  static getAddRelationshipFormFields(models) {
    const modelNames = models.map(model => ({
      label: model.name,
      value: model.id,
    }));

    return [
      {
        inputType: INPUT_TYPES.Select,
        name: 'relationshipType',
        placeholder: 'Select Relationship Type',
        options: Relationship.relationshipTypeOptions,
        // validation: [{ required: true, msg: 'Required!!' }],
        shouldRender: values => values.fieldType === FieldType.Relationship,
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'predicate_id',
        placeholder: 'Select a Model',
        options: modelNames,
        // validation: [{ required: true, msg: 'Required!!' }],
        shouldRender: values => values.fieldType === FieldType.Relationship,
      },
      {
        inputType: INPUT_TYPES.Text,
        name: 'field',
        placeholder: 'Input the Field Name of Selected Model',
        // validation: [{ required: true, msg: 'Required!!' }],
        shouldRender: values => values.fieldType === FieldType.Relationship,
      },
    ];
  }

  static mapRelationships(
    relationships: Model<IRelationship>[] = [],
  ): Model<IRelationship>[] {
    return relationships.map(
      (relationship: Model<IRelationship>) => new Relationship(relationship),
    );
  }
}

export default Relationship;
