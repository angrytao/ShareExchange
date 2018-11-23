import { Component } from 'react';
import { Input, Switch, Radio } from 'antd';
import st from './MapSetting.less';
import std from '../default.less';

class MapSetting extends Component {
  state = {
    baseMap: 'vec',
    showAnno: false,
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
        <div className={`${std.h1} iconfont icon-shezhi`}>设置地图控件</div>
        <div className={std.slider} />
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
                  this.setState({ baseMap: e.target.value });
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
                value={showAnno}
                onChange={e => this.setState({ showAnno: showAnno })}
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
                onChange={e => this.setState({ showTitle: showTitle })}
              />
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>标题</div>
            </div>
            <div className={`${std.fitem_i} ${st.itemcontent}`}>
              <Input
                placeholder="标题内容"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className={std.slider} />
        <div className={std.group}>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>地图描述</div>
              <div className={std.fitem_st}>是否显示地图描述</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                value={showContent}
                onChange={e => this.setState({ showContent: showContent })}
              />
            </div>
          </div>
          <div className={std.fitem} style={{ alignItems: 'baseline' }}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>描述</div>
            </div>
            <div className={`${std.fitem_i} ${st.itemcontent}`}>
              <Input.TextArea
                placeholder="描述内容"
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
                onChange={e => this.setState({ showScale: showScale })}
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
                onChange={e => this.setState({ showZoom: showZoom })}
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
                onChange={e => this.setState({ showBaseMapControl: showBaseMapControl })}
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
                onChange={e => this.setState({ showMeasure: showMeasure })}
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
                onChange={e => this.setState({ showLevel: showLevel })}
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
                onChange={e => this.setState({ showMouseCoordinate: showMouseCoordinate })}
              />
            </div>
          </div>
          <div className={std.fitem}>
            <div className={std.fitem_t}>
              <div className={std.fitem_mt}>图层控制</div>
            </div>
            <div className={std.fitem_i}>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                value={showLayerControl}
                onChange={e => this.setState({ showLayerControl: showLayerControl })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapSetting;
