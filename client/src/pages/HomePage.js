import React from 'react';
import {observer} from 'mobx-react-lite';
import { reaction } from "mobx";
import HomePageStore from '../stores/HomePageStore';
import SubmitUrlShortenerForm from '../components/SubmitUrlShortenerForm';
import GeneratedURLSection from '../components/GeneratedURLSection';
import { Layout, Form, Col, Row, message } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import '../assets/css/layout.css';

const { Header, Content, Footer } = Layout;
message.config({
  maxCount: 1,
});

const Homepage = observer((props) => { 
  const [form] = Form.useForm();

  reaction(
    () => {
      return {
        message: HomePageStore.ob.message,
        success: HomePageStore.ob.messageSuccessStatus
      }
    },
    (data) => {
      message.open({
        content: data.message,
        icon: data.success ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
      })
  });

  return (
    <Layout className="layout">
      <Header className="fill-section">
        <Row justify="center">
          <Col xs={24} md={18} xxl={10}>
            <h3 className="text-white">URL Shortener</h3>
          </Col>
        </Row>
      </Header>
      <Content className="fill-section" style={{ padding: '0 50px' }}>
        <SubmitUrlShortenerForm form={form} />
        <GeneratedURLSection />
      </Content>
      <Footer className="fill-section" style={{ textAlign: 'center' }}><a href="https://github.com/mirlz">@mirlz</a></Footer>
    </Layout>
  );
});

export default Homepage;