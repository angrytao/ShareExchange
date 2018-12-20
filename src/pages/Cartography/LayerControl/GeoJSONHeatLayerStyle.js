import { Component } from 'react';
import { Slider, Input, Select } from 'antd';
import st from './GeoJSONHeatLayerStyle.less';
import std from '../default.less';

class GeoJSONHeatLayerStyle extends Component {
  constructor(ps) {
    super(ps);
    let { config } = ps;
    this.state = {
      opacity: config.opacity !== undefined ? config.opacity : 1,
      radius: config.radius !== undefined ? config.radius : 15,
      blur: config.blur !== undefined ? config.blur : 25,
      name: config.name,
      gradient:
        config.gradient !== undefined
          ? config.gradient
          : { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1: 'red' },
    };
    console.log(ps.layer);
  }

  gradients = {
    default: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1: 'red' },
    red: { 0.4: '#fbb', 0.6: '#f88', 0.7: '#f66', 0.8: '#f44', 1: 'red' },
    blue: { 0.4: '#bbf', 0.6: '#88f', 0.7: '#66f', 0.8: '#44f', 1: 'blue' },
    green: { 0.4: '#bfb', 0.6: '#8f8', 0.7: '#6f6', 0.8: '#4f4', 1: 'green' },
  };

  getColor(x) {
    return `linear-gradient(90deg,${x['0.4']},${x['0.6']},${x['0.7']},${x['0.8']},${x['1']}`;
  }

  getColorBand() {
    let cmp = [];
    for (let x in this.gradients) {
      let i = this.gradients[x];
      cmp.push(
        <Select.Option
          value={i}
          style={{
            background: this.getColor(i),
          }}
        >
          &emsp;
        </Select.Option>
      );
    }
    return cmp;
  }

  render() {
    let { config } = this.props;
    let { opacity, radius, blur, name, gradient } = this.state;
    return (
      <div className={st.GeoJSONHeatLayerStyle}>
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>标题</div>
            </div>
            <div className={std.fitem_i}>
              <Input
                style={{ width: 220 }}
                value={name}
                onChange={e => {
                  let v = e.target.value;
                  this.props.config.name = v;
                  let { parent } = this.props;
                  parent.setState({});
                  this.setState({ name: v });
                }}
              />
            </div>
          </div>
        </div>
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>色带</div>
            </div>
            <div className={std.fitem_i}>
              <Select
                className={st.colorband}
                style={{
                  width: 220,
                  background: this.getColor(gradient),
                }}
                value={gradient}
                onChange={e => {
                  this.props.config.gradient = e;
                  this.setState({ gradient: e });
                  this.props.layer.setOptions({ gradient: e });
                }}
              >
                {this.getColorBand()}
              </Select>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>透明度</div>
            </div>
            <div className={std.fitem_i}>
              <div className={std.edititem}>
                <div className={std.valuebar}>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={opacity}
                    onChange={e => {
                      this.props.config.opacity = e;
                      this.setState({ opacity: e });
                      let layer = this.props.layer;
                      $(layer._heat._canvas).css('opacity', e);
                    }}
                  />
                </div>
                <div className={std.value}>{opacity}</div>
              </div>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>渲染半径</div>
            </div>
            <div className={std.fitem_i}>
              <div className={std.edititem}>
                <div className={std.valuebar}>
                  <Slider
                    min={0}
                    max={100}
                    value={radius}
                    onChange={e => {
                      this.props.config.radius = e;
                      this.setState({ radius: e });
                      this.props.layer.setOptions({ radius: e });
                    }}
                  />
                </div>
                <div className={std.value}>{radius}</div>
              </div>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>模糊半径</div>
            </div>
            <div className={std.fitem_i}>
              <div className={std.edititem}>
                <div className={std.valuebar}>
                  <Slider
                    min={0}
                    max={100}
                    value={blur}
                    onChange={e => {
                      this.props.config.blur = e;
                      this.setState({ blur: e });
                      this.props.layer.setOptions({ blur: e });
                    }}
                  />
                </div>
                <div className={std.value}>{blur}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeoJSONHeatLayerStyle;
