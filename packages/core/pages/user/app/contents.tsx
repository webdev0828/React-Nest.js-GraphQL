import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Row, Table } from 'antd';
import React from 'react';
import { ModelT } from 'src/components/BuilderComponents/Model';
import ContentCreateModal from 'src/components/Content/Content-add--modal';
import ContentEditModal from 'src/components/Content/Content-edit--modal';
import { GET_MODEL_CONTENT } from 'src/components/Model/Model--queries';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import Query from 'src/utils/Query';

type UrlParams = {
  url: {
    params: {
      username: string;
      app: string;
      model: string;
      id: string;
    };
  };
};

const Header = ({ model }) => {
  const modalID = ModalIDs.ContentCreate;
  const columns = model.getTableColumnsWithoutButtons();
  const { toggleModal } = useModal(modalID);
  return (
    <Row>
      <h1>
        {model.name}
        <Button
          style={{ float: 'right' }}
          onClick={toggleModal({ data: { model, columns } })}
        >
          NEW
        </Button>
      </h1>
    </Row>
  );
};

const modelPage = (props: UrlParams) => {
  const {
    url: {
      params: { username, app, model, id },
    },
  } = props;

  const variables = {
    where: {
      id,
    },
  };

  return (
    <Query<{ model: ModelT }>
      displayName={Models.Content}
      query={GET_MODEL_CONTENT}
      variables={variables}
    >
      {({ data }) => {
        const model = data!.model;
        const columns = model.getTableColumns();
        const dataSource = model.getSourceData();
        return (
          <>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered
              title={() => <Header model={model} />}
              footer={() => 'Footer'}
            />
            <ContentEditModal />
            <ContentCreateModal />
          </>
        );
      }}
    </Query>
  );
};

export default withPageProps({ hasSidebar: true })(modelPage);
