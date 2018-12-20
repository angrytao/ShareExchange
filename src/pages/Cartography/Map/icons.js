import './icons.less';

let normalIcons = {
  locateRed: L.divIcon({
    className: 'div-icon0',
    iconSize: [25, 36],
    iconAnchor: [13, 32],
    popupAnchor: [0, -35],
    tooltipAnchor: [0, -35],
  }),
  locateBlue: L.divIcon({
    className: 'div-icon1',
    iconSize: [25, 36],
    iconAnchor: [13, 32],
    popupAnchor: [0, -35],
    tooltipAnchor: [0, -35],
  }),
  touchIcon: L.divIcon({
    iconSize: [16, 16],
    className: 'ct-touchicon',
  }),
};

let editIcon = L.divIcon({
  iconSize: [16, 16],
  className: 'ct-editicon',
});

let svgicons = {
  'icon-keyiyidongderendeweizhi': {
    className: 'ct-icon',
    iconSize: [40, 40],
    iconAnchor: [40, 20],
    popupAnchor: [0, -20],
  },
  'icon-weizhi-moren': {
    className: 'ct-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -20],
  },
  'icon-weizhi21': {
    className: 'ct-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 36],
    popupAnchor: [0, -20],
  },
};

let initIcons = () => {
  let icons = {};
  for (let i in svgicons) {
    let icon = svgicons[i];
    let html = `<svg class="icon" aria-hidden="true"><use xlink:href="#${i}"></use></svg>`;

    let nicon = L.divIcon({
      ...icon,
      html: html,
    });
    icons[i] = nicon;
  }
  return {
    ...normalIcons,
    ...icons,
  };
};

let icons = initIcons();

let svgIcons = [
  {
    category: 'normal',
    name: '常用',
    icons: [
      'icon-weizhi',
      'icon-fujinmendianweizhi',
      'icon-flag',
      'icon-renweizhi',
      'icon-shoufeizhanzhongdian',
      'icon-shoufeizhanqidianeee',
      'icon-shigongquyu',
      'icon-ting',
      'icon-renwu-yichang',
      'icon-renwu',
      'icon-yundong1',
      'icon-qiyeyonghu',
    ],
  },
  {
    category: 'normal0',
    name: '生活',
    icons: [
      'icon-weifang',
      'icon-huodongicons_senyangyundong',
      'icon-yiyuan',
      'icon-shexiangtou',
      'icon-shexiangtou2-copy-copy',
      'icon-weixianhuaxuepin',
      'icon-tingchechang1',
      'icon-huoHOT',
      'icon-ranqi',
      'icon-shui',
      'icon-dianli-sudu',
      'icon-xuexiaologo',
    ],
  },
  {
    category: 'traffic',
    name: '交通',
    icons: [
      'icon-tuolaji1',
      'icon-xiaoche',
      'icon-zihangche',
      'icon-anquan',
      'icon-zhishengji',
      'icon-xiaofangche',
      'icon-lameiche',
      'icon-lahuoche',
      'icon-jiuhuche',
      'icon-jingcha',
      'icon-honglvdeng',
      'icon-anquanbiaozhi',
    ],
  },
  {
    category: 'tree',
    name: '树木',
    icons: [
      'icon-tree35',
      'icon-tree34',
      'icon-tree33',
      'icon-tree30',
      'icon-tree27',
      'icon-tree13',
      'icon-tree3',
      'icon-tree',
      'icon-tree5',
      'icon-tree6',
      'icon-tree24',
      'icon-tree10',
    ],
  },
  {
    category: 'building',
    name: '建筑',
    icons: [
      'icon--nautical',
      'icon--propellers',
      'icon--chimneys',
      'icon--health-clinic',
      'icon--radio-waves',
      'icon--radio-waves',
      'icon-station',
      'icon-observatory',
      'icon-gas-station',
      'icon-factory',
      'icon-church',
      'icon-ambulance',
    ],
  },
];

let getSVGHtml = icon =>
  `<svg class="icon" aria-hidden="true"><use xlink:href="#${icon}"></use></svg>`;

let getSVGIcon = (icon, size) => {
  let html = getSVGHtml(icon);
  return L.divIcon({ className: 'ct-icon', html: html, iconSize: [size, size] });
};

