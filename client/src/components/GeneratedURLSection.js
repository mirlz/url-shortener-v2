import React from 'react';
import { observer } from 'mobx-react-lite';
import HomePageStore from '../stores/HomePageStore';
import { Button, Col, Row } from 'antd';
import { ExportOutlined, CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GeneratedURLSection = observer((props) => {
    return (
        <Row justify="center" className={(HomePageStore.ob.renderGeneratedURLSection) ? '': 'hide'}>
            <Col xs={24} md={18} xxl={10}>
                <Row>
                    <h3 className="align-left">Generated URL:</h3>
                </Row>
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={16} xl={16}>
                        <Button
                            icon={<ExportOutlined />}
                            href={HomePageStore.ob.generatedUrl}
                            size="large"
                            className="redirect-btn"
                        >
                            {HomePageStore.ob.generatedUrl}
                        </Button>
                    </Col>
                    <Col xs={24} sm={8} xl={8}>
                        <CopyToClipboard
                            text={HomePageStore.ob.generatedUrl}
                        >
                            <Button
                                className="copy-btn"
                                type="primary"
                                size="large"
                                icon={<CopyOutlined />}
                            >
                                Copy To Clipboard
                            </Button>
                        </CopyToClipboard>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
});

export default GeneratedURLSection;