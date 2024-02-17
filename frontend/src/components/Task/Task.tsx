import './task.scss'
import { task } from '../../common/types/type'
import taskService from '../../services/task.serive'

export const Task = (props: task) => {
    const delete_task = async (id: number) => {
        await taskService.delete(id);
        window.location.href = '/'
    }
    return (
        <div className='task'>
            <div className='upper-button'>
                <div className='upper'>
                    <time className='time-my'>{props.date}</time>
                    <div className='tags'>
                        {props.tags.map((item) => (
                            <h4 className='tag'>{item}</h4>
                        ))}
                    </div>
                </div>

                <a href=''>{props.name}</a>
                <p>{props.description}</p>
                <a href='' className='user-text'>
                    {props.user.email}
                </a>
            </div>
            <div className='button-cross'>
                {props.shouldRender?.id == props.user.id ? (
                    <button className='close-button' onClick={() => delete_task(props.id)}>
                        &#10006;
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
