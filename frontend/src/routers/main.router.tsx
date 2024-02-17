import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Path } from '../common/constants/path.enum'
import { Home } from '../pages/Home/Home'
import { SignUp } from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import { Account } from '../pages/Account/Account'
import { Error404 } from '../pages/Error404/Eror404'
import AddTask from '../pages/AddTask/AddTask'
import { Search } from '../pages/Search/Search'
import { Chat } from '../pages/Chat/Chat'

export const MainRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={Path.HOME} component={Home} />
            <Route path={Path.LOGIN} component={Login} />
            <Route path={Path.SIGNUP} component={SignUp} />
            <Route path={Path.ACCOUNT} component={Account} />
            <Route path={Path.ADDTASK} component={AddTask} />
            <Route path={Path.SEARCH} component={Search} />
            <Route path={Path.CHAT} component={Chat} />
            <Route path='*' component={Error404} />
        </Switch>
    </BrowserRouter>
)
