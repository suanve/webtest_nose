import React from "react";
import { Form, Input, Button, message, Select, InputNumber } from "antd";
import { Row, Col } from "antd";
import {_editPassword } from "../core/server";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "请输入内容",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
  number: {
    range: "1",
  },
};


const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Users_ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  async editUser(values) {
    const res = await _editPassword(values);
    if (res.data.code === 200) {
      message.success("修改成功");
    } else {
      message.error("修改失败");
    }
  }

  onFinish = (values) => {
    this.editUser(values);
  };

  componentDidMount() {
    // 生命周期 开始
    // this.setState({
    //     id: this.props.location.state
    // })
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
          <Col span={8}></Col>
          <Col span={8}>
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="old_Password"
                label="旧密码"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="new_Password"
                label="新密码"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="check_Password"
                label="确认密码"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button htmlType="button" onClick={this.onReset}>
                  清除
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

export default Users_ChangePassword;
