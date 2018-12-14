import { Component } from 'react';
import { Popover, Tooltip, Icon } from 'antd';
import L from '../../../refs/leafletExtends';
import st from './Map.less';

import { mapConfig } from '../../../../config/ctconfig';

import icons from './icons.js';
const { locateRed, locateBlue, touchIcon } = icons;

class Map extends Component {
  constructor(ps) {
    super(ps);
  }

  static defaultProps = {
    baseMap: ['vec', 'vec_anno'],
  };

  state = {
    title: {},
    content: {},
    showLevel: false,
    showMeasure: false,
    showBaseMapToggle: false,
  };

  changeBaseMap(types, fire) {
    if (this.baseMap) this.baseMap.remove();
    this.baseMap = L.tileLayer.getGroupLayer(types).addTo(this.map); //.bringToBack();
    this.baseMap.setZIndex(0);
    if (fire) this.fire('baseMapChange', types);
  }

  initMap() {
    let dom = this.mapDom;
    var map = L.map(dom, {
      ...mapConfig,
      crs: L.CRS.EPSG4490,
      attributionControl: false,
      zoomControl: false,
    });
    window.map = map;
    this.map = map;
    let { baseMap } = this.props;
    this.changeBaseMap(baseMap);
    map.on('zoom', this.changeLevel.bind(this));
    this.changeLevel();
  }

  setTitle(title) {
    this.setState({ title: title });
  }

  setContent(content) {
    this.setState({ content: content });
  }

  setZoom(add) {
    if (add) {
      if (!this.zoom)
        this.zoom = L.control.zoom({
          position: 'topright',
          zoomInTitle: '放大',
          zoomOutTitle: '缩小',
        });
      this.zoom.addTo(this.map);
    } else {
      if (this.zoom) this.zoom.remove();
    }
  }

  setScale(add) {
    if (add) {
      if (!this.scale) this.scale = L.control.scale({ position: 'bottomleft', imperial: false });
      this.scale.addTo(this.map);
    } else {
      if (this.scale) this.scale.remove();
    }
  }

  setLevel(add) {
    let level = this.level;
    if (level) {
      $(level).css('display', add ? 'block' : 'none');
    }
  }

  changeLevel() {
    let level = this.level;
    if (level) {
      $(level).html(this.map.getZoom());
    }
  }

  toggleLevel(show) {
    this.setState({ showLevel: show });
  }

  toggleMeasure(show) {
    this.setState({ showMeasure: show });
  }

  toggleBaseMapToggle(show) {
    this.setState({ showBaseMapToggle: show });
  }

  toggleMousePosition(show) {
    if (show) {
      if (!this.mousePosition) this.mousePosition = new L.Control.MousePosition();
      this.mousePosition.addTo(this.map);
    } else {
      if (this.mousePosition) this.mousePosition.remove();
    }
  }

  toggleMapContent(show, content) {
    if (show) {
      if (!this.attribution) {
        this.attribution = L.control.attribution({ position: 'bottomleft', prefix: false });
      }
      this.attribution.addTo(this.map);
      $(this.attribution._container).html(content);
    } else {
      if (this.attribution) this.attribution.remove();
    }
  }

  initMapTools() {
    let map = this.map;
    let msArea = new L.Draw.Polygon(map, {
      showArea: true,
      feet: false,
      // allowIntersection 必须为false才能显示面积
      allowIntersection: false,
      shapeOptions: {
        stroke: true,
        color: 'red',
        weight: 4,
        opacity: 0.5,
        fill: true,
        clickable: true,
      },
      icon: touchIcon,
    });

    msArea.on(L.Draw.Event.CREATED, e => {
      this.clearMeasureAreaLayer();
      var { layer } = e;
      this.measureAreaLayer = layer;
      var dom = document.createElement('div');
      var latlngs = layer.getLatLngs()[0];
      var area = L.GeometryUtil.geodesicArea(latlngs);
      var text = L.GeometryUtil.readableArea(area, true);

      ReactDOM.render(
        <div>
          总面积：<span>{text}</span>
          <Icon type="close-square-o" onClick={e => this.clearMeasureAreaLayer()} />
        </div>,
        dom
      );

      layer
        .bindTooltip(dom, {
          permanent: true,
          interactive: true,
          direction: 'right',
          className: 'measuretooltip',
        })
        .addTo(this.map)
        .openTooltip(latlngs[0]);
    });
    this.msArea = msArea;

    let msLength = new L.Draw.Polyline(map, {
      shapeOptions: {
        stroke: true,
        color: 'red',
        weight: 4,
        opacity: 0.5,
        fill: false,
        clickable: true,
      },
      icon: touchIcon,
    });

    msLength.on(L.Draw.Event.CREATED, e => {
      this.clearMeasureLengthLayer();
      var { layer } = e;
      this.measureLengthLayer = layer;

      var dom = document.createElement('div');
      var latlngs = layer.getLatLngs();
      var distance = 0;
      for (let i = 0, j = latlngs.length - 1; i < j; i++) {
        let p1 = latlngs[i],
          p2 = latlngs[i + 1];
        distance += this.map.distance(p1, p2);
      }

      var text = L.GeometryUtil.readableDistance(distance, true, false, false, 2);

      ReactDOM.render(
        <div>
          总长度：<span>{text}</span>
          <Icon type="close-square-o" onClick={e => this.clearMeasureLengthLayer()} />
        </div>,
        dom
      );

      layer
        .bindTooltip(dom, {
          permanent: true,
          interactive: true,
          direction: 'right',
          className: 'measuretooltip',
        })
        .addTo(this.map)
        .openTooltip(latlngs[latlngs.length - 1]);
    });
    this.msLength = msLength;

    let msCoordinates = new L.Draw.Marker(map, { icon: locateBlue });
    msCoordinates.on(L.Draw.Event.CREATED, e => {
      this.clearCoordinatesLayer();
      var { layer } = e;
      this.coordinatesLayer = layer;

      var latlngs = layer.getLatLng();
      let { lat, lng } = latlngs;

      this.coordinatesLayer
        .bindPopup(
          `<div class='coordinatestooltip'><input type="text" value="[${lng.toFixed(
            6
          )},${lat.toFixed(6)}]"/></div>`
        )
        .addTo(this.map)
        .openPopup();
    });
    this.msCoordinates = msCoordinates;
  }

