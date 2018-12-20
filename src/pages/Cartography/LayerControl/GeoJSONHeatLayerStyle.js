import { Component } from 'react';
import { Slider, Input } from 'antd';
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
    };
  }

  render() {
    let { config } = this.props;
    let { opacity, radius, blur, name } = this.state;

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
