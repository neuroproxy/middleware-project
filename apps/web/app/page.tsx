'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';

export default function Page() {
  const {sendMessage, messages} = useSocket();
  const [message, setMessage] = useState('')
  return (
    <div>
      <div>
          <h1>Chat</h1>
      </div>
      <div>
        <input
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          className={classes["chat-input"]} 
          placeholder="Mensaje..." 
        />
        <button 
          onClick={(e) => sendMessage(message)} 
          className={classes["button"]}>
            Enviar 
          </button>
      </div>
      <div className={classes["messages-container"]}>
        {messages.map( (msg, index) => (
          <div
          key={index}
          className={`${classes["message"]} ${msg.sender === 'user1' ? classes["right"] : classes["left"]}`}>
          {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
} 