import React from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = observer(() => {
    return (
        <Footer className="fill-section" style={{ textAlign: 'center' }}>
            <a href="https://github.com/mirlz">@mirlz</a>
        </Footer>
    );
});

export default FooterComponent;