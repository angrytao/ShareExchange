import { Component } from 'react';
import { Switch, Tooltip, Icon, Slider } from 'antd';

import EditMarker from './EditMarker';
import EditPolygon from './EditPolygon';
import EditPolyline from './EditPolyline';

import st from './DrawTool.less';
import std from '../default.less';

class DrawTool extends Component {
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
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
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
                <span className="iconfont icon-location" />
              </Tooltip>
              <Tooltip placement="top" title="绘制线">
                <span className="iconfont icon-xian" />
              </Tooltip>
              <Tooltip placement="top" title="绘制面">
                <span className="iconfont icon-polygon" />
              </Tooltip>
              <Tooltip placement="top" title="添加文字">
                <span className="iconfont icon-wenzi" />
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
          </div>
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
