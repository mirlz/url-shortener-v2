import { observable, action } from "mobx";

const ob = observable({
    message: '',
    messageSuccessStatus: false,
    renderGeneratedURLSection: false,
});

const setMessage = action(( val ) => {
    ob.message = val;
});

const setClearMessage = action(() => {
    ob.message = '';
});

const messageSuccessStatus = action((val) => {
    ob.messageSuccessStatus = val;
});

const MessageStore = { 
    ob, 
    setClearMessage,
    setMessage,
    messageSuccessStatus
};

export default MessageStore;