import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import UpdateEvent from "../components/UpdateEvent";
import Comments from "../components/Comments";

export default function Event(){
    const url = 'https://axios-app.onrender.com/'

    const user = useUser(),
    navigate = useNavigate(),
    {id} = useParams(),
    [event, setEvent] = useState({}),
    [showEventOptions, setShowEventOptions] = useState(false),
    [newUpdate, setNewUpdate] = useState(Boolean),
    [isUserJoined, setIsUserJoined] = useState(Boolean),
    [loading, setLoading] = useState(false),

    handleCloseOptoins =()=>{
        setShowEventOptions(false)
        setNewUpdate(!newUpdate)
    },

    handleDeleteEvent = async(e)=>{
        e.preventDefault()

        const answer = window.confirm("Are you sure, you want to delete this event?")
        if(!answer) return
        
        try{
            await user.deleteEvent({id})
            navigate('/account')
        }
        catch (error){
            console.log(error);
        }
    },

    handleJoinEvent = async(e)=>{
        e.preventDefault()

        setLoading(true)

        if(isUserJoined){
            const answer = window.confirm("Are you sure, you want to leave this event?")
            if(!answer) return
        }

        try{
            await user.joinEvent({id})
            setNewUpdate(!newUpdate)
        }
        catch (error){
            console.log(error);
        }
        finally{
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        }
    },

    checkIsUserInTeam = async(teamArray)=>{

        const userInTeam = await teamArray.find(element => element._id === user.data?._id)
        if(userInTeam) setIsUserJoined(true)
        else if(!userInTeam) setIsUserJoined(false)
    }

    useEffect(()=>{
        try {
            Axios.get(`${url}event/`+id)
            .then(async(res)=>{
                    setEvent(res.data)
                    checkIsUserInTeam(res.data.team)
                })
        } catch (error) {
            console.log(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUpdate, user.data])

    if(showEventOptions && user.data ) return <UpdateEvent handleCloseOptoins={handleCloseOptoins}/>

    return (
        <div className="flex flex-col bg-gray-100 sm:p-8 lg:min-w-[700px] xl:min-w-[1000px]">
            <div className="md:px-14 bg-gray-200/50 rounded-2xl w-100 min-h-[30vh] max-h-[500px]">
                <img className="w-full h-full max-h-[450px] rounded-b-2xl" src={event.img?.replace("uploads/", `${url}`)} alt="Event bg" />
            </div>

            {user.data?._id === event.user?._id && 
                <div className="flex justify-between md:mx-8 mt-4 py-5 sm:relative right-0 top-10 text-right shadow-xl px-16 bg-gray-200/50 rounded-xl">
                    <button onClick={()=> {
                        setNewUpdate(false)
                        setShowEventOptions(true)
                        }} className="cursor-pointer border-transparent rounded-xl bg-blue-700 py-2 px-6 font-semibold text-white me-10"
                    >
                            Edit
                    </button>
                    <button onClick={handleDeleteEvent} className="cursor-pointer border-transparent rounded-xl bg-red-600 py-2 px-6 font-semibold text-white">
                            Delete
                    </button>
                </div>
            }
            <div className="mx-2 my-6 md:px-8">
                <div className=" my-6">
                    <p className="text-red-700 text-lg font-bold text-center mt-10">{event.date}</p>
                    <p className="text-blue-700 font-bold py-4 text-2xl sm:text-4xl">{event.title}</p>
                    <p className="text-gray-700 text-base">{event.address}</p>
                    <p className="text-gray-700 text-base">{event.description}</p>
                    <p className="text-gray-700 text-base text-end"> By {event.user?.lastname}</p>
                </div>
                { user.data && 
                    <div className="flex justify-between align-center gap-6 my-8 rounded-xl p-3 sm:p-6 bg-gray-200">
                        <p className="inline-block align-bottom mt-2">From open airs & indoor raves</p>
                        {
                            loading ? 

                            <button className="cursor-pointer animate-spin border-transparent rounded-xl bg-blue-700 py-2 px-6 font-semibold text-white">
                                Loading...
                            </button>
                            :
                            <button onClick={handleJoinEvent} className="cursor-pointer border-transparent rounded-xl bg-blue-700 py-2 px-6 font-semibold text-white">
                                { !isUserJoined ? 'Reserve a spot' : 'Cancel reservation'}
                            </button>
                          }
                    </div>
                }
                <div className="my-6">
                    <p className="text-black-700 font-bold text-xl mb-6">
                        Team ({event.team? event.team.length : 0})
                    </p>

                    {event.team && event.team.map(member=>(
                            <span key={member._id} className="text-md py-1 px-2 m-2 bg-gray-300 rounded-xl">{member.lastname}</span>
                    ))}
                </div>
                
                <Comments event={event} handleCloseOptoins={handleCloseOptoins} />
                
                <div>
                    <p className="text-black-700 font-bold text-xl my-6">Tags</p>
                    <span className="text-xs py-1 px-2 m-2 bg-gray-300 rounded-xl">#winter</span>
                    <span className="text-xs py-1 px-2 m-2 bg-gray-300 rounded-xl">#sport</span>
                    <span className="text-xs py-1 px-2 m-2 bg-gray-300 rounded-xl">#hamburg</span>
                </div>
            </div>
        </div>
    )
}