import React from 'react';
import { Form, Input, Button, message ,Select} from 'antd';
import { Row, Col } from 'antd';
import { _getData2, _editData } from "../server"

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

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    async editData(values) {
        const res = await _editData(values)
        if (res.data.code === 200) {
            message.success('修改成功');
        } else {
            message.error('修改失败');
        }
    }

    async getData(values) {
        const res = await _getData2(values)
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
            id:this.props.location.state
        })
        
    }
    formRef = React.createRef();

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            id : this.state.id.fromKey,
            name: this.state.data.name,
            target: this.state.data.target,
            description  : this.state.data.description
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
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>





                            <Form.Item
                                name="target"
                                label="目标"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                name="description"
                                label="备注"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>


                            <Form.Item
                                name="id"
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


export default Edit;