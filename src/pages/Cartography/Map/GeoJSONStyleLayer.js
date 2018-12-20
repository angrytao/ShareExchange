import { getSymbol } from './icons';

let GeoJSONStyleLayer = L.GeoJSON.extend({
  _config_: {},
  initialize: function(geoJSON, config) {
    if (config && config.options) L.setOptions(this, config.options);
    L.extend(this._config_, config);
    this._layers = {};
    if (geoJSON) {
      this.addData(geoJSON);
      this.refreshSymbols();
      if (geoJSON.features || geoJSON.features.length) {
        let ft = geoJSON.features[0];
        let fields = [];
        for (let i in ft.properties) {
          fields.push(i);
        }
        this.fields = fields;
        this._data_ = geoJSON.features.map(i => [
          i.geometry.coordinates[1],
          i.geometry.coordinates[0],
        ]);
      }
    }
  },
  setRender(render) {
    this._config_.render = render;
    this.refreshSymbols();
  },
  refreshSymbols: function() {
    let { render } = this._config_;
    if (render) {
      switch (render.type) {
        case 'simple':
          let symbol = getSymbol({
            geoType: render.geoType,
            ...render.symbol,
          });
          this.eachLayer(l => {
            if (l.setIcon !== undefined) {
              l.setIcon(symbol);
            } else if (l.setStyle !== undefined) {
              l.setStyle(symbol);
            }
          });
          break;
        case 'uniquevalue':
          break;
        case 'classbreak':
          break;
      }
    }
  },
});

export default GeoJSONStyleLayer;
