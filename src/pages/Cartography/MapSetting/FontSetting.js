import { Component } from 'react';
import { Input, Select, Popover, Switch, Slider, Tooltip, Checkbox } from 'antd';
import { SketchPicker } from 'react-color';
import std from '../default.less';
import st from './FontSetting.less';

class FontSetting extends Component {
  constructor(ps) {
    super(ps);
    this.state = { fontStyle: ps.fontStyle };
    this.setTitle = this.setTitle.bind(this);
  }

  static defaultProps = {
    fontStyle: {
      title: '文字内容',
      content: null,
      color: 'black',
      fontSize: 36,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      fontFamily: '宋体',
      textShadowColor: 'black',
      textShadowBlur: 2,
      textShadowColor2: 'white',
      textShadowBlur2: 0,
      showTextShadow: true,
    },
  };

  setTitle() {
    let fs = this.getFontStyle();
    this.fire('fontStyleChange', fs);
  }

  getFontStyle() {
    let { fontStyle } = this.state;
    let b = fontStyle.textShadowBlur,
      b2 = fontStyle.textShadowBlur2;
    let nst = {
      ...fontStyle,
    };

    if (fontStyle.showTextShadow) {
      nst.textShadow = `2px 2px ${b2}px ${fontStyle.textShadowColor2} , 4px 4px ${b}px ${
        fontStyle.textShadowColor
      }`;
    }
    // delete nst.textShadowBlur;
    // delete nst.textShadowColor;
    // delete nst.textShadowBlur2;
    // delete nst.textShadowColor2;
    return nst;
  }

  render() {
    let {
      title,
      content,
      color,
      fontSize,
      fontWeight,
      fontFamily,
      fontStyle,
      textDecoration,
      textShadowColor,
      textShadowBlur,
      textShadowColor2,
      textShadowBlur2,
      showTextShadow,
    } = this.state.fontStyle;
    return (
      <div className={st.FontSetting}>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>{title}</div>
          </div>
          <div className={`${std.fitem_i} ${std.itemcontent}`}>
            <Input
              placeholder={title}
              value={content}
              onChange={e => {
                let { fontStyle } = this.state;
                fontStyle.content = e.target.value;
                this.setState({}, this.setTitle);
              }}
            />
          </div>
        </div>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>颜色字号</div>
          </div>
          <div className={`${std.fitem_i} ${std.itemcontent}`}>
            <div className={st.edititem}>
              <Popover
                overlayClassName={st.popover}
                placement="right"
                content={
                  <SketchPicker
                    color={color}
                    onChange={e => {
                      let { r, g, b, a } = e.rgb;
                      let { fontStyle } = this.state;
                      fontStyle.color = `rgba(${r},${g},${b},${a})`;
                      this.setState({}, this.setTitle);
                    }}
                  />
                }
                trigger="click"
              >
                <div className={st.color} style={{ background: color }} />
              </Popover>
              <div className={st.valuebar}>
                <Slider
                  min={28}
                  max={60}
                  value={fontSize}
                  onChange={e => {
                    let { fontStyle } = this.state;
                    fontStyle.fontSize = e;
                    this.setState({}, this.setTitle);
                  }}
                />
              </div>
              <div className={st.value}>{fontSize}</div>
            </div>
          </div>
        </div>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>字体型号</div>
          </div>
          <div className={`${std.fitem_i} ${std.itemcontent}`}>
            <div className={st.fontstyle}>
              <Tooltip title="加粗">
                <span
                  style={{ fontWeight: fontWeight }}
                  onClick={e => {
                    let { fontStyle } = this.state;
                    fontStyle.fontWeight = fontStyle.fontWeight === 700 ? 'normal' : 700;
                    this.setState({}, this.setTitle);
                  }}
                >
                  B
                </span>
              </Tooltip>
              <Tooltip title="斜体">
                <span
                  style={{ fontStyle: fontStyle }}
                  onClick={e => {
                    let { fontStyle } = this.state;
                    fontStyle.fontStyle = fontStyle.fontStyle === 'italic' ? 'normal' : 'italic';
                    this.setState({}, this.setTitle);
                  }}
                >
                  I
                </span>
              </Tooltip>
              <Tooltip title="下划线">
                <span
                  style={{ textDecoration: textDecoration }}
                  onClick={e => {
                    let { fontStyle } = this.state;
                    fontStyle.textDecoration =
                      fontStyle.textDecoration === 'none' ? 'underline' : 'none';
                    this.setState({}, this.setTitle);
                  }}
                >
                  U
                </span>
              </Tooltip>
            </div>
            &emsp;
            <Select
              style={{ width: 110 }}
              value={fontFamily}
              onChange={e => {
                let { fontStyle } = this.state;
                fontStyle.fontFamily = e;
                this.setState({}, this.setTitle);
              }}
            >
              <Select.Option value="微软雅黑">微软雅黑</Select.Option>
              <Select.Option value="宋体">宋体</Select.Option>
            </Select>
          </div>
        </div>
        <div className={std.fitem} style={{ alignItems: 'baseline' }}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>
              <Checkbox
                checked={showTextShadow}
                onChange={e => {
                  let { fontStyle } = this.state;
                  fontStyle.showTextShadow = e.target.checked;
                  this.setState({}, this.setTitle);
                }}
              >
                文字阴影
              </Checkbox>
            </div>
          </div>
          <div className={`${std.fitem_i} ${std.itemcontent}`}>
            <div className={st.edititem}>
              <Popover
                overlayClassName={st.popover}
                placement="right"
                content={
                  <SketchPicker
                    color={textShadowColor}
                    onChange={e => {
                      let { r, g, b, a } = e.rgb;
                      let { fontStyle } = this.state;
                      fontStyle.textShadowColor = `rgba(${r},${g},${b},${a})`;
                      this.setState({}, this.setTitle);
                    }}
                  />
                }
                trigger="click"
              >
                <div className={st.color} style={{ background: textShadowColor }} />
              </Popover>
              <div className={st.valuebar}>
                <Slider
                  min={0}
                  max={24}
                  value={textShadowBlur}
                  onChange={e => {
                    let { fontStyle } = this.state;
                    fontStyle.textShadowBlur = e;
                    this.setState({}, this.setTitle);
                  }}
                />
              </div>
              <div className={st.value}>{textShadowBlur}</div>
            </div>
            <div className={st.edititem}>
              <Popover
                overlayClassName={st.popover}
                placement="right"
                content={
                  <SketchPicker
                    color={textShadowColor2}
                    onChange={e => {
                      let { r, g, b, a } = e.rgb;
                      let { fontStyle } = this.state;
                      fontStyle.textShadowColor2 = `rgba(${r},${g},${b},${a})`;
                      this.setState({}, this.setTitle);
                    }}
                  />
                }
                trigger="click"
              >
                <div className={st.color} style={{ background: textShadowColor2 }} />
              </Popover>
              <div className={st.valuebar}>
                <Slider
                  min={0}
                  max={10}
                  value={textShadowBlur2}
                  onChange={e => {
                    let { fontStyle } = this.state;
                    fontStyle.textShadowBlur2 = e;
                    this.setState({}, this.setTitle);
                  }}
                />
              </div>
              <div className={st.value}>{textShadowBlur2}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FontSetting;
