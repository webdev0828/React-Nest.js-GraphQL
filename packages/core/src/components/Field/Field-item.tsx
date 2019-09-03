import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Card, Col, Icon, Row } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_FIELD } from 'src/components/Field/Field--queries';

export const FieldItem = ({ field, model }) => {
  const { toggleModal } = useModal(ModalIDs.ModelEditField);
  return (
    <Row>
      <Col span={12}>
        <Card>
          <Icon
            style={{ float: 'right' }}
            type="setting"
            onClick={toggleModal({ data: { field, model } })}
          />
          <Mutation mutation={DELETE_FIELD}>
            {deleteField => (
              <Icon
                style={{ float: 'right' }}
                type="close"
                onClick={() => field.delete({ model, mutate: deleteField })}
              />
            )}
          </Mutation>
          <h3>
            {field.key} : {field.type}
          </h3>
        </Card>
      </Col>
    </Row>
  );
};
