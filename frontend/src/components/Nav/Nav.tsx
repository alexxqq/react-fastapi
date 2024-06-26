import './nav.scss'
import authService from '../../services/auth.service'
import React, { useState } from 'react'
import { Loading } from '../../pages/Loading/Loading'
import { useHistory, useLocation } from 'react-router-dom'

export const Nav = (props:any) => {
    const [input, setInput] = useState('')
    const shouldRender = props.shouldRender
    const location = useLocation()
    const history = useHistory()


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }
    const handleSearchSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        history.replace(`/search/${input}`)
    }
    const logout = async () => {
        try {
            await authService.logout()
            if (location.pathname === '/'){
                history.go(0)
            }
            else{
                history.replace('/')
            }
        } catch (e) {
            console.error('Error during logout.')
        }
    }

    if (shouldRender === null) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }
    return (
        <div className='nav-bar'>
            <nav>
                <a href='/'>Workspace</a>
                <div className='search-box'>
                    <form onSubmit={handleSearchSubmit} className='form-search'>
                        <div className='inputBox_container'>
                            <svg className='search_icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
                                <path d='M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z'></path>
                            </svg>

                            <input
                                value={input}
                                onChange={handleInputChange}
                                className='inputBox'
                                id='inputBox'
                                type='text'
                                placeholder='Search For Task'
                            />
                        </div>
                        <button className='search-button'>Search</button>
                    </form>
                </div>

                <div className='auth-link'>
                    {shouldRender ? (
                        <>
                            <a href='/chat'>Chat</a>
                            <a href='/add_task'>Add Task</a>
                            <a onClick={logout}>Logout</a>
                            <a href='/account'>Account</a>
                        </>
                    ) : (
                        <>
                            <a href='/login'>Login</a>
                            <a href='/signup'>Sign up</a>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}