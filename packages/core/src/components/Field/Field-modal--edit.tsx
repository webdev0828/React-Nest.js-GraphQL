import { Modal, useModal } from '@codelab/component';
import { Form } from '@codelab/component/index';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import ModelT from 'src/components/BuilderComponents/Model';
import Relationship from 'src/components/BuilderComponents/Relationship';
import { UPDATE_FIELD } from 'src/components/Field/Field--queries';
import { GET_ONLY_MODELS_NAMES } from 'src/components/Model/Model--queries';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

const FieldModalEdit = () => {
  const modalID = ModalIDs.ModelEditField;
  const {
    closeModal,
    data: { model, field },
  } = useModal(modalID);

  if (!model || !field) {
    return null;
  }

  return (
    <Modal id={modalID} title="Edit Field">
      <Query<{ models: ModelT[] }>
        displayName={Models.Models}
        query={GET_ONLY_MODELS_NAMES}
      >
        {({ data }) => {
          const {
            fields: fieldTypeFields,
            sections: fieldTypeSections,
          } = field.editModelFormFields(data!.models);
          const {
            fields: relationshipTypeFields,
            sections: relationshipTypeSections,
          } = Relationship.getEditRelationshipFormFields(field, data!.models);
          return (
            <Form
              fields={[...fieldTypeFields, ...relationshipTypeFields]}
              sections={[...fieldTypeSections, ...relationshipTypeSections]}
              mutation={UPDATE_FIELD}
              submitButton={{ text: 'OK' }}
              onComplete={closeModal()}
              onSubmit={(values, { mutate }) => {
                // field.editField(id, values, models, { mutate })
              }}
            />
          );
        }}
      </Query>
    </Modal>
  );
};

export default FieldModalEdit;
