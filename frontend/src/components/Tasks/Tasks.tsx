import { Task } from '../Task/Task'
import './tasks.scss'
import { useState, useEffect } from 'react'
import { tasks, user } from '../../common/types/type'
import taskService from '../../services/task.service'
const Tasks = (props:{shouldRender:false|null|user}) => {
    const [tasks, setTasks] = useState<tasks[]>([])
    const fetchTasks = async () => {
        const data = await taskService.readall()
        const response = data as unknown as tasks[]

        setTasks(response)
    }
    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div className='tasks'>
            {tasks.map((item) => (
                <Task shouldRender={props.shouldRender}
                    name={item.name}
                    description={item.description}
                    date={item.date}
                    tags={item.tag}
                    user={item.user}
                    key={item.id}
                    id={item.id}
                />
            ))}
        </div>
    )
}

export default Tasks
