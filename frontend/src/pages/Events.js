import Axios  from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Events(){

    const user = useUser()
    const [events, setEvents] = useState([])

    useEffect(()=>{

        try {
            Axios.get('http://127.0.0.1:5000/event')
                .then((res)=>{
                    console.log('All Events: ', res.data);
                    setEvents(res.data)
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="p-10 flex flex-wrap justify-center gap-5 bg-gray-100">
            {   events.length > 0 &&
                events.map((e)=>(
                    <Link to={'/events/'+e._id} key={e._id} className="rounded bg-white overflow-hidden shadow-md hover:shadow-xl w-[270px] h-[380px]">
                        <img className="w-full h-[150px]" src={e.img?.replace("uploads\\", "http://127.0.0.1:5000/")} alt="Event bg"/>
                        
                        <div className="px-6 py-0">
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
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}