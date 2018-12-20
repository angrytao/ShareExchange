import { Component } from 'react';
import { Switch, Tooltip, Icon, Slider, Popconfirm } from 'antd';

import EditMarker from './EditMarker';
import EditPolygon from './EditPolygon';
import EditPolyline from './EditPolyline';
import st from './DrawTool.less';
import std from '../default.less';

import {
  getCircleMarker,
  getPictureMarker,
  dfCircleMarkerStyle,
  dfPolylineStyle,
  dfPolygonStyle,
  getDrawLineSymbol,
  getDrawPolygonSymbol,
} from '../Map/icons';

class DrawTool extends Component {
  index = 1;
  markerStyle = dfCircleMarkerStyle;
  lineStyle = dfPolylineStyle;
  polygonStyle = dfPolygonStyle;

  layers = {};
  state = {
    reloadEditPanel: false,
    layerId: null,
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

  getMarkerSymbol(style) {
    switch (style.type) {
      case 'circleMarker':
        return getCircleMarker(style);
      default:
        return getPictureMarker(style);
    }
  }

  initDrawTools(map) {
    if (map) {
      this.map = map;
      let drawLayer = L.layerGroup().addTo(map);
      this.drawLayer = drawLayer;
      this.drawMarker = new L.Draw.Marker(map, {
        icon: this.getMarkerSymbol(this.markerStyle),
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

        layer.on('click', e => {
          this.editFeature(id);
        });

        this.layers[id] = l;

        this.fire('markerDrawed', l);
        let { layers } = this.state;
        layers[l.id] = {
          type: l.type,
          id: l.id,
        };
        this.setState({ layers: layers });
      });

      this.drawLine = new L.Draw.Polyline(map, getDrawLineSymbol(this.lineStyle));

      this.drawLine.on(L.Draw.Event.CREATED, e => {
        let { layer } = e;
        layer.addTo(this.drawLayer);
        let id = '' + this.index++;

        let l = {
          type: 'line',
          layer: layer,
          style: {
            ...this.lineStyle,
          },
          id: id,
        };

        layer.on('click', e => {
          this.editFeature(id);
        });

        this.layers[id] = l;

        this.fire('lineDrawed', l);
        let { layers } = this.state;
        layers[l.id] = {
          type: l.type,
          id: l.id,
        };
        this.setState({ layers: layers });
      });

      this.drawPolygon = new L.Draw.Polygon(map, getDrawPolygonSymbol(this.polygonStyle));
      this.drawPolygon.on(L.Draw.Event.CREATED, e => {
        let { layer } = e;
        layer.addTo(this.drawLayer);
        let id = '' + this.index++;

        let l = {
          type: 'polygon',
          layer: layer,
          style: {
            ...this.polygonStyle,
          },
          id: id,
        };

        layer.on('click', e => {
          this.editFeature(id);
        });

        this.layers[id] = l;

        this.fire('polygonDrawed', l);
        let { layers } = this.state;
        layers[l.id] = {
          type: l.type,
          id: l.id,
        };
        this.setState({ layers: layers });
      });
    }
  }

  activeDrawMarker() {
    this.disabledTools();
    this.drawMarker.enable();
  }

  activeDrawLine() {
    this.disabledTools();
    this.drawLine.enable();
  }

  activeDrawPolygon() {
    this.disabledTools();
    this.drawPolygon.enable();
  }

  disabledTools() {
    this.drawMarker.disable();
    this.drawLine.disable();
    this.drawPolygon.disable();
  }

  refreshDrawItemTitle(id, title) {
    if (this.state.layers[id]) {
      this.state.layers[id].title = title;
      this.setState({});
    }
  }

  centerFeature(id) {
    if (id) {
      let layer = this.layers[id];
      if (layer) {
        if (layer.type === 'marker') {
          let latlng = layer.layer._latlng;
          this.map.setView(latlng, 16);
        } else {
          let bounds = layer.layer.getBounds();
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }
  }

  deleteFeature(id) {
    if (id) {
      let layer = this.layers[id];
      if (layer) {
        // 直接remove，在切换this.drawLayer可见性的时候会导致删除掉的重现
        this.drawLayer.removeLayer(layer.layer);
        this.layers[id] = null;
        delete this.layers[id];
      }
      // 如果是正在编辑的要素
      if (id === this.state.layerId) {
        this.state.layerId = null;
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
      let icon = null;
      switch (item.type) {
        case 'marker':
          icon = 'icon-location';
          break;
        case 'line':
          icon = 'icon-xian';
          break;
        case 'polygon':
          icon = 'icon-polygon';
          break;
        default:
          break;
      }
      items.push(
        <div>
          <span className={`iconfont ${icon}`} />
          <span
            onClick={e => {
              this.centerFeature(item.id);
            }}
          >
            {item.title || item.id}
          </span>
          <span>
            <Tooltip placement="top" title="编辑要素">
              <Icon
                type="edit"
                onClick={e => {
                  this.editFeature(item.id);
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
    return items;
  }

  editFeature(id) {
    this.setState({ reloadEditPanel: true }, e =>
      this.setState({ reloadEditPanel: false, layerId: id })
    );
  }

  resetMarkerIcon(style, icon) {
    this.markerStyle = style;
    this.drawMarker.setOptions({ icon: icon });
  }

  resetLineStyle(style) {
    this.lineStyle = style;
    this.drawLine.setOptions(getDrawLineSymbol(style));
  }

  resetPolygonStyle(style) {
    this.polygonStyle = style;
    this.drawPolygon.setOptions(getDrawPolygonSymbol(style));
  }

  getEditPanel() {
    let cmp = null;
    let { layerId } = this.state;
    if (layerId) {
      let lo = this.layers[layerId];
      if (lo) {
        switch (lo.type) {
          case 'marker':
            cmp = <EditMarker config={lo} parent={this} />;
            break;
          case 'line':
            cmp = <EditPolyline config={lo} parent={this} />;
            break;
          case 'polygon':
            cmp = <EditPolygon config={lo} parent={this} />;
            break;
        }
      }
    }
    return cmp;
  }

  render() {
    let { reloadEditPanel } = this.state;
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
              {/* <Tooltip placement="top" title="添加文字">
                <span className="iconfont icon-wenzi" onClick={e => this.activeDrawText()} />
              </Tooltip> */}
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
        <div className={st.editpanel}>{reloadEditPanel ? null : this.getEditPanel()}</div>
      </div>
    );
  }
}

export default DrawTool;
