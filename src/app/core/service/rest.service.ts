import { Injectable } from '@angular/core';
import { RestConfig } from '../config/rest.config';
import { UtilService } from './util.service';

import { result } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(
        private utilService: UtilService
    ) {}

    /**
     * 根据路由解析成url common.login --> /login
     * @param route 需要解析的url路径
     * @param param 请求参数
     * @param mode 参数下发方式 默认url拼接参数下发
     */
    resolveUrl(route: string, param?: object, mode?: boolean) {

        let url = result(RestConfig, route, '');
        if (param && !mode) {
            url = this.utilService.serializeUrl(url['url'], param);
        }
        return {
            url: url
        };
    }
}