let getPictureMarker = (icon, size) => {
  return getSVGIcon(icon, size);
};

let getCircleMarker = cfg => {
  let { size, shadowSize, color } = cfg;
  let { r, g, b, a } = color;

  (size = size !== undefined ? size : dfSMarker.size),
    (r = r !== undefined ? r : dfSMarker.color.r),
    (g = g !== undefined ? g : dfSMarker.color.g),
    (b = b !== undefined ? b : dfSMarker.color.b),
    (shadowSize = shadowSize !== undefined ? shadowSize : dfSMarker.shadowSize);

  let icon = L.divIcon({
    html: `<div class="circle-marker ${cfg.effect ||
      ''}" style="background:rgba(${r},${g},${b},${a});box-shadow:0 0 0 ${shadowSize}px rgba(${r},${g},${b},${a *
      0.3})"></div>`,
    iconSize: [size, size],
    className: 'ct-divicon',
  });
  return icon;
};

let getMarkerSymbol = style => {
  switch (style.type) {
    case 'circleMarker':
      return getCircleMarker(style);
    case 'pictureMarker':
      return getPictureMarker(style.icon, style.size);
    default:
      return L.Icon.Default;
  }
};

let dfSMarker = {
  type: 'circleMarker',
  size: 12,
  shadowSize: 3,
  effect: null,
  color: {
    r: 255,
    g: 0,
    b: 0,
    a: 0.8,
  },
};

let dfPolylineStyle = {
  stroke: true,
  color: { r: 255, g: 0, b: 0, a: 0.8 },
  weight: 4,
  fill: false,
};

let dfPolygonStyle = {
  stroke: true,
  color: { r: 255, g: 0, b: 0, a: 0.8 },
  fillColor: { r: 255, g: 0, b: 0, a: 0.2 },
  weight: 4,
  fill: true,
};

function getDashArray(dashArray, weight) {
  switch (dashArray) {
    case 'solid':
      return null;
    case 'dotted':
      return `${weight},${weight * 2}`;
    case 'dashed':
      return `${weight * 2},${weight * 4}`;
  }
}

function getDrawLineSymbol(style) {
  return {
    shapeOptions: getLineSymbol(style),
    icon: editIcon,
    touchIcon: editIcon,
    showLength: false,
  };
}

function getDrawPolygonSymbol(style) {
  return {
    shapeOptions: getPolygonSymbol(style),
    icon: editIcon,
    touchIcon: editIcon,
    showArea: false,
  };
}

function getLineSymbol(style) {
  return {
    ...style,
    weight: style.weight,
    color: `rgb(${style.color.r},${style.color.g},${style.color.b})`,
    opacity: style.color.a,
    dashArray: getDashArray(style.dashArray, style.weight),
  };
}

function getPolygonSymbol(style) {
  return {
    ...style,
    weight: style.weight,
    color: `rgb(${style.color.r},${style.color.g},${style.color.b})`,
    opacity: style.color.a,
    fillColor: `rgb(${style.fillColor.r},${style.fillColor.g},${style.fillColor.b})`,
    fillOpacity: style.fillColor.a,
    dashArray: getDashArray(style.dashArray, style.weight),
  };
}

function getSymbol(style) {
  let { geoType } = style;
  switch (geoType) {
    case 'point':
      return getMarkerSymbol(style);
    case 'polyline':
      return getLineSymbol(style);
    case 'polygon':
      return getPolygonSymbol(style);
  }
}

let dfCircleMarkerStyle = dfSMarker;
let dfPictureMarkerStyle = {
  type: 'pictureMarker',
  size: 20,
  icon: 'icon-shoufeizhanzhongdian',
};

export {
  getSymbol,
  getCircleMarker,
  getPictureMarker,
  dfCircleMarkerStyle,
  dfPictureMarkerStyle,
  getMarkerSymbol,
  dfPolylineStyle,
  dfPolygonStyle,
  getDrawLineSymbol,
  getDrawPolygonSymbol,
  getLineSymbol,
  getPolygonSymbol,
  editIcon,
  svgIcons,
  getSVGIcon,
  getSVGHtml,
};

export default icons;
