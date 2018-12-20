import { Component } from 'react';
import { Slider, Input, Tabs, Popover, Radio, Select, Switch, Checkbox } from 'antd';
import { SketchPicker } from 'react-color';
import st from './GeoJSONPointLayerStyle.less';
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
import MarkerSymbolPanel from '../Map/MarkerSymbolPanel';

class GeoJSONPointLayerStyle extends Component {
  constructor(ps) {
    super(ps);
    let { config } = ps;
    let { render } = config;
    this.state = {
      renderType: render.type,
      simple: render.symbol,
      popup: config.popup || {},
      mark: config.mark || {
        position: 'top',
        fontSize: 12,
        color: { r: 0, g: 0, b: 0, a: 1 },
        shadowColor: { r: 255, g: 255, b: 255, a: 1 },
        shadowSize: 2,
      },
    };
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

  resetPopup(popup) {
    let { layer, config } = this.props;
    layer.closePopup().unbindPopup();
    if (popup.show) {
      layer.bindPopup(function(layer) {
        let html = '';
        let ps = layer.feature.properties;
        for (let i in ps) {
          html += `<tr><th>${i}</th><td>${ps[i]}</td></tr>`;
        }
        html = `<div class="ct-popup-tb"><table>${html}</table></div>`;
        return html;
      });
    }
    config.popup = popup;
  }

  resetMark(mark) {
    let { layer, config } = this.props;
    if (mark.show && mark.field) {
      layer.eachLayer(l => {
        l.closeTooltip()
          .unbindTooltip()
          .bindTooltip(
            `<div style="color:rgba(${mark.color.r},${mark.color.g},${mark.color.b},${
              mark.color.a
            });font-size:${mark.fontSize}px;text-shadow:0 0 ${mark.shadowSize}px rgba(${
              mark.shadowColor.r
            },${mark.shadowColor.g},${mark.shadowColor.b},${mark.shadowColor.a}),0 0 ${
              mark.shadowSize
            }px rgba(${mark.shadowColor.r},${mark.shadowColor.g},${mark.shadowColor.b},${
              mark.shadowColor.a
            }),0 0 ${mark.shadowSize}px rgba(${mark.shadowColor.r},${mark.shadowColor.g},${
              mark.shadowColor.b
            },${mark.shadowColor.a}),0 0 ${mark.shadowSize}px rgba(${mark.shadowColor.r},${
              mark.shadowColor.g
            },${mark.shadowColor.b},${mark.shadowColor.a}),0 0 ${mark.shadowSize}px rgba(${
              mark.shadowColor.r
            },${mark.shadowColor.g},${mark.shadowColor.b},${mark.shadowColor.a});">${
              l.feature.properties[mark.field]
            }</div>`,
            {
              className: 'ct-draw-transparent',
              permanent: true,
              direction: mark.position,
            }
          );
      });
    } else {
      layer.eachLayer(l => {
        l.closeTooltip().unbindTooltip();
      });
    }
    config.mark = mark;
  }

  render() {
    let { name, renderType, simple, popup, mark } = this.state;
    let { layer } = this.props;
    // console.log(layer.fields);
    return (
      <div className={st.GeoJSONPointLayerStyle}>
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
          <MarkerSymbolPanel
            symbol={simple}
            onMarkerChange={e => {
              let { config, layer } = this.props;
              config.render = {
                geoType: 'point',
                type: 'simple',
                symbol: e,
              };
              layer.setRender(config.render);
            }}
          />
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>弹出框</div>
              <div className={std.fitem_st}>是否显示弹出框</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={popup.show}
                onChange={e => {
                  let { popup } = this.state;
                  popup.show = e;
                  this.resetPopup(popup);
                  this.setState({ popup: popup });
                }}
              />
            </div>
          </div>
          {/* <div className={std.fitem}>
            {layer.fields && layer.fields.map(i => <Checkbox>{i}</Checkbox>)}
          </div> */}
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>标注</div>
              <div className={std.fitem_st}>是否显示标注</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={mark.show}
                onChange={e => {
                  let { mark } = this.state;
                  mark.show = e;
                  this.resetMark(mark);
                  this.setState({ mark: mark });
                }}
              />
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>字段</div>
            </div>
            <div className={std.fitem_i}>
              <Select
                value={mark.field}
                style={{ width: 220 }}
                onChange={e => {
                  let { mark } = this.state;
                  mark.field = e;
                  this.resetMark(mark);
                  this.setState({ mark: mark });
                }}
              >
                {layer.fields.map(i => (
                  <Select.Option value={i}>{i}</Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>位置</div>
            </div>
            <div className={std.fitem_i}>
              <Radio.Group
                size="small"
                value={mark.position}
                buttonStyle="solid"
                onChange={e => {
                  let { mark } = this.state;
                  mark.position = e.target.value;
                  this.setState({ mark: mark });
                  this.resetMark(mark);
                }}
              >
                <Radio.Button value="top">上</Radio.Button>
                <Radio.Button value="right">右</Radio.Button>
                <Radio.Button value="center">中</Radio.Button>
                <Radio.Button value="bottom">下</Radio.Button>
                <Radio.Button value="left">左</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt} style={{ fontSize: '13px' }}>
                颜色
                <br />
                字号
              </div>
            </div>
            <div className={std.fitem_i}>
              <div className={st.edititem}>
                <Popover
                  overlayClassName={st.popover}
                  content={
                    <SketchPicker
                      color={`rgba(${mark.color.r},${mark.color.g},${mark.color.b},${
                        mark.color.a
                      })`}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        let { mark } = this.state;
                        mark.color = { r, g, b, a };
                        this.resetMark(mark);
                        this.setState({ mark: mark });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div
                    className={st.color}
                    style={{
                      background: `rgba(${mark.color.r},${mark.color.g},${mark.color.b},${
                        mark.color.a
                      })`,
                    }}
                  />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={12}
                    max={48}
                    value={mark.fontSize}
                    onChange={e => {
                      let { mark } = this.state;
                      mark.fontSize = e;
                      this.resetMark(mark);
                      this.setState({ mark: mark });
                    }}
                  />
                </div>
                <div className={st.value}>{mark.fontSize}</div>
              </div>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt} style={{ fontSize: '13px' }}>
                文字
                <br />
                阴影
              </div>
            </div>
            <div className={std.fitem_i}>
              <div className={st.edititem}>
                <Popover
                  overlayClassName={st.popover}
                  content={
                    <SketchPicker
                      color={`rgba(${mark.shadowColor.r},${mark.shadowColor.g},${
                        mark.shadowColor.b
                      },${mark.shadowColor.a})`}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        let { mark } = this.state;
                        mark.shadowColor = { r, g, b, a };
                        this.resetMark(mark);
                        this.setState({ mark: mark });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div
                    className={st.color}
                    style={{
                      background: `rgba(${mark.shadowColor.r},${mark.shadowColor.g},${
                        mark.shadowColor.b
                      },${mark.shadowColor.a})`,
                    }}
                  />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={0}
                    max={5}
                    value={mark.shadowSize}
                    onChange={e => {
                      let { mark } = this.state;
                      mark.shadowSize = e;
                      this.resetMark(mark);
                      this.setState({ mark: mark });
                    }}
                  />
                </div>
                <div className={st.value}>{mark.shadowSize}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeoJSONPointLayerStyle;
