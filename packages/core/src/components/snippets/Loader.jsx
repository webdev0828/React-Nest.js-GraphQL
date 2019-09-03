import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ClipLoader sizeUnit="px" size={25} color="#1890ff" loading />
  </div>
);

export default Loader;
