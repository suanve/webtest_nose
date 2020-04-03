import React from 'react';

import { Table, Popconfirm, message } from 'antd';

import { _getContainer, _stopContainer } from "../../core/server"


class Container_Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '编号',
                    dataIndex: 'Key',
                    key: 'Key',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '名称',
                    dataIndex: 'Name',
                    key: 'Name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '用户',
                    dataIndex: 'Username',
                    key: 'Username',
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
                            {/* <a style={{ marginRight: 16 }}>分享</a> */}
                            <Popconfirm
                                title="该操作不可恢复,请确定是否删除?"
                                onConfirm={this.stopContainer.bind(this, { Id: record.key, Username: record.Username })}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">关闭</a>
                            </Popconfirm>
                        </span>
                    ),
                }
            ],
            data: [

            ]
        };
    }



    async getContainer() {
        const res = await _getContainer()
        console.log(res)
        if (res.status === 200) {
            var tmpdata = {}
            tmpdata = res.data.data
            for (var i = 0; i < res.data.length; i++) {
                console.log(tmpdata[i])
                tmpdata[i]['key'] = tmpdata[i]['Key']
            }
            console.log(tmpdata)
            this.setState({
                data: tmpdata
            })
        }
    }

    async stopContainer(item) {
        const res = await _stopContainer(item)
        console.log(res)
        if (res.status === 200) {
            if (res.data.code === 200) {
                
                if (res.data.code == 200) {
                    message.success("关闭成功")
                } else if (res.data.code == 999) {
                    message.warning("没有该任务")
                } else {
                    message.error("关闭失败")
                }
                this.getContainer()
            } else {
                message.error("关闭失败")
            }

        }else if(res.status === -1){
            message.error("token错误")
        }
    }

    componentDidMount() {
        this.getContainer()
    }



    render() {
        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default Container_Manage;