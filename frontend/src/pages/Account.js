import { useState } from "react";
import useUser from "../hooks/useUser";
import UpdateUser from "../components/UpdateUser";
import CreateEvent from "../components/CreateEvent";
import { Link } from "react-router-dom";

export default function Account(){

    const user = useUser().data,
    
    [showUserOptions, setShowUserOptions] = useState(false),
    [showEventOptions, setShowEventOptions] = useState(false),

    handleCloseOptoins =(e)=>{
        setShowUserOptions(false)
        setShowEventOptions(false)
    }

    if(!user) return <h1>Loading ...</h1>

    return (
        <main className="profile-page mt-52">
            <section className="p-2">
                {showUserOptions && <UpdateUser handleCloseOptoins={handleCloseOptoins}/>}
                {showEventOptions && <CreateEvent handleCloseOptoins={handleCloseOptoins}/>}
            </section>
            { !showUserOptions && !showEventOptions &&  <>
            <section className="relative block h-500-px">
                <div className="absolute top-50 w-full h-full bg-center bg-cover" style={{backgroundImage:" url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"}}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4 mt-28">
                    <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-80">

                        <div className="mx-10">
                            <div className="flex flex-wrap justify-between ">
                                <div className="w-full  flex justify-center">
                                    <div className="absolute -top-16">
                                        <img src={user?.avatar} alt="UserAvatar" className="shadow-xl rounded-full align-middle border-none w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:-mt-2"/>
                                    </div>
                                </div>
                                <div className="w-full md:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center lg:min-w-[290px]">
                                    <div className="flex justify-between pt-16 sm:py-12 lg:mt-0 sm:mt-0 lg:px-8">
                                        <button  onClick={()=>setShowEventOptions(true)}  className="bg-blue-600 sm:min-w-[115px] hover:bg-blue-400 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                            Creat an Event
                                        </button>
                                        <button onClick={()=>setShowUserOptions(true)} className="bg-blue-600 sm:min-w-[115px] hover:bg-blue-400 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center align-center w-full md:pt-3 md:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center md:py-4 lg:pt-4 pt-8">
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">{user.events.length}</span>
                                            <span className="text-sm text-blueGray-400">Events</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">{user?.comments?.length}</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">1</span><span className="text-sm text-blueGray-400">
                                                Photos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:mt-8">
                                <h3 className="text-2xl sm:text-4xl font-semibold leading-normal my-4 pb-4 text-blue-700">
                                    {user?.firstname + ' ' + user?.lastname}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    Los Angeles, California 
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blue-400"></i>University of Computer Science
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blue-400"></i>{user?.gender} {user?.age} years old
                                </div>
                            </div>
                            
                            { user.events.length > 0 && <div className="text-center text-2xl font-bold py-8 text-blue-700 border-t border-blueGray-200">
                                Events
                                <div className="p-10 flex flex-wrap justify-center gap-5">
                                    {user.events.map(e=>(
                                        <Link to={'/events/'+e._id} key={e._id} className="rounded bg-white overflow-hidden shadow-md hover:shadow-xl w-[280px] h-[375px]">
                                            <img className="w-full h-[150px]" src={e.img?.replace("uploads\\", "http://127.0.0.1:5000/")} alt="Event bg"/>
                                            
                                            <div className="px-6 py-2 text-left">
                                                <p className="font-bold text-lg text-black sm:min-h-[48px] ">
                                                    {e.title}
                                                </p>
                                                <p className="text-red-700 text-base py-2">
                                                    {e.date}
                                                </p>
                                                <p className="text-gray-500 text-base">
                                                    {e.address}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    {e.category}
                                                </p>
                                                <p className="text-sm text-black pt-2">
                                                    <span className="text-blue-700">By: </span> {e.user?.lastname && e.user.lastname}
                                                </p>
                                            </div>
                                            <div className="px-6 pb-2">
                                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div> }
                        </div>
                    </div>
                </div>
            </section>
            </>}
        </main>
    )
}