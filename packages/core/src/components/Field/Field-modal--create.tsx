import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import ModelT from 'src/components/BuilderComponents/Model';
import Relationship from 'src/components/BuilderComponents/Relationship';
import { Field } from 'src/components/Field/Field';
import { ADD_NEW_FIELD } from 'src/components/Field/Field--queries';
import { GET_ONLY_MODELS_NAMES } from 'src/components/Model/Model--queries';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

const FieldModalCreate = ({ model }) => {
  const modalID = ModalIDs.ModelAddField;
  const { closeModal } = useModal(modalID);
  return (
    <Modal id={modalID} title="Add New Field">
      <Query<{ models: ModelT[] }>
        displayName={Models.Models}
        query={GET_ONLY_MODELS_NAMES}
      >
        {({ data }) => {
          const fieldTypeFields = Field.addFieldTypeFields;
          const relationshipTypeFields = Relationship.getAddRelationshipFormFields(
            data!.models,
          );
          const fields = [...fieldTypeFields, ...relationshipTypeFields];
          return (
            <Form
              fields={fields}
              mutation={ADD_NEW_FIELD}
              submitButton={{ text: 'Create Field' }}
              onComplete={closeModal()}
              onSubmit={(values, { mutate }) =>
                Field.createField({ values, mutate, modelId: model.id })
              }
            />
          );
        }}
      </Query>
    </Modal>
  );
};

export default FieldModalCreate;
