import { layerTypes, getLayer } from '../Map/layers';
import { dfCircleMarkerStyle, dfPictureMarkerStyle } from '../Map/icons';

let layers = [
  {
    name: '购物',
    type: layerTypes.GEOJSON_POINT.type,
    typeAlias: layerTypes.GEOJSON_POINT.name,
    dataId: 'gw',
    render: {
      geoType: 'point',
      type: 'simple',
      symbol: {
        ...dfCircleMarkerStyle,
      },
    },
  },
  {
    name: '古树名木',
    type: layerTypes.GEOJSON_POINT.type,
    typeAlias: layerTypes.GEOJSON_POINT.name,
    dataId: 'gsmm',
    render: {
      geoType: 'point',
      type: 'simple',
      symbol: {
        ...dfCircleMarkerStyle,
      },
    },
  },
];

let layers0 = [
  {
    name: '古树名木',
    url: 'http://183.134.6.74:6080/arcgis/rest/services/TDTPH/GSMM/MapServer',
    type: layerTypes.ARCGIS_DYNAMIC.type,
    typeAlias: layerTypes.ARCGIS_DYNAMIC.name,
  },
  {
    name: '主要地理单元',
    url: 'http://183.134.6.74:6080/arcgis/rest/services/TDTPH/ZYDLDY/MapServer',
    type: layerTypes.ARCGIS_DYNAMIC.type,
    typeAlias: layerTypes.ARCGIS_DYNAMIC.name,
  },
  {
    name: '水洞埭社区人员分布',
    url: 'http://183.134.6.74:6080/arcgis/rest/services/TDTPH/SDDSQ/MapServer',
    type: layerTypes.ARCGIS_DYNAMIC.type,
    typeAlias: layerTypes.ARCGIS_DYNAMIC.name,
  },
  {
    name: '公交站',
    url: 'http://183.134.6.74:6080/arcgis/rest/services/TDTPH/CXGJ/MapServer',
    type: layerTypes.ARCGIS_DYNAMIC.type,
    typeAlias: layerTypes.ARCGIS_DYNAMIC.name,
  },
];

export { layers, layers0 };
