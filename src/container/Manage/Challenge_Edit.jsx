import React from 'react';
import { Form, Input, Button, message, Select, InputNumber } from 'antd';
import { Row, Col } from 'antd';
import { _getChallenge2, _editChallenge } from "../../core/server"

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

class Challenge_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    async editData(values) {
        const res = await _editChallenge(values)
        if (res.data.code === 200) {
            message.success('修改成功');
        } else {
            message.error('修改失败');
        }
    }

    async getData(values) {
        const res = await _getChallenge2(values)
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
        this.editData(values)
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
            Name: this.state.data.Name,
            Img: this.state.data.Img,
            Image: this.state.data.Image,
            Description: this.state.data.Description,
            Type: this.state.data.Type,
            Inport: this.state.data.Inport
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Button onClick={this.test}>测试</Button>
                    </Col>

                    <Col span={8}>
                        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>


                            <Form.Item
                                name="Name"
                                label="名称"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="Image"
                                label="镜像"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="Img"
                                label="图片"
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                name="Description"
                                label="备注"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>


                            <Form.Item name={'Type'} label="类别" rules={[{ required: true }]}>
                                <Select style={{ width: 120 }}>
                                    <Option value={1}>初级</Option>
                                    <Option value={2}>中级</Option>
                                    <Option value={3}>高级</Option>
                                    <Option value={4}>其他</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name={'Inport'} label="内端口" >
                                <InputNumber min={1} max={65535} />
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
                    <Col span={8}>col-8</Col>
                </Row>


            </div>
        );
    }
}


export default Challenge_Edit;