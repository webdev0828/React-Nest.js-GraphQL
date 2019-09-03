import React from 'react';
import withPageProps from 'src/hoc/withPageProps';

const HomeWithAuth = () => {
  return (
    <>
      <h1> Home Page! </h1>
    </>
  );
};

export default withPageProps({ hasSidebar: false })(HomeWithAuth);
