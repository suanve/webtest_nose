
import { message } from 'antd';

import { _login } from '../server';

import {getCookie,setCookie} from "./Cookie"

export default class Passport {
    constructor() {
        // 用户登录标识
        this.isLogin = localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") : false;
        this.isAdmin = localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin") : false;
    }
    quit = () => {
        this.isLogin = false;
        this.isAdmin = false;
        localStorage.clear()
        message.success('退出成功');
    }

    setAdmin = () =>{
        this.isAdmin = localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin") : false;
    }

    async loginControl(data,callback) {
        const res = await _login(data)
        if (res.data.code === 200) {
            var msg  = "登录成功"
            if (res.data.isAdmin === 1){
                this.isAdmin = true;
                localStorage.setItem("isAdmin", "True")
                msg = "管理员登录成功"
            }
            message.success(msg);
            this.isLogin = true;
            localStorage.setItem("isLogin", "True")
            localStorage.setItem("token", res.data.token)
            // setCookie("token",res.data.token)
            // 将登录成功之后的操作给调用者处理
            callback()
        } else {
            message.error('登录失败');
            this.isLogin = false;
            localStorage.clear()
        }

    }
    login(username, password, callback) {
        if (this.loginControl({ "username": username, "password": password },callback)) {
            
        }

    }
}