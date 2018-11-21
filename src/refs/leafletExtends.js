let L = window.L;

/*
嘉兴天地图扩展
使用：
var vec = L.tileLayer.TDTJX({type: 'vec'});
var vec_anno = L.tileLayer.TDTJX({type: 'vec_anno'});
map = L.map('map', {
    crs: L.CRS.EPSG4490,
    center: [30.75, 120.75],
    zoom: 19
map.addLayer(vec);
*/
L.TileLayer.TDTJX = L.TileLayer.extend({
  urls: {
    vec: {
      g: {
        url: 'http://t0.tianditu.com/vec_c/wmts',
        options: {
          layer: 'vec',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
        options: {
          layer: 'ZJEMAP_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },

      d: {
        // url: 'http://220.191.220.90/JXEMAP/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXEMAP/service/wmts ',
        options: {
          layer: 'JXEMAP',
          tilematrixSet: 'TileMatrixSet0',
          format: 'image/png',
        },
      },
    },
    vec_anno: {
      g: {
        url: 'http://t0.tianditu.com/cva_c/wmts',
        options: {
          layer: 'cva',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
        options: {
          layer: 'ZJEMAPANNO_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXEMAPANNO/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXEMAPANNO/service/wmts',
        options: {
          layer: 'JXEMAPANNO',
          tilematrixSet: 'TileMatrixSet0',
          format: 'image/png',
        },
      },
    },
    img: {
      g: {
        url: 'http://t0.tianditu.com/img_c/wmts',
        options: {
          layer: 'img',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJDOM_2D/wmts',
        options: {
          layer: 'ZJDOM_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/jpeg',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXIMG/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXIMG/service/wmts',
        options: {
          layer: 'JXIMG',
          tilematrixset: 'TileMatrixSet0',
          format: 'image/png',
        },
      },
    },
    img_anno: {
      g: {
        url: 'http://t0.tianditu.com/cia_c/wmts',
        options: {
          layer: 'cia',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJDOMANNO_2D/wmts',
        options: {
          layer: 'ZJDOMANNO_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXIMGANNO/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXIMGANNO/service/wmts ',
        options: {
          layer: 'JXIMGANNO',
          tilematrixset: 'TileMatrixSet0',
          format: 'image/png',
        },
      },
    },
  },
  initialize: function(options) {
    this.type = options.type;
    L.extend(this.options, options);
    this.options.maxZoom = 20;
    this.options.minZoom = 0;
    var titleSize = 256;
    var baseOption = {
      width: titleSize,
      height: titleSize,
      service: 'WMTS',
      request: 'GetTile',
      version: '1.0.0',
      tileSize: 256,
      style: 'default',
      errorTileUrl: 'http://10.73.1.48/geosoc/Content/img/error.png',
    };
    for (var n in this.urls) {
      var urlCfg = this.urls[n];
      for (var m in urlCfg) {
        urlCfg[m].options = L.extend(urlCfg[m].options, baseOption);
      }
    }
  },
  onAdd: function(map) {
    L.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function(tilePoint) {
    var urlOption = this.getUrlOption(this.type, tilePoint.z);
    var url = urlOption.url;
    url = L.Util.template(url, { s: this._getSubdomain(tilePoint) });
    return (
      url +
      L.Util.getParamString(urlOption.options, url) +
      '&tilematrix=' +
      tilePoint.z +
      '&tilerow=' +
      tilePoint.y +
      '&tilecol=' +
      tilePoint.x
    );
  },
  getUrlOption: function(type, zoom) {
    return this._getUrlOptionsByZoom(this.urls[type], zoom);
  },
  _getUrlOptionsByZoom: function(opt, zoom) {
    //0-13级使用国家服务
    if (zoom < 14) return opt.g;
    //14-17级使用省厅服务
    else if (zoom < 18) return opt.s;
    //18-20级使用地市级
    else return opt.d;
  },
});
/*
    options:{
        type:'vec'['vec_anno','img','img_anno']
    }
*/
L.tileLayer.TDTJX = function(options) {
  return new L.TileLayer.TDTJX(options);
};

L.CRS.EPSG4490 = L.extend({}, L.CRS.EPSG4326, {
  code: 'EPSG:4490',
  transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.25),
});

export default L;
