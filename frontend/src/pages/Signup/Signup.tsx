import React, { useState } from 'react'
import { Nav } from '../../components/Nav/Nav'
import './signup.scss'

export const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const HandleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }
    function showPassword() {
        const x = document.getElementById('password') as HTMLInputElement

        if (x.type === 'password') {
            x.type = 'text'
        } else {
            x.type = 'password'
        }
    }
    return (
        <div className='track-hui'>
            <Nav></Nav>
            <div className='formWrapper'>
                <div>
                    <div className='info'>
                        <h3>Sign Up</h3>
                        <p>This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <h3>Personal info</h3>
                    <form onSubmit={HandleFormSubmit} className='input-fields'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='username'
                            id='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                        <label htmlFor='password'>Password</label>
                        <div className='pass-box'>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                onChange={handleInputChange}
                                value={formData.password}
                            />

                            <input type='checkbox' className='showPass' onClick={showPassword} />
                        </div>

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
