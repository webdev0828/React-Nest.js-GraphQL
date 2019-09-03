import { Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Radio } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { SET_CURRENT_COMPONENT } from 'src/state/apollo-local-state/component/componentState';
import { GET_COMPONENTS } from 'src/state/apollo-local-state/element/elementState';
import Query from 'src/utils/Query';
import styled from 'styled-components';

const TopBlock = styled.div`
  padding-top: 30px;
`;

const ElementModalCreate = () => {
  const modalID = ModalIDs.ElementCreate;
  const { closeModal, data } = useModal(modalID);
  const { gridID } = data;
  const { toggleModal } = useModal(ModalIDs.ConfigComponentCreate);

  return (
    <Modal id={modalID}>
      <Mutation mutation={SET_CURRENT_COMPONENT}>
        {setCurrentComponent => (
          <Query query={GET_COMPONENTS}>
            {({ data }) => {
              const components = data!.components;
              return (
                <>
                  <Radio.Group
                    defaultValue={components[0].type}
                    buttonStyle="solid"
                    onChange={e => {
                      console.log(e);
                      setCurrentComponent({
                        variables: {
                          component: {
                            currentComponentType: e.target.value,
                            currentComponentID: e.target.id,
                          },
                        },
                      });
                    }}
                  >
                    {components.map(component => {
                      return (
                        <Radio.Button
                          value={component.type}
                          id={component.id}
                          key={component.id}
                        >
                          {component.type}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                  <TopBlock>
                    <Button onClick={toggleModal({ data: { gridID } })}>
                      Set Component Config
                    </Button>
                  </TopBlock>
                </>
              );
            }}
          </Query>
        )}
      </Mutation>
    </Modal>
  );
};

export default ElementModalCreate;
