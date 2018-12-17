import {
    DATAFILTER_CHANGE_SEARCHVALUE,
    DATAFILTER_GET_TAGLIST,
    OPENSHAREDATA_INIT_OPENDATALIST,
    PRIVATEDATACATALOG_INIT_PRIVATEDATALIST,
    PRIVATEDATACATALOG_GET_UPLOADFILEDATA,
    PRIVATEDATACATALOG_CHANGE_UPLOADFILEVISIBLE,
    PRIVATEDATACATALOG_SET_UPLOADFILESTEPCURRENT,
    PRIVATEDATACATALOG_SET_UPLOADFILEGEOMFIELDTYPE,
    PRIVATEDATACATALOG_GET_UPLOADFILEGEOMFIELD
} from './actionTypes';

const defaultState = {
    //PublicDataCatalog
    openDataCatalog: [],
    //PrivateDataCatalog
    privateDataCatalog:[],
    //PrivateDataCatalog_Upload
    uploadFileReturnDataThead:[],
    uploadFileReturnDataTbody:[],
    uploadFileReturnDataFile:'',
    uploadFileVisible:false,
    uploadFileStepCurrent:0,
    uploadFileGeomFieldType:'经纬度',           //经纬度|WKT格式|不含空间字段
    uploadFileGeomField:{},
    //Selector
    tagList: [],             //'统计','财政税收','交通','安全','测绘','医疗卫生','教育','社区'
    selectedTag:'',
    searchCatalogValue: ''
}

export default (state = defaultState, action) => {
    //Selector 监听查询框变化
    if (action.type === DATAFILTER_CHANGE_SEARCHVALUE) {
        const newState = JSON.parse(JSON.stringify(state));             //深拷贝
        newState.searchCatalogValue = action.value;
        return newState;
    }

    //Selector 获取Tag列表
    if (action.type === DATAFILTER_GET_TAGLIST) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.tagList = action.value;
        return newState;
    }

    //OpenShareData 开放数据目录列表初始化
    if (action.type === OPENSHAREDATA_INIT_OPENDATALIST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.openDataCatalog = action.data;
        newState.selectedTag = action.value;
        newState.searchCatalogValue = '';
        return newState;
    }

    //PrivateData 个人数据目录列表初始化
    if(action.type === PRIVATEDATACATALOG_INIT_PRIVATEDATALIST){
        let newState = JSON.parse(JSON.stringify(state));
        newState.privateDataCatalog = action.data;
        newState.selectedTag = action.value;
        newState.searchCatalogValue = '';
        return newState;
    }

    //PrivateData 上传文件模块获取文本解析后的JSON对象
    if(action.type === PRIVATEDATACATALOG_GET_UPLOADFILEDATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.uploadFileReturnDataThead = action.data.Thead;
        newState.uploadFileReturnDataTbody = action.data.Tbody;
        newState.uploadFileReturnDataFile = action.data.FileName;
        return newState;
    }

    //PrivateData 上传文件模块是否显示
    if(action.type === PRIVATEDATACATALOG_CHANGE_UPLOADFILEVISIBLE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.uploadFileVisible = action.value;
        return newState;
    }

    //PrivateData 上传文件模块上传步骤
    if(action.type === PRIVATEDATACATALOG_SET_UPLOADFILESTEPCURRENT){
        const newState = JSON.parse(JSON.stringify(state));
        newState.uploadFileStepCurrent = action.value;
        return newState;
    }

    //PrivateData 上传文件模块空间字段类型
    if(action.type === PRIVATEDATACATALOG_SET_UPLOADFILEGEOMFIELDTYPE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.uploadFileGeomFieldType = action.value;
        return newState;
    }

    //PrivateData 上传文件模块空间字段配置
    if(action.type === PRIVATEDATACATALOG_GET_UPLOADFILEGEOMFIELD){
        const newState = JSON.parse(JSON.stringify(state));
        newState.uploadFileGeomField = action.value;
        return newState;
    }
    return state;
}