import React from 'react';

export default class NodeTitle extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.node.title,
      initialValue: props.node.title,
    };
  }

  render() {
    const { node, path, editingNode, setNodeTitle, setEditNode } = this.props;
    const textStyle = {
      fontSize: '1.1rem',
      color: 'black',
      display: 'block',
      width: '100x',
    };
    return (
      <>
        {editingNode && editingNode.node.id === node.id ? (
          <input
            type="text"
            key={node.key}
            autoFocus={true}
            style={textStyle}
            value={this.state.value}
            onBlur={e => {
              const value = e.target.value || this.state.initialValue;
              this.setState({ value }, () => {
                setNodeTitle(value);
                setEditNode(null);
              });
            }}
            onChange={e => this.setState({ value: e.target.value })}
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditNode(path);
            }}
            style={textStyle}
          >
            {node.title}
          </span>
        )}
      </>
    );
  }
}
