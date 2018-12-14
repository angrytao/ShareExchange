import { Component } from 'react';
import { Switch, Tooltip, Icon, Slider, Popconfirm } from 'antd';

import EditMarker from './EditMarker';
import EditPolygon from './EditPolygon';
import EditPolyline from './EditPolyline';

import st from './DrawTool.less';
import std from '../default.less';

let getCircleMarker = cfg => {
  let { size, shadowSize, color } = cfg;
  let { r, g, b } = color;

  (size = size || dfSMarker.size),
    (r = r || dfSMarker.color.r),
    (g = g || dfSMarker.color.g),
    (b = b || dfSMarker.color.b),
    (shadowSize = shadowSize || dfSMarker.shadowSize);

  let icon = L.divIcon({
    html: `<div class="circle-marker" style="background:rgb(${r},${g},${b},0.8);box-shadow:0 0 0 ${shadowSize ||
      dfSMarker.shadowSize}px rgba(${r},${g},${b},0.2)"></div>`,
    iconSize: [size, size],
    className: 'ct-divicon',
  });
  return icon;
};

let dfSMarker = {
  type: 'circleMarker',
  size: 12,
  shadowSize: 3,
  color: {
    r: 255,
    g: 0,
    b: 0,
  },
};

// let dfMarker = getCircleMarker(dfSMarker),
//   dfLine = null,
//   dfPolygon = null,
//   dfText = null;

class DrawTool extends Component {
  index = 1;
  markerStyle = dfSMarker;
  layers = {};
  state = {
    layers: {},
  };

  toggleDrawLayer(e) {
    if (this.drawLayer) {
      if (e) {
        this.drawLayer.addTo(this.map);
      } else {
        this.drawLayer.remove();
      }
    }
  }

  getDrawMarkerSymbol(style) {
    switch (style.type) {
      case 'circleMarker':
        return getCircleMarker(style);
      default:
        return L.marker();
    }
  }

  initDrawTools(map) {
    if (map) {
      this.map = map;
      let drawLayer = L.layerGroup().addTo(map);
      this.drawLayer = drawLayer;
      this.drawMarker = new L.Draw.Marker(map, {
        icon: this.getDrawMarkerSymbol(this.markerStyle),
      });

      this.drawMarker.on(L.Draw.Event.CREATED, e => {
        let { layer } = e;
        layer.addTo(this.drawLayer);
        let id = '' + this.index++;

        let l = {
          type: 'marker',
          layer: layer,
          style: {
            ...this.markerStyle,
          },
          id: id,
        };

        this.layers[id] = l;

        this.fire('markerDrawed', l);
        let { layers } = this.state;
        layers[l.id] = {
          type: l.type,
          id: l.id,
        };
        this.setState({ layers: layers });
      });

      this.drawLine = new L.Draw.Polyline(map);
      this.drawPolygon = new L.Draw.Polyline(map);
      this.drawText = new L.Draw.Marker(map);
    }
  }

  activeDrawMarker() {
    this.disabledTools();
    this.drawMarker.enable();
  }

  activeDrawLine() {}

  activeDrawPolygon() {}

  activeDrawText() {}

  disabledTools() {
    this.drawMarker.disable();
    this.drawLine.disable();
    this.drawPolygon.disable();
    this.drawText.disable();
  }

  centerMarker(id) {
    if (id) {
      let layer = this.layers[id];
      if (layer) {
        let latlng = layer.layer._latlng;
        this.map.setView(latlng, 16);
      }
    }
  }

  deleteFeature(id) {
    if (id) {
      let layer = this.layers[id];
      if (layer) {
        let latlng = layer.layer.remove();
        this.layers[id] = null;
        delete this.layers[id];
      }
      this.state.layers[id] = null;
      delete this.state.layers[id];
      this.setState({});
    }
  }

  getLayerItems() {
    let { layers } = this.state;
    let items = [];
    for (let i in layers) {
      let item = layers[i];
      switch (item.type) {
        case 'marker':
          items.push(
            <div>
              <span className="iconfont icon-location" />
              <span
                onClick={e => {
                  this.centerMarker(item.id);
                }}
              >
                {item.title || item.id}
              </span>
              <span>
                <Tooltip placement="top" title="编辑要素">
                  <Icon
                    type="edit"
                    onClick={e => {
                      this.editMarker(item.id);
                    }}
                  />
                </Tooltip>
                <Tooltip placement="top" title="删除要素">
                  <Popconfirm
                    title="确定删除该要素"
                    onConfirm={e => {
                      this.deleteFeature(item.id);
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Icon type="delete" />
                  </Popconfirm>
                </Tooltip>
              </span>
            </div>
          );
      }
    }
    return items;
  }

  render() {
    return (
      <div className={st.DrawTool}>
        <div className={`${std.h1} iconfont icon-tuceng`}>绘制地图要素</div>
        <div className={std.slider} />
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>绘制图层</div>
            <div className={std.fitem_st}>打开或关闭绘制图层</div>
          </div>
          <div className={std.fitem_i}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked
              onChange={e => this.toggleDrawLayer(e)}
            />
          </div>
        </div>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>绘制工具</div>
            <div className={std.fitem_st}>绘制点、线、面、文字</div>
          </div>
          <div className={std.fitem_i}>
            <div className={st.toolbar}>
              <Tooltip placement="top" title="绘制点">
                <span className="iconfont icon-location" onClick={e => this.activeDrawMarker()} />
              </Tooltip>
              <Tooltip placement="top" title="绘制线">
                <span className="iconfont icon-xian" onClick={e => this.activeDrawLine()} />
              </Tooltip>
              <Tooltip placement="top" title="绘制面">
                <span className="iconfont icon-polygon" onClick={e => this.activeDrawPolygon()} />
              </Tooltip>
              <Tooltip placement="top" title="添加文字">
                <span className="iconfont icon-wenzi" onClick={e => this.activeDrawText()} />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={std.slider} />
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>地图要素</div>
          </div>
          <div className={std.fitem_i}>
            <div className={std.fitem_st}>地图上绘制的要素</div>
          </div>
        </div>
        <div className={st.fts}>
          {this.getLayerItems()}
          {/*         
          <div>
            <span className="iconfont icon-location" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-polygon" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-xian" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-wenzi" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-location" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-polygon" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-xian" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-wenzi" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-location" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-polygon" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-xian" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-wenzi" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-location" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-polygon" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-xian" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div>
          <div>
            <span className="iconfont icon-wenzi" />
            <span>XXX点</span>
            <span>
              <Tooltip placement="top" title="编辑要素">
                <Icon type="edit" />
              </Tooltip>
              <Tooltip placement="top" title="删除要素">
                <Icon type="delete" />
              </Tooltip>
            </span>
          </div> */}
        </div>
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>要素编辑</div>
          </div>
          <div className={std.fitem_i}>
            <div className={std.fitem_st}>编辑绘制的地图要素</div>
          </div>
        </div>
        <div className={st.editpanel}>
          <EditPolyline />
        </div>
      </div>
    );
  }
}

export default DrawTool;
