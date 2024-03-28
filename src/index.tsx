import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Container from './components/Container';
//import reportWebVitals from './reportWebVitals';
import { IChatBotProps, IConfig } from './components/TypeDefinitions'

const ChatBotReact = document.getElementsByTagName('my-gpt')[0] as HTMLElement;
const root = ReactDOM.createRoot(ChatBotReact);
const ChatBotProps: IChatBotProps = {
    hostDomain: "https://whizzy-chatbotreact.netlify.app"
}

const configDefault: IConfig = {
    "scope": "lookout",
    "chatMode": "documentsearch",
    "displayTabs": "no",
    "displayMode": "embedded",
    "siteUrl": ""
}

const fetchConfig = async (): Promise<IConfig> => {
    const url = ChatBotProps.hostDomain + '/config.json';
    try {
        const response = await fetch(url);
        if (response.ok) return await response.json() as IConfig;
        else {
            alert(`Error fetching ${url}: '${response.statusText}'`);
            return configDefault
        }
    }
    catch (error) {
        alert(`Error fetching ${url}: see console`);
        console.log(`Error fetching ${url}:`, error);

        return configDefault;
    }
}
fetchConfig().then((configJson) => {

    let siteUrl = ChatBotReact.getAttribute("siteUrl");
    if ((siteUrl === "") || (siteUrl === null)) siteUrl = configJson.siteUrl;
    let config = ChatBotReact.getAttribute("config");
    if ((config === "") || (config === null)) config = JSON.stringify(configJson);
    root.render(
        //<React.StrictMode>
        <Container siteUrl={siteUrl} config={config} chatBotProps={ChatBotProps} />
        //</React.StrictMode>
    );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
