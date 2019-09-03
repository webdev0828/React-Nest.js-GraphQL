import React, { CSSProperties } from 'react';
import { ChromePicker } from 'react-color';
import { Input } from 'antd';
import { get } from 'lodash';

export default class AppColorPicker extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  togglePicker(e) {
    this.setState(prevState => {
      return { visible: !prevState.visible };
    });
  }
  hidePicker() {
    this.setState({
      visible: false,
    });
  }

  colorToString(color) {
    if (typeof color === 'string') return color;
    if (get(color, 'rgb.a', 1) < 1) {
      const { rgb } = color;
      return `rgba(${rgb.a},${rgb.r},${rgb.b},${rgb.a})`;
    }
    return color.hex;
  }

  render() {
    const { name, value, onChange, setFieldValue } = this.props;
    const popover: CSSProperties = {
      position: 'absolute',
      zIndex: 2,
    };
    const cover: CSSProperties = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    return (
      <>
        {/* to-do has to improve more */}
        <Input
          value={this.colorToString(value)}
          onChange={onChange}
          name={name}
          onClick={e => this.togglePicker(e)}
        />
        {this.state.visible && (
          <div style={popover}>
            <div style={cover} onClick={() => this.hidePicker()} />
            <ChromePicker
              color={value.rgb || value}
              onChange={(color, e) => setFieldValue(name, color)}
            />
          </div>
        )}
      </>
    );
  }
}
