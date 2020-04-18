import React from 'react';
import { Form, Input, Button, message, Select, InputNumber } from 'antd';
import { Row, Col } from 'antd';
import { _getUser2, _editUser } from "../../core/server"

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
        range: '1',
    },
};


const { Option } = Select;


const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class Users_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    async editUser(values) {
        const res = await _editUser(values)
        if (res.data.code === 200) {
            message.success('修改成功');
        } else {
            message.error('修改失败');
        }
    }

    async getData(values) {
        const res = await _getUser2(values)
        console.log(res)
        this.setState({
            data: res.data.data[0]
        })

        if (res.data.code === 200) {
            message.success('获取成功');
            this.onFill()
        } else {
            message.error('获取失败');
        }
    }

    onFinish = (values) => {
        this.editUser(values)
    };


    componentDidMount() {
        this.getData(this.props.location.state)
        this.setState({
            id: this.props.location.state
        })

    }
    formRef = React.createRef();

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            Id: this.state.id.Id,
            Username: this.state.data.Username,
            Password: this.state.data.Password,
            Level: this.state.data.Level,
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        {/* <Button onClick={this.test}>测试</Button> */}
                    </Col>

                    <Col span={8}>
                        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>


                            <Form.Item
                                name="Username"
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="Password"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>


 

                            <Form.Item name={'Level'} label="等级" rules={[{ required: true }]}>
                                <Select style={{ width: 120 }}>
                                    <Option value={0}>普通用户</Option>
                                    <Option value={1}>管理员</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="Id"
                            >

                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Button htmlType="button" onClick={this.onReset}>
                                    清除
                                </Button>
                                <Button type="link" htmlType="button" onClick={this.onFill}>
                                    获取
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


export default Users_Edit;