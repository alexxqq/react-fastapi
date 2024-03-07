import { Nav } from '../../components/Nav/Nav'
import useRenderVerification from '../../Hooks/useVerification'
import './account.scss'
import { Loading } from '../Loading/Loading'
import { user } from '../../common/types/type'
import { useHistory } from 'react-router-dom'

export const Account = () => {
    const shouldRender:false|user|null = useRenderVerification();
    const user :user|null|boolean = shouldRender
    const history = useHistory()
    
    if (user === null) {
        return (<>
        <Loading></Loading>
        </>);
      }
    
      if (!user) {
        history.replace('/error404')
        return null;
      }

    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            <div className='user-wrapper'>
                <div className='user-box'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoxWc5ukrkkaNHBArZt7YJq15_xWWDb4NdQ&usqp=CAU' alt='avatar' className='profile-picture' />
                    <h2>Welcome to your profile, <span className='username'>{user.username}</span></h2>
                    <h4>{user.email}</h4>
                    <div className='interests'>
                    <p>
      Here, you can view your account information. Take a moment to
      explore your details.
    </p>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
