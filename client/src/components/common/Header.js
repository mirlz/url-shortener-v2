import React from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row, Layout } from 'antd';
import MessageComponent from './Message';
import MenuComponent from './Menu';

const { Header } = Layout;

const HeaderComponent = observer(() => {
  return (
    <Header className="fill-section">
      <MessageComponent />
      <Row justify="center">
        <Col xs={24} md={18} xxl={10}>
          <Row align="middle" justify="space-between">
            <Col>
              <a href="/"><h3 className="text-white">URL Shortener</h3></a>
            </Col>
            <Col style={{ minWidth: '180px'}}>
              <MenuComponent />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
});

export default HeaderComponent;