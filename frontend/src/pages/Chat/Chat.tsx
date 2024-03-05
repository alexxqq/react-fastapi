import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Nav } from '../../components/Nav/Nav'
import './chat.scss'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
import chatService from '../../services/chat.service'
import { websocket } from '../../services/chat.service'
interface Message {
    message: string
}

export const Chat = () => {
    const shouldRender: any = useRenderVerification()
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState<string>()
    const [ws, setWs] = useState<WebSocket | null>(null)
    const chatContainerRef = useRef<HTMLUListElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (message && ws) {
            ws.send(message)
        }
        setMessage('')
    }

    useEffect(() => {
        if (shouldRender) {
            const wsInstance = new WebSocket(`${websocket}/${shouldRender?.email}`)
            setWs(wsInstance)
        }
        fnccc()
    }, [shouldRender])
    useLayoutEffect(() => {
        scrollToBottom();
      }, [messages]);
    const fnccc = () => {
        const fetchData = async () => {
            try {
                const response:any = await chatService.getLastMessages()
                const data = await response
                setMessages(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()




    }
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      };
      const handleMessageReceived = (event: any) => {
        const newMessage = { message: event.data }
        setMessages((prevMessages) => [...prevMessages, newMessage])
    }
      if (ws) {
        ws.onmessage = handleMessageReceived
    }
    
    if (shouldRender === null) {
        return <Loading />
    }
    if (!shouldRender) {
        window.location.href = 'error404'
        return null
    }
    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            <div className='chat'>
                <ul id='messages' className='mt-4' ref={chatContainerRef}>
                    {messages.map((message) => (
                        <li key={message.message}>{message.message}</li>
                    ))}
                </ul>
                <h1>Chat</h1>
                <h2>Your ID: {shouldRender?.email}</h2>
                <form onSubmit={handleMessage}>
                    <input
                        type='text'
                        id='messageText'
                        autoComplete='off'
                        placeholder='Type your message...'
                        value={message}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}
