import { Nav } from '../../components/Nav/Nav'
import Tasks from '../../components/Tasks/Tasks'
import './home.scss'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'
export const Home = () => {
    const shouldRender = useRenderVerification()
    if (shouldRender === null){
        return(<Loading></Loading>);
    }
    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            <h1> no WORKS!!!!!</h1>
            <Tasks shouldRender={shouldRender}></Tasks>
        </div>
    )
}
