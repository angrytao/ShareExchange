import { Component } from 'react';
import { Slider, Input } from 'antd';
import st from './ArcGISTileDynamicLayer.less';
import std from '../default.less';

class ArcGISTileDynamicLayer extends Component {
  constructor(ps) {
    super(ps);
    let { config } = ps;
    this.state = {
      opacity: config.opacity !== undefined ? config.opacity : 1,
      name: config.name,
    };
  }

  render() {
    let { config } = this.props;
    let { opacity, name } = this.state;

    return (
      <div className={st.ArcGISTileDynamicLayer}>
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
                      this.props.layer.setOpacity(e);
                    }}
                  />
                </div>
                <div className={std.value}>{opacity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArcGISTileDynamicLayer;
