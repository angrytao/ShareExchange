import { 
    DATAFILTER_CHANGE_SEARCHVALUE, 
    DATAFILTER_GET_TAGLIST,
    OPENSHAREDATA_INIT_OPENDATALIST,
    PRIVATEDATACATALOG_INIT_PRIVATEDATALIST,
    PRIVATEDATACATALOG_GET_UPLOADFILEDATA,
    PRIVATEDATACATALOG_CHANGE_UPLOADFILEVISIBLE,
    PRIVATEDATACATALOG_SET_UPLOADFILESTEPCURRENT,
    PRIVATEDATACATALOG_SET_UPLOADFILEGEOMFIELDTYPE
} from './actionTypes';

//Selector 监听查询框变化
const getDataFilterSearchValueChange = (value) => ({
    type:DATAFILTER_CHANGE_SEARCHVALUE,
    value
});

//Selector 获取Tag列表
const getDataFilterTagListGet = (value) => ({
    type:DATAFILTER_GET_TAGLIST,
    value
});

//OpenShareData 开放数据目录列表初始化
const initOpenShareDataList = (data,value) => ({
    type:OPENSHAREDATA_INIT_OPENDATALIST,
    data,
    value
});

//PrivateData 个人数据目录列表初始化
const initPrivateDataList = (data,value) => ({
    type:PRIVATEDATACATALOG_INIT_PRIVATEDATALIST,
    data,
    value
});

//PrivateData 上传文件模块获取文本解析后的JSON对象
const getUploadFileData = (data) => ({
    type:PRIVATEDATACATALOG_GET_UPLOADFILEDATA,
    data
});

//PrivateData 上传文件模块是否显示
const changeUploadFileVisible = (value) => ({
    type:PRIVATEDATACATALOG_CHANGE_UPLOADFILEVISIBLE,
    value
});

//PrivateData 上传文件模块上传步骤
const setUploadFileStepCurrent = (value) => ({
    type:PRIVATEDATACATALOG_SET_UPLOADFILESTEPCURRENT,
    value
});

//PrivateData 上传文件模块空间字段类型
const setUploadFileGeomFieldType = (value) => ({
    type:PRIVATEDATACATALOG_SET_UPLOADFILEGEOMFIELDTYPE,
    value
});

export {
    getDataFilterSearchValueChange,
    getDataFilterTagListGet,
    initOpenShareDataList,
    initPrivateDataList,
    getUploadFileData,
    changeUploadFileVisible,
    setUploadFileStepCurrent,
    setUploadFileGeomFieldType
}