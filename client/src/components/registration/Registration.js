import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Col, Row, Button } from 'antd';

const RegistrationComponent = observer((props) => {
    const form = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
        },
        wrapperCol: {
            xs: { span: 24 },
        },
        labelAlign: 'left'
    };

    const handleSubmit = () => {

    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Row justify="center">
            <Col xs={24} md={18} xxl={6}>
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    name="register"
                >
                    <Row gutter={[0, 16]}>
                        <Col xs={24}>
                            <h2 className="align-left">User Registration</h2>
                        </Col>
                        <Col xs={24}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24}>
                            <Row gutter={[18, 0]} style={{ textAlign: 'left' }}>
                                <Col >
                                    <Form.Item >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                        >
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item >

                                        <Button
                                            htmlType="button"
                                            onClick={onReset}
                                            size="large"
                                        >
                                            Reset
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row >
    )
});

export default RegistrationComponent;