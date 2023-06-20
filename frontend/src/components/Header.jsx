import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className="bg-slate-50 flex items-center justify-between p-5 shadow">
        <div>
            <Link to='/' className="font-bold text-2xl">CalenderApp</Link>
        </div>
        <ul className="flex items-center gap-5">
            {user ? (
                <li className="px-3 py-1 font-bold">
                    <button onClick={onLogout}>Logout</button>
                </li>) : (
                <>
                    <li className="px-3 py-1 font-bold">
                        <Link to='/login'>Login</Link>
                    </li>
                    <li className="px-3 py-1 font-bold">
                        <Link to='/register'>Register</Link>
                    </li>
                </>)}
            
        </ul>
    </header>
  )
}

export default Header