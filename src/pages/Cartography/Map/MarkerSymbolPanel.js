import { Component } from 'react';
import { Tabs, Slider, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import { dfCircleMarkerStyle, dfPictureMarkerStyle, getMarkerSymbol, svgIcons } from './icons';
import st from './MarkerSymbolPanel.less';
import std from '../default.less';

class MarkerSymbolPanel extends Component {
  constructor(ps) {
    super(ps);
    let { symbol } = ps;
    this.state = {
      type: symbol.type,
      symbol: symbol,
    };

    if (symbol.type === 'circleMarker') {
      this.state.circleMarkerStyle = symbol;
      this.state.pictureMarkerStyle = {
        ...dfPictureMarkerStyle,
      };
    } else {
      this.state.circleMarkerStyle = {
        ...dfCircleMarkerStyle,
      };
      this.state.pictureMarkerStyle = symbol;
    }
  }

  changeStyle(style) {
    let { onMarkerChange } = this.props;
    if (onMarkerChange) {
      onMarkerChange(style);
    }
  }

  getSymbol() {
    let { symbol } = this.state;
    let ic = getMarkerSymbol(symbol);
    if (symbol.type === 'circleMarker') {
      let { size, shadowSize, color } = symbol;
      let { r, g, b, a } = color;
      return (
        <div
          className={`circle-marker`}
          style={{
            width: size,
            height: size,
            background: `rgba(${r},${g},${b},${a})`,
            boxShadow: `0 0 0 ${shadowSize}px rgba(${r},${g},${b},${a * 0.3}`,
            margin: shadowSize,
          }}
        />
      );
    } else if (symbol.type === 'pictureMarker') {
      let { size, icon } = symbol;
      return (
        <div className={st.iconwrapper}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={'#' + icon} />
          </svg>
        </div>
      );
    }
  }

  render() {
    let { type, circleMarkerStyle, pictureMarkerStyle } = this.state;

    return (
      <div className={st.MarkerSymbolPanel}>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>符号</div>
          </div>
          <div className={std.fitem_i}>{this.getSymbol()}</div>
        </div>
        <div className={std.slider} />
        <Tabs size="small" defaultActiveKey={type}>
          <Tabs.TabPane tab="填充符号" key="circleMarker">
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
                          this.setState({
                            symbol: circleMarkerStyle,
                            circleMarkerStyle: circleMarkerStyle,
                          });
                          this.changeStyle(circleMarkerStyle);
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
                        this.setState({
                          symbol: circleMarkerStyle,
                          circleMarkerStyle: circleMarkerStyle,
                        });
                        this.changeStyle(circleMarkerStyle);
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
                        this.setState({
                          symbol: circleMarkerStyle,
                          circleMarkerStyle: circleMarkerStyle,
                        });
                        this.changeStyle(circleMarkerStyle);
                      }}
                    />
                  </div>
                  <div className={st.value}>{circleMarkerStyle.shadowSize}</div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="图片符号" key="pictureMarker">
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
                            this.setState({
                              symbol: pictureMarkerStyle,
                              pictureMarkerStyle: pictureMarkerStyle,
                            });
                            this.changeStyle(pictureMarkerStyle);
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
                        let { pictureMarkerStyle, symbol } = this.state;
                        pictureMarkerStyle.size = e;

                        this.setState({
                          symbol: pictureMarkerStyle,
                          pictureMarkerStyle: pictureMarkerStyle,
                        });
                        this.changeStyle(pictureMarkerStyle);
                      }}
                    />
                  </div>
                  <div className={st.value}>{pictureMarkerStyle.size}</div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default MarkerSymbolPanel;
