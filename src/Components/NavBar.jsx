import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {

    const user = useSelector((store) => store.user);

    const [requestCount, setRequestCount] = useState(0);

    const getRequestCount = async () => {
        try {
            const res =  await axios.get(BASE_URL+"user/request/count",
                { withCredentials: true }  
            );
            console.log(res.data.count);
            setRequestCount(res.data.count);
        } catch(err) {
            console.log(err);
        }
        
    }

    useEffect(() => {
        getRequestCount();
    }, [])

  return (
    <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">DevTinder</Link>
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
                    <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">{user.firstName}</span>
                    </Link>
                    </li>
                    {/* <li><a>Settings</a></li> */}
                    <li><a>New Requests <span className="indicator-item badge badge-primary">{requestCount}</span></a></li>
                    <li><Link to="/logout ">Logout</Link></li>
                </ul>
                </div>
            </div> }
            
        </div>
  )
}

export default NavBar
