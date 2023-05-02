import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Axios from "axios";
import useUser from '../hooks/useUser';

export default function Login() {

  const user = useUser()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      await user.login({email, password})
      console.log('Fine');
      navigate('/account')
    }
    catch{
      console.log("error");
    }
  }
  
  return (
      <div className="min-h-screen py-6 flex flex-col md:justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login to your account</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address"
                    onChange={(e)=> setEmail(e.target.value)} value={email} required />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password"
                     onChange={(e)=> setPassword(e.target.value)} value={password} required
                    />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="relative">
                    <button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                  </div>
                </form>
                  <div className='mt-4'>
                    <span className="text-center text-md text-gray-600 mt-50">
                      Don't have an account yet? {' '}
                    </span>
                    <Link to={'/register'} className="font-medium text-blue-600 hover:text-blue-500">
                        Signup
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
