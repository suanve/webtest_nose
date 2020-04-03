import React from 'react';

import { Table, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

import { _getUsers, _delUser, _addUser } from "../../core/server"


class Mange_Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Id',
                    dataIndex: 'Id',
                    key: 'Id',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '用户',
                    dataIndex: 'Username',
                    key: 'Username',
                },
                {
                    title: '等级',
                    dataIndex: 'Level',
                    key: 'Level',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            {/* <a style={{ marginRight: 16 }}>分享</a> */}
                            <Link to={{ pathname: '/Users_Edit', state: { Id: record.key } }}><span style={{ marginRight: 16 }}>编辑</span></Link>
                            <Popconfirm
                                title="该操作不可恢复,请确定是否删除?"
                                onConfirm={this.delUser.bind(this, { Id: record.key })}
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
    async getUsers() {
        const res = await _getUsers()
        console.log(res)
        if (res.status === 200) {
            var tmpdata = {}
            tmpdata = res.data.data
            for (var i = 0; i < res.data.length; i++) {
                console.log(tmpdata[i])
                tmpdata[i]['key'] = tmpdata[i]['Id']
            }
            console.log(tmpdata)
            this.setState({
                data: tmpdata
            })
        }
    }

    async delUser(item) {
        const res = await _delUser(item)
        console.log(res)
        if (res.status === 200) {
            if (res.data.code === 200) {
                message.success("删除成功")
                this.getUsers()
            } else {
                message.error("删除失败")
            }

        } else if (res.status === -1) {
            message.error("token错误")
        }
    }

    componentDidMount() {
        this.getUsers()
    }
    render() {
        return (
            <div>
                <Link to={{ pathname: '/Users_Add' }}><Button type="primary" style={{ marginBottom: "20px" }}>新建用户</Button></Link>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default Mange_Users;