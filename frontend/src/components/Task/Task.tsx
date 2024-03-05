import './task.scss'
import { task } from '../../common/types/type'
import taskService from '../../services/task.service'

export const Task = (props: task) => {
    const delete_task = async (id: number) => {
        await taskService.delete(id);
        window.location.href = '/'
    }
    const update_task = async (id: number) => {

        window.location.href = `/update/${id}`
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
                    <div className='update-delete'>
                    <button className='close-button' onClick={() => delete_task(props.id)}>
                        &#10006;
                    </button>
                <button className="update-button" onClick={() => update_task(props.id)}>
                <svg className="pencil-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
                </svg>
            </button>
            </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
