import Home from '../pages/home'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Search from '../pages/SearchMobile'
import Profile from '../pages/profile'
import Video from '../pages/video'
import Message from '../pages/message'
import Interact from '../pages/interact'

const router = [
    {path:'/', element: Home},
    {path:'/search', element: Search},
    {path:'/profile/:userId', element: Profile},
    {path:'/profile/:userId/:nav', element: Profile},
    {path:'/video', element:Video},
    {path:'/interact', element:Interact},
    {path:'/interact/:friends', element:Interact},
    {path:'/login', element:Login, layout:null},
    {path:'/register', element:Register, layout:null},
    {path:'/messages', element:Message, layout:null},
]

export default router