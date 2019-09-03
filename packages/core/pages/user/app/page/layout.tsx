import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Card, Col, Icon } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { APPS_QUERY } from 'src/components/App/App--queries';
import { Global } from 'src/components/BuilderComponents/Global';
import ContainerIconDelete from 'src/components/Container/Container-icon--delete';
import ContainerModalCreate from 'src/components/Container/Container-model--create';
import ContainerPopoverSettings from 'src/components/Container/Container-popover--settings';
import ElementIconDelete from 'src/components/Element/Element-icon--delete';
import GlobalModalUpdate from 'src/components/Global/Global-model--update';
import GridIconDelete from 'src/components/Grid/Grid-icon--delete';
import GridModalCreate from 'src/components/Grid/Grid-modal--create';
import GridModalUpdate from 'src/components/Grid/Grid-modal--update';
import GridPopoverSettings from 'src/components/Grid/Grid-popover--settings';
import { Page } from 'src/components/Page/Page';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import { IRouterPage } from 'src/route/Router';
import Query from 'src/utils/Query';
import styled from 'styled-components';

const RightBlock = styled.div`
  padding-left: 30px;
`;

const ContainerItem = ({ container }) => {
  const grids = container.grids;
  return (
    <Col span={16}>
      <Card>
        <ContainerPopoverSettings container={container} />
        <ContainerIconDelete container={container} />
        <h3>Container: {container.id}</h3>
      </Card>
      <RightBlock key={`${container.id}_0`}>
        {grids.map((grid, idx) => {
          const elements = grid.elements;
          return (
            <Col span={16} key={`${container.id}_${idx}_1`}>
              <Card key={idx}>
                <GridPopoverSettings grid={grid} />
                <GridIconDelete grid={grid} />
                <h3>Grid: {grid.name}</h3>
              </Card>
              <RightBlock key={`${container.id}_1`}>
                {elements.map(element => {
                  const component = element.component;
                  return (
                    <Card key={element.id}>
                      <ElementIconDelete element={element} />
                      <h2>{component.type}</h2>
                    </Card>
                  );
                })}
              </RightBlock>
            </Col>
          );
        })}
      </RightBlock>
    </Col>
  );
};

const ContainerList = ({ containers }) =>
  containers.map((container, idx) => (
    <ContainerItem container={container} key={idx} />
  ));

const GlobalItem = () => {
  const { openModal } = useModal(ModalIDs.GlobalUpdate);
  const { query } = useRouter<IRouterPage>();

  return (
    <Query<{ global: Global }>
      displayName={Models.Global}
      query={APPS_QUERY}
      variables={{ where: { slug: query!.app } }}
    >
      {({ data }) => {
        const global = data!.global;
        return (
          <Col span={16}>
            <Card>
              <Icon type="setting" onClick={openModal({ data: { global } })} />
              <h3>Global: {global.id}</h3>
            </Card>
          </Col>
        );
      }}
    </Query>
  );
};

const MainPage = () => {
  const { query } = useRouter<IRouterPage>();
  const { openModal } = useModal(ModalIDs.ContainerCreate);

  return (
    <Query<{ page: Page }>
      displayName={Models.Page}
      query={GET_PAGE()}
      variables={{ where: { slug: query!.page } }}
    >
      {({ data }) => {
        const pg = data!.page;
        const containers = pg.containers ? pg.containers : [];
        return (
          <>
            <section>
              <h2>App: {query!.app}</h2>
              <h3>Username: {query!.username}</h3>
              <h3>Page: {pg.title}</h3>
              <Button onClick={openModal()}>Create Container</Button>
            </section>
            <ContainerModalCreate />
            <GridModalCreate />
            <GridModalUpdate />
            <GlobalModalUpdate />
            <GlobalItem />
            <ContainerList containers={containers} />
          </>
        );
      }}
    </Query>
  );
};

export default withPageProps({ hasSidebar: true })(MainPage);
