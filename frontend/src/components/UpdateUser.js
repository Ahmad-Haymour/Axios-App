import { useState } from "react";
import useUser from "../hooks/useUser";

export default function UpdateUser({handleCloseOptoins}){

    const user = useUser(),
    [firstname, setFirstname] = useState(''),
    [lastname, setLastname] = useState(''),
    [gender, setGender] = useState(''),
    [age, setAge] = useState(''),
    [avatar, setAvatar] = useState(''),
        
    handleUpdate = async(e)=>{
        e.preventDefault()

        try {
            await user.update({ firstname, lastname, age, gender, avatar})
            console.log('Update');
            handleCloseOptoins()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="w-full max-w-lg rounded-lg mx-auto bg-gray-200/50 shadow-2xl p-8   ">

        {/* <form className="w-full max-w-lg mx-auto bg-smokewhite"> */}
            <div className="flex flex-wrap -mt-12 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}/>
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"
                    onChange={(e)=> setLastname(e.target.value)} value={lastname}/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        Age
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder=""
                    value={age} onChange={(e)=> setAge(e.target.value)}/>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Gender
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onSelect={(e)=>setGender(e.target.value)}>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Other"}>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        </div>
                    </div>  
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
            </div>
            <button className="py-2 px-4 bg-gray-400 hover:text-white hover:bg-blue-600 rounded-xl" onClick={handleUpdate}>Update</button>
        </form>
    )
}