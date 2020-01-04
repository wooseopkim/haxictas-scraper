import * as https from 'https';
import * as qs from 'querystring';
import axios from 'axios';
import {MenuCallback, CafeteriaCallback} from '../../scraper';

export async function menus(date: Date, callback: MenuCallback) {
    const url = 'https://dorm.snu.ac.kr/dk_board/facility/food.php';
    
    const startDate = date.getTime() / 1000;
    
    const query = qs.stringify({'start_date2': startDate});
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    const opts = {httpsAgent: httpsAgent};
    const _callback = (responseBody?: string, err?: {}) => {
        callback({data: responseBody, date: date}, err)
    };
    return axios.get(`${url}?${query}`, opts)
        .then(x => _callback(x.data))
        .catch(err => _callback(null, err));
};

export async function cafeterias(callback: CafeteriaCallback) {
    const url = 'https://dorm.snu.ac.kr/dk_board/dk_dormitory/dorm_content.php?ht_id=snu2_1_1';
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    const opts = {httpsAgent: httpsAgent};
    return axios.get(url, opts)
        .then(x => callback(x.data))
        .catch(err => callback(null, err));
};
