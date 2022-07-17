import React from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from "mobx";
import MessageStore from '../../stores/MessageStore';
import { message } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

message.config({
    maxCount: 1,
});

const MessageComponent = observer(() => {
    reaction(
        () => {
            return {
                message: MessageStore.ob.message,
                success: MessageStore.ob.messageSuccessStatus
            }
        },
        (data) => {
            message.open({
                content: data.message,
                icon: data.success ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
            })
        });
});

export default MessageComponent;