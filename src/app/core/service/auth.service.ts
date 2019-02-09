import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {}

    /**
     * 设置用户id
     * @param id 用户id
     */
    setUserId(id: string) {
        window.localStorage.setItem('_USER_ID_', id);
    }

    /**
     * 获取用户id
     */
    getUserId() {
        return  window.localStorage.getItem('_USER_ID_');
    }
}
