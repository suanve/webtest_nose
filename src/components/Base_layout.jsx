import React from 'react';


import 'antd/dist/antd.css';
import '../static/css/index.css';

import { Layout, Menu, Breadcrumb } from 'antd';

import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from "react-router-dom";



import About from "../container/About";
import Challenge from "../container/Challenge";
import Add from "../container/Add";
import Edit from "../container/Edit";
import Login from "../container/Login";


import Challenge_Mange from "../container/Manage/Challenge_Manage"
import Challenge_Add from "../container/Manage/Challenge_Add"
import Challenge_Edit from "../container/Manage/Challenge_Edit"

import Container_Manage from "../container/Manage/Container_Manage"

import Users_Manage from "../container/Manage/Users_Manage"
import Users_Add from "../container/Manage/Users_Add"
import Users_Edit from "../container/Manage/Users_Edit"


import Passport from '../core/Passport';
let passport = new Passport();

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Menubar = withRouter(({ history }) => {
    // console.log(history.location.pathname)
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['1']}
            defaultSelectedKeys={['Home']}
            selectedKeys={[history.location.pathname]}

            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="/Challenge"><Link to="/Challenge">实验</Link></Menu.Item>
            <Menu.Item key="/Topics"><Link to="/Topics">知识库</Link></Menu.Item>
            <Menu.Item key="/About"><Link to="/About">关于</Link></Menu.Item>

            {passport.isAdmin ?

                <SubMenu title="管理">
                    <Menu.Item key="/Challenge_Mange"><Link to="/Mange_Challenge">实验管理</Link></Menu.Item>
                    <Menu.Item key="/Container_Manage"><Link to="/Mange_Container">容器管理</Link></Menu.Item>
                    <Menu.Item key="/Users_Manage"><Link to="/Mange_Users">用户管理</Link></Menu.Item>
                </SubMenu>
                : ""}
            {!passport.isLogin ? <Menu.Item key="/Login"><Link to="/Login">登录</Link></Menu.Item> : <Menu.Item onClick={passport.quit} key="/Quit"><Link to="/Login">退出</Link></Menu.Item>}

        </Menu>
    );
})

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        return (
            <Layout>
                <Router>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        <Menubar />
                    </Header>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>

                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 700, minWidth: '100%', float: 'left' }}>

                            {/* <Route path="/challenge" component={Challenge} /> */}
                            {/* <Route path="/login" component={Login} /> */}


                            <Route exact path="/" render={(props) => {

                                if (passport.isLogin) {
                                    return <Challenge {...props} />
                                } else {
                                    return <Redirect to="/Login" />
                                }
                            }} />



                            <Route exact path="/Challenge" render={(props) => {

                                if (passport.isLogin) {
                                    return <Challenge {...props} />
                                } else {
                                    return <Redirect to="/Login" />
                                }
                            }} />
                            <Route path="/Login" render={(props) => {
                                return <Login {...props} passport={passport} />
                            }} />

                            {/* 前台功能 */}
                            <Route path="/About" component={About} />
                            <Route path="/Add" component={Add} />
                            <Route path="/Adit" component={Edit} />

                            {/* 后台功能 */}
                            <Route path="/Mange_Challenge" component={Challenge_Mange} />
                            <Route path="/Challenge_Add" component={Challenge_Add} />
                            <Route path="/Challenge_Edit" component={Challenge_Edit} />

                            <Route path="/Mange_Container" component={Container_Manage} />

                            <Route path="/Mange_Users" component={Users_Manage} />
                            <Route path="/Users_Add" component={Users_Add} />
                            <Route path="/Users_Edit" component={Users_Edit} />


                        </div>
                    </Content>
                </Router>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>



        );
    }
}

export default Test;