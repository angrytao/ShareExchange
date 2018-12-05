import { 
    DATAFILTER_CHANGE_SEARCHVALUE, 
    DATAFILTER_GET_TAGLIST
} from './actionTypes';

const getDataFilterSearchValueChange = (value) => ({
    type:DATAFILTER_CHANGE_SEARCHVALUE,
    value
});

const getDataFilterTagListGet = (value) => ({
    type:DATAFILTER_GET_TAGLIST,
    value
});

export {
    getDataFilterSearchValueChange,
    getDataFilterTagListGet
}