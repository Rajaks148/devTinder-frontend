import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../Slice/userSlice';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';




const Login = () => {
    const [emailId, setEmailId] = useState('rajaks@test.com');
    const [password, setPassword] = useState('Raja!123@');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL+"login",{
                emailId,
                password
            },
            { withCredentials: true }  
        );
        console.log(res.data);
        dispatch(addUser(res.data.user));
        navigate("/");
        } catch(err) {
            console.log(err);
        }
        
    }

    const user = useSelector((store) => store.user);

    
        return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Email</span>
                        </label>
                        <input 
                        type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                        placeholder="email@example.com" 
                        className="input input-bordered" 
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label">
                        <span className="label-text">Password</span>
                        </label>
                        <input 
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="input input-bordered" 
                        />
                        <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                            Forgot password?
                        </a>
                        </label>
                    </div>

                    <div className="form-control mt-4">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>

                    <p className="text-center mt-2">
                        New here?{" "}
                        <a href="#" className="link link-primary">
                        Create an account
                        </a>
                    </p>
                </div>
            </div>
        </div>
  )
    }


export default Login
