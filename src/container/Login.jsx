import React from 'react';
import { Input, Tabs, Modal, Button, message, notification, Pagination, Row, Col } from 'antd';

import Passport from '../core/Passport';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    setUserInfo(event, key) {
        // input表单元素会自动绑定一个event对象对事件函数
        // event对象target属性等于input DOM元素对象，所以event.target.value 可以获取到当前input的value值
        let obj = {};
        obj[key] = event.target.value;
        // 更新状态
        this.setState(obj);
    }

    onKeyup = (e) => {
        if (e.keyCode === 13) {
            this.AutoLogin()
        }
    }
    AutoLogin = () => {
        let p = this.props.passport == null ? new Passport() : this.props.passport;
        p.login(this.state.username, this.state.password, () => {
            // 登录成功时，跳转页面
            this.props.history.push('/Challenge');
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>

                        <h3>用户登录</h3>
                        <div>
                            <span><Input style={{ marginTop: 20 }} addonBefore="账户" placeholder="input username" onInput={(event) => {
                                this.setUserInfo(event, 'username');
                            }} /></span>
                        </div>
                        <div>
                            <span><Input.Password style={{ marginTop: 20 }} addonBefore="密码" placeholder="input password" onKeyUp={this.onKeyup} onInput={(event) => {
                                this.setUserInfo(event, 'password');
                            }} /></span>
                        </div>
                        <div>
                            <Button style={{ marginTop: 20 }} type="primary" onClick={this.AutoLogin}>登录</Button>
                        </div>

                    </Col>
                    <Col span={8}></Col>
                </Row>

            </div>
        );
    }
}

export default Login;