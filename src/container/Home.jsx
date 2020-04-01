import React from 'react';

import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { _getChallenge } from "../server"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '目标',
                    dataIndex: 'target',
                    key: 'target',
                },
                {
                    title: '备注',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
                    title: '修改时间',
                    dataIndex: 'endtime',
                    key: 'endtime',
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

    async getDataList() {
        const res = await _getChallenge()

        console.log(res)
        if (res.status === 200) {
            this.setState({
                data: res.data.data
            })
        }
    }
    componentDidMount() {
        // axios.get('http://127.0.0.1:2999/api/access/getdata')
        //     .then((res) => {
        //         this.setState({
        //             data: res.data.data
        //         })
        //         console.log(res)
        //     })
        this.getDataList()
        console.log(1)
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

export default Home;