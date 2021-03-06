import { Component } from 'react';
import { Switch, Slider, Popover, Dropdown, Menu, Icon, Input, Select, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import st from './EditPolyline.less';
import std from '../default.less';
import { getDrawLineSymbol } from '../Map/icons';

class EditPolyline extends Component {
  constructor(ps) {
    super(ps);
    let { type, edit, style, popup } = ps.config;
    this.state.edit = edit;
    this.state.type = type;
    this.state.popup = popup || this.state.popup;
    this.state.style = style || this.state.style;
  }

  state = {
    edit: false,
    type: null,
    style: {},
    popup: {
      show: false,
      title: '',
      content: '',
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

  resetStyle() {
    let { config, parent } = this.props;
    if (config.layer) {
      let { style } = this.state;
      let nStyle = getDrawLineSymbol(style);
      config.style = style;
      parent.resetLineStyle(style);
      config.layer.setStyle(nStyle.shapeOptions);
    }
  }

  render() {
    let { edit, style, popup, mark } = this.state;
    return (
      <div className={st.EditPolyline}>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>编辑线要素</div>
            <div className={std.fitem_st}>编辑线的位置、颜色、边框及显示内容</div>
          </div>
          <div className={std.fitem_i} />
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>编辑图形</div>
              <div className={std.fitem_st}>开启编辑图形，可以对线进行编辑</div>
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
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>边框</div>
            </div>
            <div className={std.fitem_i}>
              <div className={st.edititem}>
                <Popover
                  overlayClassName={st.popover}
                  content={
                    <SketchPicker
                      color={`rgba(${style.color.r},${style.color.g},${style.color.b},${
                        style.color.a
                      })`}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        let { style } = this.state;
                        style.color = { r, g, b, a };
                        this.resetStyle();
                        this.setState({ style: style });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div
                    className={st.color}
                    style={{
                      background: `rgba(${style.color.r},${style.color.g},${style.color.b},${
                        style.color.a
                      })`,
                    }}
                  />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={1}
                    max={15}
                    value={style.weight}
                    onChange={e => {
                      let { style } = this.state;
                      style.weight = e;
                      this.resetStyle();
                      this.setState({ style: style });
                    }}
                  />
                </div>
                <div className={st.value}>{style.weight}</div>
                <div>
                  <Select
                    size="small"
                    value={style.dashArray || 'solid'}
                    onChange={e => {
                      let { style } = this.state;
                      style.dashArray = e;
                      this.resetStyle();
                      this.setState({ style: style });
                    }}
                    style={{ width: 65 }}
                  >
                    <Select.Option value="solid">实线</Select.Option>
                    <Select.Option value="dotted">点线</Select.Option>
                    <Select.Option value="dashed">虚线</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
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
        {/* <div className={std.slider} />
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
                checked={showMark}
                onChange={e => this.setState({ showMark: e })}
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
                value={markPosition}
                onChange={e => this.setState({ markPosition: e.target.value })}
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
                value={markFontFamily}
                onChange={e => this.setState({ markFontFamily: e })}
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
                      color={markColor}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        this.setState({ markColor: `rgba(${r},${g},${b},${a})` });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div className={st.color} style={{ background: markColor }} />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={12}
                    max={48}
                    value={markFontSize}
                    onChange={e => this.setState({ markFontSize: e })}
                  />
                </div>
                <div className={st.value}>{markFontSize}</div>
              </div>
            </div>
          </div>
          <div className={std.fitem}>
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
          </div> 
        </div>*/}
      </div>
    );
  }
}

export default EditPolyline;
