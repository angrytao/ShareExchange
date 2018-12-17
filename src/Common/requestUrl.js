let baseUrl = 'api';

let requestGetTag = `${baseUrl}/ShareData/GetTagList`;
let requestGetShareData = `${baseUrl}/ShareData/GetOpenDataCatalog `;
let requestGetShareDataByUser = `${baseUrl}/ShareData/GetUserShareData`;
let uploadShareDataFile = `${baseUrl}/FileHandle/UploadFile`;

export {
    requestGetTag,
    requestGetShareData,
    requestGetShareDataByUser,

    uploadShareDataFile
}