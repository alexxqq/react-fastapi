import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Path } from "../common/constants/path.enum";
import { Home } from '../pages/Home/Home';
import { SignUp } from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import { Account } from '../pages/Account/Account';
import { Error404 } from '../pages/Error404/Eror404';
import AddTask from '../pages/AddTask/AddTask';
import { Search } from '../pages/Search/Search';
import { Chat } from '../pages/Chat/Chat';
import { Update } from '../pages/Update/Update'



export const MainRouter = () => (
    <BrowserRouter>
    <Routes>
      <Route path={Path.HOME} element={<Home/>} />
      <Route path={Path.LOGIN} element={<Login />} />
      <Route path={Path.SIGNUP} element={<SignUp />} />
      <Route path={Path.ACCOUNT} element={<Account />} />
      <Route path={Path.ADDTASK} element={<AddTask />} />
      <Route path={Path.SEARCH} element={<Search />} />
      <Route path={Path.UPDATE} element={<Update />} />
      <Route path="search" element={<Search />} />
      <Route path={Path.CHAT} element={<Chat />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>
)