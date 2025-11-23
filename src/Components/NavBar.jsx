import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {

    const user = useSelector((store) => store.user);
    console.log(user);
    console.log(user?.photoUrl);
  return (
    <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">DevTinder</a>
            </div>
            {user && <div className="flex-none gap-2">
                <p className=''>Welcome, {user?.firstName}</p>
                <div className="dropdown dropdown-end mx-5">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt={user?.firstName} src={user?.photoUrl} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div> }
            
        </div>
  )
}

export default NavBar
