import React from 'react';
import { observer } from 'mobx-react-lite';
import HeaderComponent from '../components/common/Header';
import FooterComponent from '../components/common/Footer';
import LoginComponent from '../components/login/Login';
import { Form, Layout } from 'antd';
import '../assets/css/layout.css';

const { Content } = Layout;

const LoginPage = observer(() => {
    const [form] = Form.useForm();

    return (
        <Layout className="layout">
            <HeaderComponent />
            <Content className="fill-section" style={{ padding: '0 50px' }}>
                <LoginComponent form={form} />
            </Content >
            <FooterComponent />
        </Layout >
    );
});

export default LoginPage;