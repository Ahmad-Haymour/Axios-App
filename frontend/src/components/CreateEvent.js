import { useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function CreateEvent({handleCloseOptoins}){

    const user = useUser(),
    navigate = useNavigate(),
    [title, setTitle] = useState(''),
    [address, setAddress] = useState(''),
    [date, setDate] = useState(''),
    [description,setDescription] = useState(''),
    [category, setCategory] = useState('Public'),
    [eventBild , setEventBild] = useState(''),

    handleCreate =async(e)=>{
        e.preventDefault()
        if(!title || !address || !date || !description || !category) return

        try {
            const eventId = await user.createEvent({title,address,date, description, category, eventBild})
            handleCloseOptoins()
            if(eventId){
                navigate('/events/'+eventId)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="w-full max-w-lg -mt-40 rounded-lg mx-auto bg-gray-200/50 shadow-2xl p-8">
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Title
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Date
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="27.07.2023"
                onChange={(e)=> setDate(e.target.value)} value={date}/>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Description
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Description"
                value={description} onChange={(e)=> setDescription(e.target.value)}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Category
                    </label>
                    <div className="relative">
                        <select defaultValue={category} onChange={(e)=>setCategory(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value={'Public'}>Public</option>
                            <option value={'Adults'}>Adults</option>
                            <option value={'Kids'}>Kids</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        </div>
                    </div>  
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Address
                </label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Location"/>
            </div>
            <div className="flex items-center justify-center w-full py-5 my-6">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload avatar</span> </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">or drag and drop: SVG, PNG, JPG or GIF.</p> 
                                    </div>
                                    <input  accept='image/*' onChange={(e)=> setEventBild(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
        </div>
        <button onClick={handleCreate} className="cursor-pointer rounded-xl bg-white py-2 px-6 font-semibold">Create</button>
    </form>
    )
}