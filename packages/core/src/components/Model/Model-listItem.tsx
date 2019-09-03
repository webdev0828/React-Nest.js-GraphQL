import { Card } from 'antd';
import React from 'react';
import { Link } from 'src/route/routes';

const ModelListItem = ({ model, username, app }) => {
  return (
    <Link
      route="user.app.model.id"
      params={{
        username,
        app,
        model: model.name.toLowerCase(),
        id: model.id,
      }}
    >
      <Card hoverable={true}>
        <h2>{model.name}</h2>
      </Card>
    </Link>
  );
};

export default ModelListItem;
