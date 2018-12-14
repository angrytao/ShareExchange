import { Component } from 'react';
import { Input, Switch, Radio, Select } from 'antd';
import st from './MapSetting.less';
import std from '../default.less';
import FontSetting from './FontSetting';

class MapSetting extends Component {
  state = {
    baseMap: 'vec',
    showAnno: true,
    showTitle: false,
    title: '',
    showContent: false,
    content: '',
    showBaseMapControl: false,
    showScale: false,
    showZoom: false,
    showMeasure: false,
    showLevel: false,
    showMouseCoordinate: false,
    showLayerControl: false,
  };

  changeBaseMap() {
    let { baseMap, showAnno } = this.state;
    let types = null;
    switch (baseMap) {
      case 'vec':
        types = showAnno ? ['vec', 'vec_anno'] : ['vec'];
        break;
      case 'img':
        types = showAnno ? ['img', 'img_anno'] : ['img'];
        break;
      default:
        break;
    }
    if (types) {
      this.fire('baseMapChange', { types: types });
    }
  }

  changeTitle() {
    let fst = this.FontSetting.getFontStyle();
    this.fire('mapTitleChange', { ...fst, showTitle: this.state.showTitle });
  }

  changeContent() {
    let { showContent, content } = this.state;
    let ctt = {
      showContent,
      content,
    };
    this.fire('mapContentChange', ctt);
  }
  changeScale() {
    let { showScale } = this.state;
    this.fire('mapScaleChange', showScale);
  }

  changeZoom() {
    let { showZoom } = this.state;
    this.fire('mapZoomChange', showZoom);
  }
  componentDidMount() {
    this.FontSetting.on('fontStyleChange', e => {
      this.changeTitle();
    });
  }

  render() {
    let {
      baseMap,
      showBaseMapControl,
      showAnno,
      showTitle,
      title,
      showContent,
      content,
      showScale,
      showZoom,
      showMeasure,
      showLevel,
      showMouseCoordinate,
      showLayerControl,
    } = this.state;
    return (
      <div className={st.MapSetting}>
        <div className={st.header}>
          <div className={`${std.h1} iconfont icon-shezhi`}>设置地图控件</div>
          <div className={std.slider} style={{ marginBottom: 0 }} />
        </div>
        <div className={st.body}>
          <div>
            <div className={std.group}>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>默认底图</div>
                  <div className={std.fitem_st}>选择默认显示的底图</div>
                </div>
                <div className={std.fitem_i}>
                  <Radio.Group
                    buttonStyle="solid"
                    value={baseMap}
                    onChange={e => {
                      this.setState({ baseMap: e.target.value }, this.changeBaseMap.bind(this));
                    }}
                  >
                    <Radio.Button value="vec">矢量</Radio.Button>
                    <Radio.Button value="img">影像</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>显示注记</div>
                  <div className={std.fitem_st}>是否在底图上显示注记</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    checked={showAnno}
                    onChange={e => this.setState({ showAnno: e }, this.changeBaseMap.bind(this))}
                  />
                </div>
              </div>
            </div>
            <div className={std.slider} />
            <div className={std.group}>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>地图标题</div>
                  <div className={std.fitem_st}>是否显示地图标题</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showTitle}
                    onChange={e => this.setState({ showTitle: e }, this.changeTitle.bind(this))}
                  />
                </div>
              </div>
              <FontSetting ref={e => (this.FontSetting = e)} />
            </div>
            <div className={std.slider} />
            <div className={std.group}>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>地图说明</div>
                  <div className={std.fitem_st}>是否显示地图说明</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showContent}
                    onChange={e => this.setState({ showContent: e }, this.changeContent.bind(this))}
                  />
                </div>
              </div>
              <div className={std.fitem} style={{ alignItems: 'baseline' }}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>地图说明</div>
                </div>
                <div className={`${std.fitem_i} ${st.itemcontent}`}>
                  <Input.TextArea
                    placeholder="地图说明"
                    value={content}
                    onChange={e =>
                      this.setState({ content: e.target.value }, this.changeContent.bind(this))
                    }
                  />
                </div>
              </div>
            </div>
            <div className={std.slider} />
            <div className={std.group}>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>常用地图组件</div>
                  <div className={std.fitem_st}>选择常用的地图组件</div>
                </div>
              </div>

              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>比例尺</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showScale}
                    onChange={e => this.setState({ showScale: e }, this.changeScale.bind(this))}
                  />
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>地图缩放</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showZoom}
                    onChange={e => this.setState({ showZoom: e }, this.changeZoom.bind(this))}
                  />
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>底图选择</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showBaseMapControl}
                    onChange={e => {
                      this.fire('showBaseMapChange', e);
                      this.setState({ showBaseMapControl: e });
                    }}
                  />
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>测量工具</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showMeasure}
                    onChange={e => {
                      this.fire('showMeasureChange', e);
                      this.setState({ showMeasure: e });
                    }}
                  />
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>地图级别</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showLevel}
                    onChange={e => {
                      this.fire('showLevelChange', e);
                      this.setState({ showLevel: e });
                    }}
                  />
                </div>
              </div>
              <div className={std.fitem}>
                <div className={std.fitem_t}>
                  <div className={std.fitem_mt}>鼠标坐标</div>
                </div>
                <div className={std.fitem_i}>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    value={showMouseCoordinate}
                    onChange={e => {
                      this.fire('showMousePosition', e);
                      this.setState({ showMouseCoordinate: e });
                    }}
                  />
                </div>
              </div>
              {/* <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>图层控制</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                value={showLayerControl}
                onChange={e => {
                  this.fire('showBaseMapChange', e);
                  this.setState({ showLayerControl: e });
                }}
              />
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapSetting;
