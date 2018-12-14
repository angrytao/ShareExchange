import { Component } from 'react';
import { Slider } from 'antd';
import st from './HeatLayerStyle.less';
import std from '../default.less';

class HeatLayerStyle extends Component {
  state = {
    opacity: 0,
    radius: 0,
    blur: 0,
  };

  render() {
    let { opacity, radius, blur } = this.state;
    return (
      <div className={st.HeatLayerStyle}>
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
                    onChange={e => this.setState({ opacity: e })}
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
                    max={50}
                    value={radius}
                    onChange={e => this.setState({ radius: e })}
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
                    max={50}
                    value={blur}
                    onChange={e => this.setState({ blur: e })}
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

export default HeatLayerStyle;
