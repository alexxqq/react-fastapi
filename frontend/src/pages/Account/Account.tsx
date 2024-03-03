import { Nav } from '../../components/Nav/Nav'
import useRenderVerification from '../../Hooks/useVerification'
import './account.scss'
import { Loading } from '../Loading/Loading'
export const Account = () => {
    const shouldRender:boolean|string|null = useRenderVerification();
    const user :any = shouldRender
    
    if (shouldRender === null) {
        return (<>
        <Loading></Loading>
        </>);
      }
    
      if (!shouldRender) {
        window.location.href = 'error404';
        return null;
      }

    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            <div className='user-wrapper'>
                <div className='user-box'>
                    <img src='https://cojo.ru/wp-content/uploads/2022/12/danil-skriabin-1.webp' alt='avatar' className='profile-picture' />
                    <h1>{user?.username}</h1>
                    <h4>{user?.email}</h4>
                    <div className='interests'>
                        <h3>Interests:</h3>
                        <ul>
                            <li>Suck lolipop</li>
                        </ul>
                    </div>
                    <button>Edit Profile</button>
                </div>
            </div>
        </div>

    )
    
}
