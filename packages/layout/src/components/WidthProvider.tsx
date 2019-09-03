import React from 'react';
import ReactDOM from 'react-dom';

interface IWPProps {
  className?: string;
  measureBeforeMount: boolean;
  style?: any;
}

interface IWPState {
  width: number;
}

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
const WidthProvider = ComposedComponent =>
  class WidthProvider extends React.Component<IWPProps, IWPState> {
    static defaultProps = {
      measureBeforeMount: false,
    };

    mounted: boolean = false;

    constructor(props) {
      super(props);

      this.state = {
        width: 1280,
      };
    }

    componentDidMount() {
      this.mounted = true;

      window.addEventListener('resize', this.onWindowResize);
      // Call to properly set the breakpoint and resize the elements.
      // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
      // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.
      this.onWindowResize();
    }

    // componentWillUnmount() {
    //   this.mounted = false;
    //   window.removeEventListener('resize', this.onWindowResize);
    // }

    onWindowResize = () => {
      if (!this.mounted) return;
      // eslint-disable-next-line
      const node = ReactDOM.findDOMNode(this); // Flow casts this to Text | Element
      if (node instanceof HTMLElement) {
        this.setState({ width: node.offsetWidth });
      }
    };

    render() {
      const { measureBeforeMount, ...rest } = this.props;
      if (measureBeforeMount && !this.mounted) {
        return (
          <div className={this.props.className} style={this.props.style} />
        );
      }

      return <ComposedComponent {...rest} {...this.state} />;
    }
  };

export default WidthProvider;
