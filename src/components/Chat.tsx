import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './Chat.module.scss';
import type { IContainerProps } from './TypeDefinitions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import sendImg from "../assets/send.svg";

interface IChatProps extends IContainerProps {
    //
}
interface chatItem {
    isBot: boolean;
    message: string;
}

const Chat = (props: IChatProps): React.ReactElement => {

    const [inputValue, setInputValue] = useState("");
    const configPretty = JSON.stringify(props.gptProps, null, '\t');
    const [chatArray, setChatArray] = useState<chatItem[]>([
        {
            isBot: true,
            message: "Hi, I'm MyGPT, the AI powered chatbot. How can I help you?"
        },
        {
            isBot: true,
            message: `Config: ${configPretty}`
        }
    ]);

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    }

    const handleSendButton = () => {
        // add input text to chat
        setChatArray([...chatArray, {
            isBot: false,
            message: inputValue
        }]);
        setInputValue("");
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') { handleSendButton(); }
    }
    const changeScope = ():void => {
        alert("Change scope");
    }

    return (
        <section className={styles.chat}>
            <div className={styles.scopeAndChatContainer}>
                <div className={styles.scopeContainer}>
                    <CheckCircleOutlineIcon/>
                    <div className={styles.title}>Scope:</div>
                    <div className={styles.scope}>{props.gptProps.scope}</div>
                    <div className={styles.change} onClick={changeScope}>Change</div>
                </div>
                <div className={styles.chatContainer} >
                    {chatArray.map((chatItem, index) => {
                        return (
                            <div className={chatItem.isBot ? styles.botTextContainer : styles.userTextContainer} key={index}>
                                <div className={`${styles.text} ${chatItem.isBot ? styles.bot : styles.user}`}>
                                    {chatItem.message}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className={styles.inputContainer}>
                <input value={(inputValue)} onChange={handleChangeInput} onKeyDown={handleKeyDown} className={styles.userInput} type="text"></input>
                <button onClick={handleSendButton} className={styles.sendButton}>
                    <img src={props.chatBotProps.hostDomain + sendImg} height="20px" style={{ opacity: '0.4' }} alt="send" />
                </button>
            </div>

        </section>
    );
}

export default Chat;
