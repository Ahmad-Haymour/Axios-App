import React, { useState } from 'react'
import Axios from 'axios';
import useUser from '../hooks/useUser';
import {Link, useNavigate} from 'react-router-dom';

Axios.defaults.withCredentials = true;


export default function Register() {

  const user = useUser()
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
      const [avatar, setAvatar] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
        await user.register({email, password, firstname, lastname, age, gender, avatar})
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Create a new account</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <input autoComplete="off" id="firstname" name="firstname" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Firstname"
                                        onChange={(e)=> setFirstname(e.target.value)} value={firstname} required />
                                        <label htmlFor="firstname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                                    </div>
                                    <div className="relative">
                                        <input autoComplete="off" id="lastname" name="lastname" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Lastname"
                                        onChange={(e)=> setLastname(e.target.value)} value={lastname} required />
                                        <label htmlFor="lastname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <input autoComplete="off" id="age" name="age" type="number" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Age"
                                        onChange={(e)=> setAge(e.target.value)} value={age} required />
                                        <label htmlFor="age" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Age</label>
                                    </div>
                              
                                    <div className="flex justify-evenly items-end gap-10 mx-5">

                                        <div className="flex items-center">
                                            <input onClick={(e)=> setGender('Male')} id="default-radio-1" type="radio" value={"Male"} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input onClick={(e)=> setGender('Female')}  id="default-radio-2" type="radio" value={"Female"} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Female</label>
                                        </div>
                                    </div>

                                </div>

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

                                <div className="flex items-center justify-center w-full py-5">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload avatar</span> </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">or drag and drop: SVG, PNG, JPG or GIF.</p> 
                                        </div>
                                        <input  accept='image/*' onChange={(e)=> setAvatar(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div> 

                                <div className="relative">
                                    <button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                </div>
                            </form>
                            <div>
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
