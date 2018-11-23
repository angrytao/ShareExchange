import { Component } from 'react';
import { Switch, Slider, Popover, Dropdown, Menu, Icon, Input, Select, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import st from './EditPolyline.less';
import std from '../default.less';

class EditPolyline extends Component {
  state = {
    edit: false,
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    showPopup: false,
    title: '',
    content: '',
    showMark: false,
    markPosition:"top",
    markFontFamily: '宋体',
    markColor: 'red',
    markFontSize: '14',
    markHaloColor: 'red',
    markHaloRadius: 5,
  };

  render() {
    let {
      edit,
      borderColor,
      borderWidth,
      borderStyle,
      showPopup,
      title,
      content,
      showMark,
      markPosition,
      markFontFamily,
      markColor,
      markFontSize,
      markHaloColor,
      markHaloRadius,
    } = this.state;
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
                      color={borderColor}
                      onChange={e => {
                        let { r, g, b, a } = e.rgb;
                        this.setState({ borderColor: `rgba(${r},${g},${b},${a})` });
                      }}
                    />
                  }
                  trigger="click"
                >
                  <div className={st.color} style={{ background: borderColor }} />
                </Popover>
                <div className={st.valuebar}>
                  <Slider
                    min={0}
                    max={10}
                    defaultValue={borderWidth}
                    onChange={e => this.setState({ borderWidth: e })}
                  />
                </div>
                <div className={st.value}>{borderWidth}</div>
                <div>
                  <Select
                    size="small"
                    value={borderStyle}
                    onChange={e => this.setState({ borderStyle: e })}
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
                checked={showPopup}
                onChange={e => this.setState({ showPopup: e })}
              />
            </div>
          </div>
          <div className={std.fitem} style={{ alignItems: 'baseline' }}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>内容</div>
            </div>
            <div className={`${std.fitem_i} ${st.itemcontent}`}>
              <Input
                placeholder="标题"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <Input.TextArea
                placeholder="内容"
                value={content}
                onChange={e => this.setState({ content: e.target.value })}
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
        </div>
      </div>
    );
  }
}

export default EditPolyline;
