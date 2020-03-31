import React from 'react';

import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { _getChallenge } from "../../server"
import Test from '../../components/Base_layout';

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
                    title: '类别',
                    dataIndex: 'Type',
                    key: 'Type',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Link to={{ pathname: '/Edit', state: { fromKey: record.key } }}><span style={{ marginRight: 16 }}>编辑</span></Link>
                            <a style={{ marginRight: 16 }}>分享</a>
                            <a>删除</a>
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
            var tmpdata =  {}
            tmpdata = res.data.data
            for(var i=0;i< res.data.length;i++){
                console.log(tmpdata[i])
                tmpdata[i]['key'] = tmpdata[i]['Key']
            }
            this.setState({
                data: tmpdata
            })
        }
    }

    componentDidMount() {
        this.getChallenge()
    }
    render() {
        return (
            <div>
                {/* <Link to={{ pathname: '/Edit', state: { fromKey: 1 } }}><Button type="primary" style={{ marginBottom: "20px" }}>修改</Button></Link> */}
                <Link to={{ pathname: '/Add' }}><Button type="primary" style={{ marginBottom: "20px" }}>新建</Button></Link>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default Challenge_Manage;