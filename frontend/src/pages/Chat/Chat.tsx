import React, { useState, useEffect } from 'react'
import { Nav } from '../../components/Nav/Nav'
import './chat.scss'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
import chatService from '../../services/chat.service'
import { ChatEndpoint } from '../../common/constants/chat.endpoint' 

interface Message {
    message: string
}

export const Chat = () => {
    const shouldRender: any = useRenderVerification()
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState<string>()
    console.log(shouldRender)

    const ws = new WebSocket(`${ChatEndpoint.WebSocket}/${shouldRender?.email}`)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (message) {
            ws.send(message)
        }
    }
    const fnccc = () => {
        const fetchData = async () => {
            try {
                const response:any = await chatService.getLastMessages()
                const data = await response.json()
                console.log('setMessages:', data)
                setMessages(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()

        const handleMessageReceived = (event: any) => {
            const newMessage = { message: event.data }
            setMessages((prevMessages) => [...prevMessages, newMessage])
        }

        ws.onmessage = handleMessageReceived
    }

    useEffect(() => {
        fnccc()
    }, [])
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
                <ul id='messages' className='mt-4'>
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
