import React from 'react';
// import Reddit from 'src/components/BuilderComponents/Reddit';
import withPageProps from 'src/hoc/withPageProps';
import snoowrap from 'snoowrap';

const ApiPage = () => {
  const request = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'LseSekzOE2mhiw',
    clientSecret: 'M27HMiGyKBsPZagGE4x8oV_WXbg',
    username: 'chernenkoEgor',
    password: 'goqkdtks.123',
  });

  console.log(request);

  const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'LseSekzOE2mhiw',
    clientSecret: 'M27HMiGyKBsPZagGE4x8oV_WXbg',
    refreshToken: 'BbKuUou1vNnMD4PKBzq9XQuHX4c',
  });
  console.log(r);
  return <div>Api Test</div>;
};

export default withPageProps({ hasSidebar: true })(ApiPage);
