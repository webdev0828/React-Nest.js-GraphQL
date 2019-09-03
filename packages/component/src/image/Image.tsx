import React from 'react';

export default class Image extends React.Component {
  render() {
    const src = 'https://placeimg.com/640/480/nature';
    return <img width="240px" src={src} />;
  }
}
