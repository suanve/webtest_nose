import axios from 'axios';
import qs from 'qs';

var baseAPI = "http://192.168.104.233:8080"

let http = {
    post: "",
    get: "",
    delete: "",
    put: "",
    update: ""
}

http.post = function (api, data) {
    let params = qs.parse(data)
    return new Promise((resolve, reject) => {
        // var client = axios.defaults.headers.common['token'] = localStorage.getItem("token")?localStorage.getItem("token"):"";
        axios.post(baseAPI + api, data, { headers: { "token": localStorage.getItem("token") ? localStorage.getItem("token") : "" } }
        ).then((res) => {
            resolve(res)
        })
    })
}

http.get = function (api, data) {
    let params = qs.stringify(data)
    return new Promise((resolve, reject) => {
        // var client = axios.defaults.headers.common['token'] = localStorage.getItem("token")?localStorage.getItem("token"):"";
        axios.get(baseAPI + api,
            {
                params: data,
                headers: { "token": localStorage.getItem("token") ? localStorage.getItem("token") : "" }
            }).then((res) => {
                resolve(res)
            })
    })
}




export default http

// 登录
export function _login(data) {
    return http.post("/api/login", data)
}


// 获取实验数据
export function _getChallenge() {
    return http.get("/api/challenge/get")
}

// 启动实验
export function _startChallenge(data) {
    return http.post("/api/challenge/start", data)
}
// 获取所有开启的实验
export function _getChallengeStatus(data) {
    return http.post("/api/challenge/getStatus", data)
}
// 停止指定的实验
export function _stopChallenge(data) {
    return http.post("/api/challenge/stop", data)
}

// 添加实验
export function _addChallenge(data) {
    return http.post("/api/challenge/add", data)
}

// 获取指定的实验信息
export function _getChallenge2(data) {
    return http.post("/api/challenge/get", data)
}

// 修改指定实验信息
export function _editChallenge(data) {
    return http.post("/api/challenge/edit", data)
}

// 删除指定实验信息
export function _delChallenge(data) {
    return http.post("/api/challenge/del", data)
}

// 获取所有容器
export function _getContainer() {
    return http.get("/api/container/get")
}

// 关闭指定容器
export function _stopContainer(data) {
    return http.post("/api/container/stop", data)
}

// 获取所有用户
export function _getUsers() {
    return http.get("/api/user/get")
}
// 添加用户
export function _addUser(data) {
    return http.post("/api/user/add", data)
}
// 删除用户
export function _delUser(data) {
    return http.post("/api/user/del", data)
}

// 获取指定用户信息
export function _getUser2(data) {
    return http.post("/api/user/get", data)
}

// 修改指定用户信息
export function _editUser(data) {
    return http.post("/api/user/edit", data)
}
export function _addData(data) {
    return http.post("/api/access/addData", data)
}

export function _getData2(data) {
    return http.post("/api/access/addData", data)
}


export function _editData(data) {
    return http.post("/api/access/editData", data)
}