import { 
    DATAFILTER_CHANGE_SEARCHVALUE,
    DATAFILTER_GET_TAGLIST
} from './actionTypes';

const defaultState = {
    tagList:['全部','统计','财政税收','交通','安全','测绘','医疗卫生','教育','社区'],
    searchCatalogValue:''
}

export default (state = defaultState, action) => {
    //DataFilter 监听查询框变化
    if(action.type === DATAFILTER_CHANGE_SEARCHVALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.searchCatalogValue = action.value;
        return newState;
    }

    //DataFilter 获取Tag列表
    if(action.type === DATAFILTER_GET_TAGLIST){
        const newState = JSON.parse(JSON.stringify(state));
        newState.tagList = action.value;
        return newState;
    }
    return state;
}