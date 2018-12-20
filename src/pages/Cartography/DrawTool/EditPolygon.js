import { Component } from 'react';
import { Switch, Slider, Popover, Dropdown, Menu, Icon, Input, Select, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import st from './EditPolygon.less';
import std from '../default.less';
import { getDrawPolygonSymbol } from '../Map/icons';

class EditPolygon extends Component {
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
      let nStyle = getDrawPolygonSymbol(style);
      config.style = style;
      parent.resetPolygonStyle(style);
      config.layer.setStyle(nStyle.shapeOptions);
    }
  }

  render() {
    let { edit, style, popup, mark } = this.state;
    return (
      <div className={st.EditPolygon}>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>编辑面要素</div>
            <div className={std.fitem_st}>编辑面的位置、颜色、边框及显示内容</div>
          </div>
          <div className={std.fitem_i} />
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>编辑图形</div>
              <div className={std.fitem_st}>开启编辑图形，可以对多边形进行编辑</div>
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
              <div className={std.fitem_mt}>填充</div>
            </div>
            <div className={std.fitem_i}>
              <div className={st.edititem}>
                <Popover
                  overlayClassName={st.popover}
                  content={
                    <SketchPicker
                      color={`rgba(${style.fillColor.r},${style.fillColor.g},${style.fillColor.b},${
                        style.fillColor.a
                      })`}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        let { style } = this.state;
                        style.fillColor = { r, g, b, a };
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
                      background: `rgba(${style.fillColor.r},${style.fillColor.g},${
                        style.fillColor.b
                      },${style.fillColor.a})`,
                    }}
                  />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={style.fillColor.a}
                    onChange={e => {
                      let { style } = this.state;
                      style.fillColor.a = e;
                      this.resetStyle();
                      this.setState({ style: style });
                    }}
                  />
                </div>
                <div className={st.value}>{style.fillColor.a}</div>
              </div>
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
                    min={0}
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
      </div>
    );
  }
}

export default EditPolygon;
