import {
    DATAFILTER_CHANGE_SEARCHVALUE,
    DATAFILTER_GET_TAGLIST,
    OPENSHAREDATA_INIT_OPENDATALIST
} from './actionTypes';

const defaultState = {
    openDataCatalog: [],
    privateDataCatalog:[],
    tagList: [],             //'统计','财政税收','交通','安全','测绘','医疗卫生','教育','社区'
    selectedTag:'',
    searchCatalogValue: ''

}

export default (state = defaultState, action) => {
    //DataFilter 监听查询框变化
    if (action.type === DATAFILTER_CHANGE_SEARCHVALUE) {
        const newState = JSON.parse(JSON.stringify(state));             //深拷贝
        newState.searchCatalogValue = action.value;
        return newState;
    }

    //DataFilter 获取Tag列表
    if (action.type === DATAFILTER_GET_TAGLIST) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.tagList = action.value;
        return newState;
    }

    //OpenShareData 获取开放数据目录列表
    if (action.type === OPENSHAREDATA_INIT_OPENDATALIST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.openDataCatalog = action.data;
        newState.selectedTag = action.value;
        newState.searchCatalogValue = '';
        return newState;
    }

    //PrivateData 获取个人数据目录列表
    if(action.type === PRIVATEDATACATALOG_INIT_PRIVATEDATALIST){
        let newState = JSON.parse(JSON.stringify(state));
        newState.privateDataCatalog = action.data;
        newState.selectedTag = action.value;
        newState.searchCatalogValue = '';
        return newState;
    }
    return state;
}