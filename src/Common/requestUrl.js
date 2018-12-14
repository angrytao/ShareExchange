let baseUrl = 'api';

let requestGetTag = `${baseUrl}/ShareData/GetTagList`;
let requestGetShareData = `${baseUrl}/ShareData/GetOpenDataCatalog `;
let requestGetShareDataByUser = `${baseUrl}/ShareData/GetUserShareData`;

export {
    requestGetTag,
    requestGetShareData,
    requestGetShareDataByUser
}