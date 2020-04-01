import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { Row, Col } from 'antd';

import { _addChallenge } from "../../server"

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

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




class Challenge_Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async addData(values) {
        const res = await _addChallenge(values)
        console.log(res)
        if (res.data.code === 200) {
            message.success('提交成功');
        } else {
            message.error('提交失败');
        }
    }

    onFinish = (values) => {
        this.addData(values)
    };

    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>
                        <span>添加新的实验</span>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} >
                            <Form.Item name={['form', 'Name']} label="名称" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['form', 'Image']} label="镜像" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['form', 'Img']} label="图片" >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['form', 'Description']} label="备注">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name={['form', 'Type']} label="类别">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    提交
                    </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}>col-8</Col>
                </Row>


            </div>
        );
    }
}

export default Challenge_Add;