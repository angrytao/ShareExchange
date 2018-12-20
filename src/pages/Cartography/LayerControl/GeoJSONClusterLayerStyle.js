import { Component } from 'react';
import { Slider, Input, Tabs, Popover, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import st from './GeoJSONClusterLayerStyle.less';
import std from '../default.less';
import {
  getCircleMarker,
  getPictureMarker,
  getSVGHtml,
  getSVGIcon,
  svgIcons,
  dfCircleMarkerStyle,
  dfPictureMarkerStyle,
} from '../Map/icons';
import { getLayer } from '../Map/layers';

class GeoJSONClusterLayerStyle extends Component {
  constructor(ps) {
    super(ps);
    let { config } = ps;
    let { style } = config;
    this.state = {
      type: style.type,
    };

    if (style.type === 'circleMarker') {
      this.state.circleMarkerStyle = style;
      this.state.pictureMarkerStyle = { ...dfPictureMarkerStyle };
    } else {
      this.state.circleMarkerStyle = { ...dfCircleMarkerStyle };
      this.state.pictureMarkerStyle = style;
    }
    this.state.name = config.name;
  }

  getPictureMarkers() {
    return (
      <Tabs size="small">
        {svgIcons.map(i => {
          return (
            <Tabs.TabPane tab={i.name} key={i.category}>
              <div className={st.icons}>
                {i.icons.map(t => (
                  <div
                    className={st.iconwrapper}
                    onClick={e => {
                      let { pictureMarkerStyle } = this.state;
                      pictureMarkerStyle.icon = t;
                      this.setState({ pictureMarkerStyle: pictureMarkerStyle });
                      this.changeMarkerIcon2();
                    }}
                  >
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref={'#' + t} />
                    </svg>
                  </div>
                ))}
              </div>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    );
  }

  changeMarkerIcon() {
    console.log('changeMarkerIcon');
    let { circleMarkerStyle } = this.state;
    let { config, layer, parent } = this.props;
    let icon = getCircleMarker(circleMarkerStyle);
    config.style = circleMarkerStyle;
    let { id } = config;

    parent.layers[id].remove();
    layer = getLayer(config);
    parent.layers[id] = layer.addTo(parent.map);
  }

  changeMarkerIcon2() {
    console.log('changeMarkerIcon2');
    let { pictureMarkerStyle } = this.state;
    let { icon, size } = pictureMarkerStyle;
    let { config, layer, parent } = this.props;
    let icon2 = getPictureMarker(icon, size);
    config.style = pictureMarkerStyle;

    let { id } = config;
    parent.layers[id].remove();
    layer = getLayer(config);
    parent.layers[id] = layer.addTo(parent.map);
  }

  render() {
    let { config } = this.props;
    let { name, type, circleMarkerStyle, pictureMarkerStyle } = this.state;

    return (
      <div className={st.GeoJSONClusterLayerStyle}>
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
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>图标类型</div>
            </div>
            <div className={std.fitem_i}>
              <Radio.Group
                value={type}
                size="small"
                buttonStyle="solid"
                onChange={e => {
                  this.setState({ type: e.target.value });
                }}
              >
                <Radio.Button value="circleMarker">填充图标</Radio.Button>
                <Radio.Button value="pictureMarker">图片图标</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          {type === 'circleMarker' ? (
            <div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>填充</div>
                </div>
                <div className={std.fitem_i}>
                  <div className={st.edititem}>
                    <Popover
                      overlayClassName={st.popover}
                      content={
                        <SketchPicker
                          color={`rgba(${circleMarkerStyle.color.r},${circleMarkerStyle.color.g},${
                            circleMarkerStyle.color.b
                          },${circleMarkerStyle.color.a})`}
                          onChange={e => {
                            let { r, g, b, a } = e.rgb;
                            let { circleMarkerStyle } = this.state;
                            circleMarkerStyle.color = { r, g, b, a };
                            this.changeMarkerIcon();
                            this.setState({ circleMarkerStyle: circleMarkerStyle });
                          }}
                        />
                      }
                      trigger="click"
                    >
                      <div
                        className={st.color}
                        style={{
                          background: `rgba(${circleMarkerStyle.color.r},${
                            circleMarkerStyle.color.g
                          },${circleMarkerStyle.color.b},${circleMarkerStyle.color.a})`,
                        }}
                      />
                    </Popover>
                    <div className={st.valuebar}>
                      <Slider
                        min={0}
                        max={50}
                        value={circleMarkerStyle.size}
                        onChange={e => {
                          let { circleMarkerStyle } = this.state;
                          circleMarkerStyle.size = e;
                          this.changeMarkerIcon();
                          this.setState({ circleMarkerStyle: circleMarkerStyle });
                        }}
                      />
                    </div>
                    <div className={st.value}>{circleMarkerStyle.size}</div>
                  </div>
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>光晕</div>
                </div>
                <div className={std.fitem_i}>
                  <div className={st.edititem}>
                    <div className={st.valuebar}>
                      <Slider
                        min={0}
                        max={50}
                        value={circleMarkerStyle.shadowSize}
                        onChange={e => {
                          let { circleMarkerStyle } = this.state;
                          circleMarkerStyle.shadowSize = e;
                          this.changeMarkerIcon();
                          this.setState({ circleMarkerStyle: circleMarkerStyle });
                        }}
                      />
                    </div>
                    <div className={st.value}>{circleMarkerStyle.shadowSize}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {this.getPictureMarkers()}
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>大小</div>
                </div>
                <div className={std.fitem_i}>
                  <div className={st.edititem}>
                    <div className={st.valuebar}>
                      <Slider
                        min={10}
                        max={50}
                        value={pictureMarkerStyle.size}
                        onChange={e => {
                          let { pictureMarkerStyle } = this.state;
                          pictureMarkerStyle.size = e;
                          this.changeMarkerIcon2();
                          this.setState({ pictureMarkerStyle: pictureMarkerStyle });
                        }}
                      />
                    </div>
                    <div className={st.value}>{pictureMarkerStyle.size}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ArcGISClusterLayerStyle;
