import { Injectable } from '@angular/core';
import { forEach, indexOf } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    // 序列化url
    serializeUrl(url: string, param: object): string {
        let paramStr = '';
        forEach(param, (val, key) => {
            paramStr += `&${key}=${val}`;
        });

        // 解决url上自带参数的问题
        if (indexOf(url, '?') === -1) {
            paramStr = `?${paramStr.slice(1)}`;
        }
        return `${url}${paramStr}`;
    }
}
