import { HttpService } from './apiUtility';

class MatchAPI {
    static getAllAPIPage(event, data, insrtData = null, edtID = null, edtData = null, SlctDltId = null) {
        return HttpService(event, data, insrtData, edtID, edtData, SlctDltId);
    }

    static getMenuCat(event, data) {
        return HttpService(event, data);
    }
}

export default MatchAPI;
