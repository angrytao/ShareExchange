import { Component } from 'react';
import { Button, Modal, Icon, Tooltip, Popconfirm, Popover } from 'antd';
import st from './LayerControl.less';
import std from '../default.less';

import DataPanel from './DataPanel';
import ArcGISHeatLayerStyle from './ArcGISHeatLayerStyle';
import ArcGISTileDynamicLayer from './ArcGISTileDynamicLayer';
import ArcGISClusterLayerStyle from './ArcGISClusterLayerStyle';
import GeoJSONPointLayerStyle from './GeoJSONPointLayerStyle';
import GeoJSONHeatLayerStyle from './GeoJSONHeatLayerStyle';

import { getLayer, layerTypes } from '../Map/layers';
import { success } from '../../../utils/notification';
import { dfCircleMarkerStyle } from '../Map/icons';

class LayerControl extends Component {
  index = 1;

  state = {
    reload: false,
    showDataPanel: false,
    layers: {},
  };

  layers = {};

  showDataPanel() {
    this.setState({ showDataPanel: true });
  }

  hiddenDataPanel() {
    this.setState({ showDataPanel: false });
  }

  addLayer(layer) {
    let { layers } = this.state;
    let id = this.index++;
    layers[id] = {
      ...layer,
      id: id,
      visible: true,
    };

    this.setState({ layers: layers });
    let l = getLayer(layer);
    if (l.setZIndex) l.setZIndex(id);
    this.layers[id] = l;
    l.addTo(this.map);
    success('加载成功');
  }

  toggleLayerVisibility(id, visible) {
    let layer = this.layers[id];
    if (layer) {
      visible ? layer.addTo(this.map) : layer.remove();
    }
  }

  createCluster(id) {
    let { _data_ } = this.layers[id];
    let l = this.state.layers[id];
    let nid = this.index++;
    let nl = {
      id: nid,
      name: l.name + '（聚合图）',
      type: layerTypes.GEOJSON_CLUSTER.type,
      typeAlias: layerTypes.GEOJSON_CLUSTER.name,
      data: _data_,
      visible: true,
      style: {
        ...dfCircleMarkerStyle,
      },
    };

    this.state.layers[nid] = nl;
    let layer = L.markerClusterGroup();
    for (let i in this.layers[id]._layers) {
      let ll = this.layers[id]._layers[i];
      let latlng = ll._latlng;
      let icon = ll.options.icon;
      layer.addLayer(L.marker(latlng, { icon: icon }));
    }
    console.log(layer);
    if (layer.setZIndex) layer.setZIndex(id);
    this.layers[nid] = layer;
    layer.addTo(this.map);
    this.setState({});
    success('加载成功');
  }

  createHeat(id) {
    let { _data_ } = this.layers[id];
    let l = this.state.layers[id];

    let nl = {
      name: l.name + '（热力图）',
      type: layerTypes.GEOJSON_HEAT.type,
      typeAlias: layerTypes.GEOJSON_HEAT.name,
      data: _data_,
    };
    this.addLayer(nl);
  }

  getLayerItems() {
    let { layers } = this.state;
    let cmps = [];
    let idx = 1;
    for (let i in layers) {
      let item = layers[i];
      cmps.push(
        <div>
          <div>{idx++}</div>
          <div className={st.itemname}>{item.name}</div>
          <span>{item.typeAlias}</span>
          <div>
            {item.type === layerTypes.GEOJSON_POINT.type ? (
              <Popover
                content={
                  <div>
                    <Button type="primary" size="small" onClick={e => this.createHeat(item.id)}>
                      生成热力图
                    </Button>
                    &ensp;
                    <Button type="primary" size="small" onClick={e => this.createCluster(item.id)}>
                      生成聚合图
                    </Button>
                  </div>
                }
              >
                <Icon type="swap" />
              </Popover>
            ) : null}
            <Tooltip title="关闭或打开图层">
              <Icon
                onClick={e => {
                  item.visible = !item.visible;
                  this.setState({});
                  this.toggleLayerVisibility(i, item.visible);
                }}
                type={'eye'}
                theme={item.visible ? 'filled' : ''}
              />
            </Tooltip>
            <Tooltip title="图层设置">
              <Icon
                type="edit"
                onClick={e => {
                  this.editId = i;
                  this.setState({ reload: true }, e => {
                    this.setState({ reload: false });
                  });
                }}
              />
            </Tooltip>
            <Tooltip title="移除图层">
              <Popconfirm title="确定移除该图层？" onConfirm={e => this.deleteLayer(i)}>
                <Icon type="delete" />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      );
    }
    return cmps;
  }

  deleteLayer(id) {
    this.state.layers[id] = null;
    delete this.state.layers[id];
    let l = this.layers[id];
    if (l) {
      l.remove();
      this.layers[id] = null;
    }
    delete this.layers[id];
    this.setState({});
  }

  getEditPanel() {
    let layer = this.state.layers[this.editId];
    if (layer) {
      switch (layer.type) {
        case layerTypes.GEOJSON_HEAT.type:
          return (
            <GeoJSONHeatLayerStyle config={layer} layer={this.layers[this.editId]} parent={this} />
          );
        case layerTypes.ARCGIS_HEAT.type:
          return (
            <ArcGISHeatLayerStyle config={layer} layer={this.layers[this.editId]} parent={this} />
          );
        case layerTypes.ARCGIS_TILED.type:
        case layerTypes.ARCGIS_DYNAMIC.type:
          return (
            <ArcGISTileDynamicLayer config={layer} layer={this.layers[this.editId]} parent={this} />
          );
        case layerTypes.ARCGIS_CLUSTER.type:
          return (
            <ArcGISClusterLayerStyle
              config={layer}
              layer={this.layers[this.editId]}
              parent={this}
            />
          );
        case layerTypes.GEOJSON_POINT.type:
          return (
            <GeoJSONPointLayerStyle config={layer} layer={this.layers[this.editId]} parent={this} />
          );
      }
    }
  }

  render() {
    let { showDataPanel, reload } = this.state;
    return (
      <div className={st.LayerControl}>
        <div className={`${std.h1} iconfont icon-tuceng`}>地图图层设置</div>
        <div className={std.slider} />
        <Button type="dashed" style={{ width: '100%' }} onClick={e => this.showDataPanel()}>
          添加数据
        </Button>
        <div className={st.layers}>{this.getLayerItems()}</div>
        <div className={std.slider} />
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>图层设置</div>
            <div className={std.fitem_st}>编辑数据样式</div>
          </div>
        </div>
        <div className={st.editpanel}>{reload ? null : this.getEditPanel()}</div>
        <Modal
          title="添加数据"
          visible={showDataPanel}
          width={800}
          destroyOnClose={true}
          onCancel={e => this.hiddenDataPanel()}
          onOk={e => this.hiddenDataPanel()}
          centered={true}
        >
          <DataPanel layerAdded={this.addLayer.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default LayerControl;
