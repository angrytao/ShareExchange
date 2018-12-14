import { 
    DATAFILTER_CHANGE_SEARCHVALUE, 
    DATAFILTER_GET_TAGLIST,
    OPENSHAREDATA_INIT_OPENDATALIST,
    PRIVATEDATACATALOG_INIT_PRIVATEDATALIST
} from './actionTypes';

const getDataFilterSearchValueChange = (value) => ({
    type:DATAFILTER_CHANGE_SEARCHVALUE,
    value
});

const getDataFilterTagListGet = (value) => ({
    type:DATAFILTER_GET_TAGLIST,
    value
});

const initOpenShareDataList = (data,value) => ({
    type:OPENSHAREDATA_INIT_OPENDATALIST,
    data,
    value
});

const initPrivateDataList = (data,value) => ({
    type:PRIVATEDATACATALOG_INIT_PRIVATEDATALIST,
    data,
    value
});

export {
    getDataFilterSearchValueChange,
    getDataFilterTagListGet,
    initOpenShareDataList,
    initPrivateDataList
}