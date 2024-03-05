import React from 'react'
import authService from '../../services/auth.service'
import { useState } from 'react'
import './login.scss'
import { Nav } from '../../components/Nav/Nav'
import { useHistory } from 'react-router-dom'
const Login = () => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const HandleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await authService.login(formData)

            history.replace('/')
        } catch (e) {
            window.alert(e)
        }
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
                        <h3>Profile</h3>
                        <p>This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <h3>Personal info</h3>
                    <form onSubmit={HandleFormSubmit} className='input-fields'>
                        <label htmlFor='username'>Email</label>
                        <input
                            type='email'
                            id='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
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

export default Login
