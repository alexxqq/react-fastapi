import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Nav } from '../../components/Nav/Nav'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
import chatService from '../../services/chat.service'
import { message } from '../../common/types/type'
import { useNavigate } from 'react-router-dom'
import './chat.scss'

export const Chat = () => {
    const shouldRender: any = useRenderVerification()
    const [messages, setMessages] = useState<message[]>([])
    const [message, setMessage] = useState<string>()
    const navigate = useNavigate()
    const [ws, setWs] = useState<boolean>(false)
    const chatContainerRef = useRef<HTMLUListElement>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (message && ws) {
            chatService.sendMessage(message)
        }
        setMessage('')
    }

    useEffect(() => {
        if (shouldRender) {
            const isConnected = chatService.connect(shouldRender.email, handleMessageReceived)
            setWs(isConnected)
        }
        fetchLastMessages()
        return () => {
            chatService.disconnect()
            setWs(false)
        }
    }, [shouldRender])
    useLayoutEffect(() => {
        scrollToBottom()
    }, [messages])
    const fetchLastMessages = () => {
        const fetchData = async () => {
            try {
                const response: any = await chatService.getLastMessages()
                const data: message[] = await response
                setMessages(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }
    const handleMessageReceived = (event: any) => {
        const newMessage = { message: event.data }
        setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }
    if (shouldRender === null) {
        return <Loading />
    }
    if (!shouldRender) {
        navigate('/error404', { replace: true })
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
