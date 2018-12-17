import { Component } from 'react';
import {
  Switch,
  Slider,
  Popover,
  Dropdown,
  Menu,
  Icon,
  Input,
  Select,
  Radio,
  Checkbox,
  Tabs,
} from 'antd';
import { SketchPicker } from 'react-color';
import st from './EditMarker.less';
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

class EditMarker extends Component {
  constructor(ps) {
    super(ps);
    let { type, edit, style, popup, mark } = ps.config;

    this.state.edit = edit;
    this.state.type = style.type;
    this.state.popup = popup || this.state.popup;
    this.state.mark = mark || this.state.mark;

    if (style.type === 'circleMarker') {
      this.state.circleMarkerStyle = style;
      this.state.pictureMarkerStyle = { ...dfPictureMarkerStyle };
    } else {
      this.state.circleMarkerStyle = { ...dfCircleMarkerStyle };
      this.state.pictureMarkerStyle = style;
    }
  }

  state = {
    edit: false,
    type: null,
    circleMarkerStyle: {},
    pictureMarkerStyle: {
      size: 20,
    },
    popup: {
      show: false,
      title: '',
      content: '',
    },
    mark: {
      show: false,
      color: {
        r: 255,
        g: 0,
        b: 0,
        a: 1,
      },
      position: 'top',
      fontFamily: '宋体',
      fontSize: 12,
    },
  };

  toggleEditGeometry(edit) {
    let { config } = this.props;
    if (config.layer) {
      this.props.config.edit = edit;
      if (edit) {
        config.layer.editing.enable();
      } else {
        config.layer.editing.disable();
      }
    }
  }

  changeMarkerIcon() {
    let { config, parent } = this.props;
    let { circleMarkerStyle } = this.state;
    let icon = getCircleMarker(circleMarkerStyle);
    config.layer.setIcon(icon);
    config.style = circleMarkerStyle;
    parent.resetMarkerIcon(circleMarkerStyle, icon);
  }

  changeMarkerIcon2() {
    let { pictureMarkerStyle } = this.state;
    let { icon, size } = pictureMarkerStyle;
    let { config, parent } = this.props;
    let icon2 = getPictureMarker(icon, size);
    config.layer.setIcon(icon2);
    config.style = pictureMarkerStyle;
    parent.resetMarkerIcon(pictureMarkerStyle, icon2);
  }

  resetItemTitle() {
    let { parent } = this.props;
    let { config } = this.props;
    if (config.id) {
      let title = config.popup && config.popup.title;
      parent.refreshDrawItemTitle(config.id, title);
    }
  }

  resetPopup() {
    let { popup } = this.state;
    let { config } = this.props;
    if (config.layer) {
      config.popup = popup;
      if (popup && popup.show && (popup.title || popup.content)) {
        config.layer
          .bindPopup(
            `<div class="ct-draw-popup"><div>${popup.title}</div><div>${popup.content}</div></div>`
          )
          .openPopup();
      } else {
        // 先关闭 后取消绑定
        config.layer.closePopup().unbindPopup();
      }
    }
  }

