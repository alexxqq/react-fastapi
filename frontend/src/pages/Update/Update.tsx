import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import taskService from '../../services/task.service'
import { Nav } from '../../components/Nav/Nav'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'

export const Update = () => {
    const taskId: { query?: string } = useParams()
    const navigate = useNavigate()
    const shouldRender = useRenderVerification()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            if (taskId.query) {
                if (isNaN(+taskId.query)) {
                    navigate('/error404',{replace:true})
                    return null
                }
                let data: any = await taskService.getOne(taskId.query)
                if (data.length === 0) {
                    navigate('/error404',{replace:true})
                    return null
                }
                data = data[0]

                data.tag = data.tag.join(' ')
                setFormData({ name: data.name, description: data.description, tags: data.tag })
            }
        }
        fetchData()
    }, [taskId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (taskId.query) {
                taskService.update(taskId.query, formData)
            }
            navigate('/',{replace:true})
        } catch (e) {
            console.log(e)
        }
    }
    if (shouldRender === null) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }
    if (!shouldRender) {
        navigate('/error404',{replace:true})
        return null
    }
    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender} />
            <div className='formWrapper'>
                <div>
                    <div className='info'>
                        <h3>Profile</h3>
                        <p>This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <h3>Personal info</h3>
                    <form onSubmit={handleSubmit} className='input-fields'>
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