  locate() {
    let { lat, lng } = this;
    if (lat && lng) {
      this.clearLocateLayer();
      let pnt = [lat, lng];
      this.locateLayer = L.marker(pnt, { icon: locateRed }).addTo(this.map);
      this.map.setView(pnt);
    }
  }

  clearLocateLayer() {
    if (this.locateLayer) {
      this.locateLayer.remove();
    }
  }

  clearCoordinatesLayer() {
    if (this.coordinatesLayer) {
      this.coordinatesLayer.remove();
    }
  }

  clearMeasureLengthLayer() {
    if (this.measureLengthLayer) {
      this.measureLengthLayer.remove();
    }
  }

  clearMeasureAreaLayer() {
    if (this.measureAreaLayer) {
      this.measureAreaLayer.remove();
    }
  }

  activeMSLength() {
    this.disableMSTools();
    this.msLength.enable();
  }

  activeMSArea() {
    this.disableMSTools();
    this.msArea.enable();
  }

  disableMSTools() {
    this.msArea.disable();
    this.msLength.disable();
    this.msCoordinates.disable();
  }

  activeMSCoordinates() {
    this.disableMSTools();
    this.msCoordinates.enable();
  }

  clearMap() {
    this.clearMeasureAreaLayer();
    this.clearMeasureLengthLayer();
    this.clearCoordinatesLayer();
    this.fire('mapClear');
  }

  componentDidMount() {
    this.initMap();
    this.initMapTools();
  }

  render() {
    let { title, content, showLevel, showMeasure, showBaseMapToggle } = this.state;
    return (
      <div ref={e => (this.mapDom = e)} className={st.Map}>
        {title && title.showTitle ? (
          <div style={title} className={st.title}>
            {title.content || '请输入文字'}
          </div>
        ) : null}
        {content && content.showContent ? (
          <div className={st.content}>{content.content || '请输入文字'}</div>
        ) : null}

        <div ref={e => (this.toolbar = e)} className={st.toolbar}>
          <span className={showLevel ? '' : 'none'} ref={e => (this.level = e)} />
          <Popover
            overlayClassName="measurebar-popover"
            content={
              <div className={st.measurebar}>
                <Tooltip title="坐标" placement="top">
                  <span
                    className="iconfont icon-zuobiao"
                    onClick={e => this.activeMSCoordinates()}
                  />
                </Tooltip>
                <Tooltip title="测距" placement="top">
                  <span
                    className="iconfont icon-changduceliang"
                    onClick={e => this.activeMSLength()}
                  />
                </Tooltip>
                <Tooltip title="测面" placement="top">
                  <span className="iconfont icon-mianji" onClick={e => this.activeMSArea()} />
                </Tooltip>
                <Tooltip title="清除" placement="top">
                  <span className="iconfont icon-qingchu" onClick={e => this.clearMap()} />
                </Tooltip>
              </div>
            }
            placement="left"
          >
            <span className={showMeasure ? '' : 'none'}>
              <span className="iconfont icon-ziyoubiceliang" />
            </span>
          </Popover>
          <Popover
            content={
              <div className={st.basemap}>
                <div
                  onClick={e => {
                    this.changeBaseMap(['vec', 'vec_anno'], true);
                  }}
                >
                  <div>地&ensp;图</div>
                </div>
                <div
                  onClick={e => {
                    this.changeBaseMap(['img', 'img_anno'], true);
                  }}
                >
                  <div>影&ensp;像</div>
                </div>
              </div>
            }
            placement="left"
          >
            <span className={showBaseMapToggle ? '' : 'none'}>
              <span className="iconfont icon-geographic-information" />
            </span>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Map;
