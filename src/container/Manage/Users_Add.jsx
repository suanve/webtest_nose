import React from 'react';
import { Form, Input, Select, Button, message, InputNumber } from 'antd';
import { Row, Col } from 'antd';

import { _addUser } from "../../core/server"

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const { Option } = Select;

const validateMessages = {
    required: '请输入内容',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
    number: {
        range: 'Must be between ${min} and ${max}',
    },
};




class User_Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async addUser(values) {
        console.log(values)
        const res = await _addUser(values.form)
        console.log(res)
        if (res.data.code === 200) {
            message.success('添加成功');
        } else {
            message.error('添加失败');
        }
    }

    onFinish = (values) => {
        this.addUser(values)
    };

    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}> </Col>
                    <Col span={8}>
                        <span>添加新的用户</span>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} >
                            <Form.Item name={['form', 'Username']} label="名称" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['form', 'Password']} label="密码" rules={[{ required: true }]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name={['form', 'Level']} label="等级" rules={[{ required: true }]}>
                                <Select style={{ width: 120 }}>
                                    <Option value={0}>普通用户</Option>
                                    <Option value={1}>管理员</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}> </Col>
                </Row>


            </div>
        );
    }
}

export default User_Add;