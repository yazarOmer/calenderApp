import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-50 flex items-center justify-between p-5 shadow">
        <div>
            <Link to='/' className="font-bold text-2xl">CalenderApp</Link>
        </div>
        <ul className="flex items-center gap-5">
            <li className="px-3 py-1 font-bold">
                <Link to='/login'>Login</Link>
            </li>
            <li className="px-3 py-1 font-bold">
                <Link to='/register'>Register</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header