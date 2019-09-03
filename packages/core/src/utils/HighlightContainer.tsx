import hljs from 'highlight.js';
import React from 'react';
import 'highlight.js/styles/monokai.css';

const previewComponent = ({ code, className }) => (
  <code className={className}>{code}</code>
);

const HighlightContainer = (WrappedComponent: any) => {
  return class Highlight extends React.Component<any, {}> {
    private el: HTMLInputElement;
    constructor(props) {
      super(props);
      this.setEl = this.setEl.bind(this);
    }
    componentDidMount() {
      this.highlightCode();
    }

    componentDidUpdate() {
      this.highlightCode();
    }

    componentWillReceiveProps() {
      this.highlightCode();
    }

    highlightCode() {
      const nodes = this.el.querySelectorAll('pre code');

      for (let i: number = 0; i < nodes.length; i += 1) {
        hljs.highlightBlock(nodes[i]);
      }
    }

    setEl(el: HTMLInputElement) {
      this.el = el;
    }

    render() {
      const { style } = this.props;
      return (
        <pre ref={this.setEl} style={style}>
          <WrappedComponent {...this.props} />
        </pre>
      );
    }
  };
};

export default HighlightContainer(previewComponent);
