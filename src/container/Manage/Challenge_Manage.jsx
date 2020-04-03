import React from 'react';

import { Table, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

import { _getChallenge, _delChallenge } from "../../core/server"


class Challenge_Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '编号',
                    dataIndex: 'Id',
                    key: 'Id',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '名称',
                    dataIndex: 'Name',
                    key: 'Name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '备注',
                    dataIndex: 'Description',
                    key: 'Description',
                },
                {
                    title: '镜像',
                    dataIndex: 'Image',
                    key: 'Image',
                },
                {
                    title: '类别',
                    dataIndex: 'Type',
                    key: 'Type',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Link to={{ pathname: '/Challenge_Edit', state: { Id: record.key } }}><span style={{ marginRight: 16 }}>编辑</span></Link>
                            {/* <a style={{ marginRight: 16 }}>分享</a> */}
                            <Popconfirm
                                title="该操作不可恢复,请确定是否关闭?"
                                onConfirm={this.delChallenge.bind(this,{ Id: record.key })}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </span>
                    ),
                }
            ],
            data: [

            ]
        };
    }

    async getChallenge() {
        const res = await _getChallenge()
        console.log(res)
        if (res.status === 200) {
            var tmpdata = {}
            tmpdata = res.data.data
            for (var i = 0; i < res.data.length; i++) {
                console.log(tmpdata[i])
                tmpdata[i]['key'] = tmpdata[i]['Key']
            }
            this.setState({
                data: tmpdata
            })
        }else if(res.status === -1){
            message.error("token错误")
        }
    }

    async delChallenge(item) {
        const res = await _delChallenge(item)
        console.log(res)
        if (res.status === 200) {
            if (res.data.code === 200) {
                message.success("删除成功")
                this.getChallenge()
            } else {
                message.error("删除失败")
            }

        }else if(res.status === -1){
            message.error("token错误")
        }
    }


    componentDidMount() {
        this.getChallenge()
    }



    render() {
        return (
            <div>
                {/* <Link to={{ pathname: '/Edit', state: { fromKey: 1 } }}><Button type="primary" style={{ marginBottom: "20px" }}>修改</Button></Link> */}
                <Link to={{ pathname: '/Challenge_Add' }}><Button type="primary" style={{ marginBottom: "20px" }}>新建</Button></Link>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default Challenge_Manage;