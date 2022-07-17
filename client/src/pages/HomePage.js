import React from 'react';
import {observer} from 'mobx-react-lite';
import SubmitUrlShortenerForm from '../components/urlShortener/SubmitUrlShortenerForm';
import GeneratedURLSection from '../components/urlShortener/GeneratedURLSection';
import HeaderComponent from '../components/common/Header';
import FooterComponent from '../components/common/Footer';
import { Layout, Form } from 'antd';
import '../assets/css/layout.css';

const { Content } = Layout;

const Homepage = observer(() => { 
  const [form] = Form.useForm();

  return (
    <Layout className="layout">
      <HeaderComponent />
      <Content className="fill-section" style={{ padding: '0 50px' }}>
        <SubmitUrlShortenerForm form={form} />
        <GeneratedURLSection />
      </Content>
      <FooterComponent />
    </Layout>
  );
});

export default Homepage;