  resetTooltip() {
    let { mark, popup } = this.state;
    let { config } = this.props;
    if (config.layer) {
      config.mark = mark;
      config.layer.closeTooltip().unbindTooltip();
      if (mark && mark.show && popup.title) {
        config.layer.bindTooltip(
          `<div style="font-family:${mark.fontFamily};color:rgba(${mark.color.r},${mark.color.g},${
            mark.color.b
          },${mark.color.a});font-size:${mark.fontSize}px">${popup.title}</div>`,
          {
            className: 'ct-draw-transparent',
            permanent: true,
            direction: mark.position,
          }
        );
      }
    }
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

  render() {
    let { edit, type, circleMarkerStyle, pictureMarkerStyle, popup, mark } = this.state;

    return (
      <div className={st.EditMarker}>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>编辑点要素</div>
            <div className={std.fitem_st}>编辑点的位置、颜色、边框及显示内容</div>
          </div>
          <div className={std.fitem_i} />
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>编辑图形</div>
              <div className={std.fitem_st}>开启编辑图形，可以移动点的位置</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={edit}
                onChange={e => {
                  this.setState({ edit: e });
                  this.toggleEditGeometry(e);
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
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>特效</div>
                </div>
                <div className={std.fitem_i}>
                  <Checkbox
                    checked={circleMarkerStyle.effect === 'ct-marker-flash'}
                    onChange={e => {
                      let { circleMarkerStyle } = this.state;
                      circleMarkerStyle.effect = e.target.checked ? 'ct-marker-flash' : '';
                      this.setState({ circleMarkerStyle: circleMarkerStyle });
                      this.changeMarkerIcon();
                    }}
                  >
                    闪烁
                  </Checkbox>
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
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>弹出框</div>
              <div className={std.fitem_st}>设置弹出框（标注）的内容</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={popup.show}
                onChange={e => {
                  let { popup } = this.state;
                  popup.show = e;
                  this.resetPopup();
                  this.setState({ popup: popup });
                }}
              />
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>标题</div>
            </div>
            <div className={`${std.fitem_i} ${st.itemcontent}`}>
              <Input
                placeholder="标题"
                value={popup.title}
                onChange={e => {
                  let { popup } = this.state;
                  popup.title = e.target.value;
                  this.resetItemTitle();
                  this.resetPopup();
                  this.resetTooltip();
                  this.setState({ popup: popup });
                }}
              />
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>内容</div>
            </div>
            <div className={`${std.fitem_i} ${st.itemcontent}`}>
              <Input.TextArea
                placeholder="内容"
                value={popup.content}
                onChange={e => {
                  let { popup } = this.state;
                  popup.content = e.target.value;
                  this.resetPopup();
                  this.setState({ popup: popup });
                }}
              />
            </div>
          </div>
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>标注</div>
              <div className={std.fitem_st}>是否开启地图上的标注</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={mark.show}
                onChange={e => {
                  let { mark } = this.state;
                  mark.show = e;
                  this.resetTooltip();
                  this.setState({ mark: mark });
                }}
              />
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
                onChange={e => {
                  let { mark } = this.state;
                  mark.position = e.target.value;
                  this.resetTooltip();
                  this.setState({ mark: mark });
                }}
                buttonStyle="solid"
              >
                <Radio.Button value="top">上</Radio.Button>
                <Radio.Button value="bottom">下</Radio.Button>
                <Radio.Button value="center">中</Radio.Button>
                <Radio.Button value="left">左</Radio.Button>
                <Radio.Button value="right">右</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>字体</div>
            </div>
            <div className={std.fitem_i}>
              <Select
                value={mark.fontFamily}
                onChange={e => {
                  let { mark } = this.state;
                  mark.fontFamily = e;
                  this.resetTooltip();
                  this.setState({ mark: mark });
                }}
                style={{ width: 220 }}
              >
                <Select.Option value="宋体">宋体</Select.Option>
                <Select.Option value="黑体">黑体</Select.Option>
                <Select.Option value="幼圆">幼圆</Select.Option>
              </Select>
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
                        this.resetTooltip();
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
                      this.resetTooltip();
                      this.setState({ mark: mark });
                    }}
                  />
                </div>
                <div className={st.value}>{mark.fontSize}</div>
              </div>
            </div>
          </div>
          {/* <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>阴影</div>
            </div>
            <div className={std.fitem_i}>
              <div className={st.edititem}>
                <Popover
                  overlayClassName={st.popover}
                  content={
                    <SketchPicker
                      color={markHaloColor}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        this.setState({ markHaloColor: `rgba(${r},${g},${b},${a})` });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div className={st.color} style={{ background: markHaloColor }} />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={0}
                    max={10}
                    value={markHaloRadius}
                    onChange={e => this.setState({ markHaloRadius: e })}
                  />
                </div>
                <div className={st.value}>{markHaloRadius}</div>
              </div>
            </div>
          </div>  */}
        </div>
      </div>
    );
  }
}

export default EditMarker;
