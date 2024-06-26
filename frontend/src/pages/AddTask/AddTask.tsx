import React from 'react'
import taskService from '../../services/task.service'
import { useState } from 'react'
import './addtask.scss'
import { Nav } from '../../components/Nav/Nav'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
import { useHistory } from 'react-router-dom'

const AddTask = () => {
    const shouldRender = useRenderVerification()
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: '',
    })
    if (shouldRender === null) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }
    if (!shouldRender) {
        history.replace('/error404')
        return null
    }
    const HandleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            taskService.create(formData)
            history.replace('/')
        } catch (e) {
            console.error('Error during adding task.')
        }
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            <div className='formWrapper'>
                <div>
                    <div className='info'>
                        <h3>Task</h3>
                        <p>This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <h3>Task info</h3>
                    <form onSubmit={HandleFormSubmit} className='input-fields'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' onChange={handleInputChange} value={formData.name} />
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            name='description'
                            onChange={handleInputChange}
                            value={formData.description}
                        />

                        <label htmlFor='tags'>Tags</label>

                        <input type='text' id='tags' name='tags' onChange={handleInputChange} value={formData.tags} />

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask
