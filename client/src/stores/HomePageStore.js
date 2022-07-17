import { observable, action } from "mobx";
import axios from 'axios';

import MessageStore from "./MessageStore";

const ob = observable({
    origUrl: '',
    generatedUrl: '',
    disableSubmit: false,
    message: '',
    messageSuccessStatus: false,
    renderGeneratedURLSection: false,
});

const setSubmitButtonDisable = action(() => {
    ob.disableSubmit = !ob.disableSubmit;
});

const setOriginalUrl = action(( val ) => {
    ob.origUrl = val;
    postGenerateShortId();
});

const setGeneratedUrl = action((val) => {
    ob.generatedUrl = val;
});

const setRenderGeneratedURLSectionVisible = action((val) => {
    ob.renderGeneratedURLSection = val;
});

const postGenerateShortId = action(() => {
    axios.post(process.env.REACT_APP_SERVER + '/shortenUrl', { longURL: ob.origUrl })
        .then(res => {
            setGeneratedUrl(res.data);
            MessageStore.setMessage('ShortUrl successfully generated!');
            MessageStore.messageSuccessStatus(true);
            setRenderGeneratedURLSectionVisible(true);
            HomePageStore.setSubmitButtonDisable();

        }).catch(e => {
            let err = e.message;
            console.log(e);
            if(e.response.data) {
                err = e.response.data;
            } 
            MessageStore.setMessage(err);
            MessageStore.messageSuccessStatus(false);
            setRenderGeneratedURLSectionVisible(false);
            HomePageStore.setSubmitButtonDisable();
        });
});

const HomePageStore = { 
    ob, 
    setOriginalUrl,
    postGenerateShortId,
    setSubmitButtonDisable,
};

export default HomePageStore;