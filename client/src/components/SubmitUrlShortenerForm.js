import React from 'react';
import {observer} from 'mobx-react-lite';
import HomePageStore from '../stores/HomePageStore';
import { Button, Form, Input, Col, Row } from 'antd';
import '../assets/css/layout.css';

const SubmitUrlShortenerForm = observer((props) => {
    const form = props.form;

    const handleSubmit = (values) => {
        const { url } = values;
    
        HomePageStore.setSubmitButtonDisable();
        HomePageStore.setOriginalUrl(url);
        form.resetFields();
    };
    
    return ( 
        <Row justify="center">
            <Col xs={24} md={18} xxl={10}>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Row>
                        <h3 className="align-left">Shorten URL:</h3>
                    </Row>
                    <Row gutter={[16, 0]}>
                    <Col xs={24} sm={16} xl={16}>
                        <Form.Item
                        name="url"
                        rules={[
                            { required: true }, 
                            { type: 'url' }
                        ]}
                        >
                        <Input placeholder="http://example.com" size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8} xl={8}>
                        <Button 
                            disabled={HomePageStore.ob.disableSubmit} 
                            className="shorten-btn" 
                            type="primary" 
                            htmlType="submit" 
                            size="large"
                        >
                            Submit
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
});

export default SubmitUrlShortenerForm;