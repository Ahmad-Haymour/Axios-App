import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios  from "axios";

export default function Events(){

    const [events, setEvents] = useState([])

    const [filterEvents, setFilterEvents] = useState([])


    useEffect(()=>{
        try {
            Axios.get('http://127.0.0.1:5000/event')
                .then((res)=>{
                    setEvents(res.data)
                    setFilterEvents(res.data)
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const filterFunction = (cat)=>{
        const filterResult = events.filter(e=>e.category === cat);
        setFilterEvents(filterResult);
      }
    
      const searchFunction = (value)=>{
        const searchResult = events.filter(e=>e.title.toLowerCase().includes(value.toLowerCase()) || e.address.toLowerCase().includes(value.toLowerCase()))
        setFilterEvents(searchResult)
        console.log('searchResult',searchResult);
      }

    return (
        <div className="bg-white-400 min-w-[74.8vw]">
            <div className='min-w-[100%]  mx-auto pt-14'>
                <div className="relative mx-auto flex items-center w-[70%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    onChange={(e)=>searchFunction(e.target.value)}
                    type="text"
                    id="search"
                    placeholder="Search by title or address.." /> 
                </div>

                <div className="py-12 flex justify-center">
                    <button
                        type="button"
                        className="inline-block rounded-l bg-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 bg-blue-500"
                        onClick={()=>filterFunction(events)}>
                        All 
                    </button>
                    <button
                        type="button"
                        className="inline-block bg-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 bg-blue-500"
                        onClick={()=>filterFunction("Public")}>
                        Public
                    </button>
                    <button
                        type="button"
                        className="inline-block rounded-r bg-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 bg-blue-500"
                        onClick={()=>filterFunction("Kids")}>
                        Kids
                    </button>
                    <button
                        type="button"
                        className="inline-block rounded-r bg-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 bg-blue-500"
                        onClick={()=>filterFunction("Adults")}>
                        Adults
                    </button>
                </div>
            </div>

            <hr />

            <div className="p-10 flex flex-wrap justify-center gap-5 bg-gray-100">
                {   events.length > 0 &&
                    filterEvents?.map((e)=>(
                        <Link to={'/events/'+e._id} key={e._id} className="rounded bg-white overflow-hidden shadow-md hover:shadow-xl w-[270px] h-[380px]">
                            <img className="w-full h-[150px]" src={e.img?.replace("uploads\\", "http://127.0.0.1:5000/")} alt="Event bg"/>
                            
                            <div className="px-4 py-0 min-h-[160px]">
                                <div className="font-bold text-xl mb-2">
                                    {e.title.length>20? e.title.slice(0,22)+'..': e.title}
                                </div>
                                <p className="text-red-700 text-base">
                                    {e.date}
                                </p>
                                <p className="text-gray-700 text-base">
                                    {e.address}
                                </p>
                                <p className="text-gray-800 text-base text-right">
                                    {e.category}
                                </p>
                                <div className="font-bold text-md">
                                    {e.user.lastname}
                                </div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>  
    )
}