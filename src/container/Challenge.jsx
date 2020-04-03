import React from 'react';
import { Card, Tabs, Modal, Button, message, notification, Row, Col } from 'antd';

import { BrowserRouter as Redirect } from "react-router-dom";

import { _getChallenge } from "../core/server"
import { _startChallenge } from "../core/server"
import { _getChallengeStatus } from "../core/server"
import { _stopChallenge } from "../core/server"


const { TabPane } = Tabs;
const { Meta } = Card;


const openNotificationWithIcon = type => {
    notification[type]({
        message: '温馨提示：',
        description:
            '如意外刷新页面导致丢失实验地址，可以点击题目名称获取已经开启的实验地址。',
    });
};

class Challenge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Challenges: [
                // {
                //     'id':1,
                //     'CardImg': "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                //     "MetaTitle": "SQL注入",
                //     "Metadescription": "基础的sql注入攻击",
                // }
            ],
            //这里是对话框属性
            ModalText: '实验仅开放30分钟,请留意操作时间,超时后可以重新开启.',
            visible: false,
            confirmLoading: false,
        };
    }

    //这里是网络处理
    async getChallenge() {
        const res = await _getChallenge()
        // console.log(res)
        // console.log(res)
        if (res.status === 200) {
            this.setState({
                Challenges: res.data.data
            })
        }
        if (res.data.status == -1) {
            message.warning("未登录")
            this.setState({
                Challenges: []
            })
        }
    }


    async startChallenge(item) {
        // setTimeout(() => {
        //     this.setState({
        //         visible: false,
        //         confirmLoading: false,
        //     });
        // }, 3000);

        const res = await _startChallenge({ "Id": item })
        if (res.status === 200) {
            if (res.data.code == 200) {
                message.success('创建成功');
                this.ChallengeStatusChange()
            } else if (res.data.code == 999) {
                message.error('已开启过该实验,请刷新');
            }
            else {
                message.error('创建失败');
            }
            this.setState({
                confirmLoading: false,
                visible: false,
            });
        }
    }

    componentDidMount() {
        this.getChallenge()
        openNotificationWithIcon('info')
    }

    callback(key) {
        // console.log(key);
    }

    //获取实验状态
    async getChallengeStatus() {
        function getIndex(list,key,value){
            for(var i=0;i<list.length;i++){
                if (list[i][key] == value){
                    return i
                }
            }
        }
        const res = await _getChallengeStatus()
        if (res.status === 200) {
            if (res.data.length != 0) {
                this.setState({
                    Challenges:res.data.data
                })
                // for (var i = 0; i < res.data.data.length; i++) {

                //     var tmpChallenges = this.state.Challenges
                //     console.log(res.data.data)
                //     console.log(tmpChallenges)

                //     tmpChallenges[res.data.data[i]['Id']]['Description'] = res.data.data[i]['Url']

                //     this.setState({
                //         Challenges: tmpChallenges
                //     })
                // }
            }
        }
    }

    //调用获取实验状态
    ChallengeStatusChange = () => {
        this.getChallengeStatus()
        // this.state.Challenges[item-1]['Description']="http://127.0.0.1:23123"
    }

    //停止指定的实验
    async stopChallenge(item) {
        const res = await _stopChallenge({ "Id": item })
        if (res.status === 200) {
            if (res.data.code == 200) {
                message.success("停止成功")
            } else if (res.data.code == 999) {
                message.warning("没有该任务")
            } else {
                message.error("停止失败")
            }
            this.ChallengeStatusChange()
        }
    }

    //这里是对话框对相关处理方法
    showModal(itemId) {
        this.setState({
            visible: true,
            ModalText: '实验仅开放30分钟,请留意操作时间,超时后可以重新开启.',
            tmp_itemId: itemId
        });
    };


    handleOk = () => {
        this.setState({
            ModalText: '正在初始化实验信息',
            confirmLoading: true,
        });
        this.startChallenge(this.state.tmp_itemId)

    };

    handleCancel = () => {

        this.setState({
            visible: false,
        });
    };

    stop(itemId) {
        message.info("开始停止实验,请等待")
        this.stopChallenge(itemId)
    };

    dataRander = (item) => {
        return (
            <div key={item.Id} style={{ 'float': 'left', 'marginLeft': 60, 'marginBottom': 30 }}>

                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt=""
                            src={item.Img}
                        />
                    }
                    actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                        <Button type="primary" onClick={this.showModal.bind(this, item.Id)}>开始</Button>,
                        <Button danger onClick={this.stop.bind(this, item.Id)}>停止</Button>,
                    ]}
                >
                    <center>
                        <Meta
                            title={<a style={{ color: 'black' }} onClick={this.ChallengeStatusChange} >题目:{item.Name}</a>}
                            description={<div>地址: <a href={item.Description} target="_Blank">{item.Description}</a></div>}
                        />
                    </center>
                </Card>
            </div>

        )
    }
    check = () => {
        if (this.status.Challenges.length === 0) {
            message.warning("未登录")
            return <Redirect to="/Login" />
        }
    }
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <div style={{ 'float': 'left' }}>
                    {/* 这里是点击按钮以后弹出对话框的信息 */}
                    <Modal
                        title="提示"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <p>{ModalText}</p>

                    </Modal>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="初级" key="1">
                            {this.state.Challenges === undefined ? this.state.Challenges = [] : ""}
                            {// 这里会循环把数据拿出

                                this.state.Challenges.map((item) => {
                                    if (item.Type === 1) {
                                        return this.dataRander(item)
                                    }
                                })
                            }
                        </TabPane>
                        <TabPane tab="中级" key="2">
                            {// 这里会循环把数据拿出
                                this.state.Challenges.map((item) => {
                                    if (item.Type === 2) {
                                        return this.dataRander(item)
                                    }
                                })
                            }
                        </TabPane>
                        <TabPane tab="高级" key="3">
                            {// 这里会循环把数据拿出
                                this.state.Challenges.map((item) => {
                                    if (item.Type === 3) {
                                        return this.dataRander(item)
                                    }
                                })
                            }
                        </TabPane>
                        <TabPane tab="其他" key="4">
                            {// 这里会循环把数据拿出
                                this.state.Challenges.map((item) => {
                                    if (item.Type === 4) {
                                        return this.dataRander(item)
                                    }
                                })
                            }
                        </TabPane>
                    </Tabs>


                </div>


            </div>
        );
    }
}

export default Challenge;