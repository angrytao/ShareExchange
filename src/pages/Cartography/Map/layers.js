import { getMarkerSymbol } from './icons';
import GeoJSONStyleLayer from './GeoJSONStyleLayer';

const ARCGIS_TILED = 'arcgis_tiled';
const ARCGIS_DYNAMIC = 'arcgis_dynamic';
const ARCGIS_HEAT = 'arcgis_heat';
const ARCGIS_CLUSTER = 'arcgis_cluster';
const GEOJSON_POINT = 'geojson_point';
const GEOJSON_POLYLINE = 'geojson_polyline';
const GEOJSON_POLYGON = 'geojson_polygon';
const GEOJSON_HEAT = 'geojson_heat';
const GEOJSON_CLUSTER = 'geojson_cluster';

const layerTypes = {
  ARCGIS_TILED: {
    type: ARCGIS_TILED,
    name: 'ArcGIS切片',
  },
  ARCGIS_DYNAMIC: {
    type: ARCGIS_DYNAMIC,
    name: 'ArcGIS动态',
  },
  ARCGIS_HEAT: {
    type: ARCGIS_HEAT,
    name: 'ArcGIS热力',
  },
  ARCGIS_CLUSTER: {
    type: ARCGIS_CLUSTER,
    name: 'ArcGIS聚合',
  },
  GEOJSON_POINT: {
    type: GEOJSON_POINT,
    name: 'GeoJSON点',
  },
  GEOJSON_POLYLINE: {
    type: GEOJSON_POLYLINE,
    name: 'GeoJSON线',
  },
  GEOJSON_POLYGON: {
    type: GEOJSON_POLYGON,
    name: 'GeoJSON面',
  },
  GEOJSON_HEAT: {
    type: GEOJSON_HEAT,
    name: 'GeoJSON热力',
  },
  GEOJSON_CLUSTER: {
    type: GEOJSON_CLUSTER,
    name: 'GeoJSON聚合',
  },
};

// {
//     type:'',
//     name:'',
//     url:'',
//     data:'',
//     options:''
// }

let getLayer = layer => {
  let options = null,
    l = null;
  switch (layer.type) {
    case ARCGIS_TILED:
      options = {
        url: layer.url,
        ...layer.options,
      };
      l = L.esri.tiledMapLayer(options);
      l._config_ = layer;
      return l;
    case ARCGIS_DYNAMIC:
      options = {
        url: layer.url,
        ...layer.options,
      };
      l = L.esri.dynamicMapLayer(options);
      l._config_ = layer;
      return l;
    case ARCGIS_HEAT:
      options = {
        url: layer.url,
        ...layer.options,
      };
      l = L.esri.Heat.featureLayer(options);
      l._config_ = layer;
      return l;
    case ARCGIS_CLUSTER:
      options = {
        url: layer.url,
        ...layer.options,
        polygonOptions: {
          stroke: false,
          fillColor: 'red',
          fillOpacity: 0.4,
        },
      };
      if (layer.style) {
        let icon = getMarkerSymbol(layer.style);
        options.pointToLayer = function(geojson, latlng) {
          return L.marker(latlng, { icon: icon });
        };
      }
      l = L.esri.Cluster.featureLayer(options);
      l._config_ = layer;
      return l;
    case GEOJSON_POINT:
      l = new GeoJSONStyleLayer(window.data[layer.dataId], layer);
      l._config_ = layer;
      return l;
    case GEOJSON_POLYLINE:
      break;
    case GEOJSON_POLYGON:
      break;
    case GEOJSON_HEAT:
      l = L.heatLayer(layer.data, layer.options);
      l._config_ = layer;
      return l;
    case GEOJSON_CLUSTER:
      l = L.markerClusterGroup();
      let icon = getMarkerSymbol(layer.style);
      layer.data.map(i => {
        l.addLayer(L.marker(i, { icon: icon }));
      });
      l._config_ = layer;
      return l;
    default:
      return null;
  }
};

export { getLayer, layerTypes };
