import { Task } from '../Task/Task'
import './tasks.scss'
import { useState, useEffect } from 'react'
import { tasks } from '../../common/types/type'
import taskService from '../../services/task.serive'
const Tasks = (props:any) => {
    const [tasks, setTasks] = useState<tasks[]>([])
    const fetchTasks = async () => {
        const data = await taskService.readall()
        const response = data as unknown as tasks[]
        console.log('what i need ->', data)
        console.log('what i need ->', response)

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
