import { useState } from "react";
import useUser from "../hooks/useUser";
import UpdateUser from "../components/UpdateUser";
import CreateEvent from "../components/CreateEvent";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Account(){
    
    const url = 'https://axios-app.onrender.com'

    const user = useUser().data,
    userMethods = useUser(),
    
    [showUserOptions, setShowUserOptions] = useState(false),
    [showEventOptions, setShowEventOptions] = useState(false),
    [showNotifications, setShowNotifications] = useState(false),

    handleCloseOptoins =()=>{
        setShowUserOptions(false)
        setShowEventOptions(false)
    },

    handleReadMessage = async (e, id)=>{
        e.preventDefault()

        await Axios.delete(`${url}/messenger`,{ data: { messageID: id} })
        .then(async (res)=>{
            await userMethods.invokeUser()
        })
    }

    if(!user) return <h1 className="animate-bounce mt-40 text-4xl">Loading ...</h1>

    return (
        <main className="profile-page relative mt-52">
            {/* Notification icon */}
            <div className="absolute -top-52 bottom-auto left-auto right-0 m-3 inline-flex w-fit cursor-pointer"
                 onClick={(e)=>setShowNotifications(!showNotifications)}
            >
              
                <div className="absolute bottom-0 left-0 right-auto top-auto z-20 inline-block -translate-x-2/4 translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600/75 px-2 text-lg text-white"
                >
                    {user.notifications?.length}
                        
                </div>
                <div className="flex items-center justify-center rounded-lg bg-blue-600 px-2 py-1.5 text-center shadow-lg z-10">
                    <div>
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bell"
                        className="mx-auto w-6 text-white"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path
                        fill="currentColor"
                        d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
                    </svg>
                    </div>
                </div>
            </div>

            {/* Options components - Display */}

            <section className="relative p-2">           
                {/* Edit user page*/}
                {showUserOptions && <UpdateUser handleCloseOptoins={handleCloseOptoins}/>}

                {/*Create an event page*/}
                {showEventOptions && <CreateEvent handleCloseOptoins={handleCloseOptoins}/>}

                {/* Notifications section */}
                { showNotifications && user.notifications.length > 0 &&
                    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900/90 w-[80%] mt-10 pb-12 text-center rounded-lg max-h-96 overflow-auto" >
                        <button type="button" className=" rounded-md p-2 absolute right-0 text-gray-400 hover:text-red-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={()=>setShowNotifications(false)}>
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="md:text-2xl text-white p-4">You have {user.notifications.length} new messages!</h3>
                        {user.notifications?.map(n=> (
                            <div key={n._id} className="flex justify-between cursor-pointer rounded-lg  z-100 px-7 pb-2.5 m-6 text-xs md:text-lg font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-gray-600/50 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700"  title="Delete notification!"
                                onClick={(e)=>handleReadMessage(e, n._id)}>
                                <span className="inline-block shadow-[0_4px_9px_-4px_#dc4c64] p-5 text-gray-300">
                                    {n.user.firstname+' '+n.user.lastname}
                                </span>
                                <span
                                    tabIndex="0"
                                    className="block rounded bg-red z-100 px-7 pb-2.5 md:text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700 p-5"
                                    data-te-toggle="popover"
                                    data-te-trigger="focus"
                                    
                                    data-te-content="And here's some amazing content. It's very engaging. Right?"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    {n.message}
                                </span>
                            </div>
                        ))}
                    </section>
                }
            </section>

            {/* User details */}
            { !showUserOptions && !showEventOptions &&  <>

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
                            <div className="text-center lg:mt-8 pb-8">
                                <h3 className="text-2xl sm:text-4xl font-semibold leading-normal my-4 pb-4 text-blue-700">
                                    {user?.firstname + ' ' + user?.lastname}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    { user?.address.length >0 ? user.address.toUpperCase() : "Los Angeles, California" }
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blue-400"></i>{ ! user?.bio.length>0 ? user.bio : "University of Computer Science" }
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blue-400"></i>{user?.gender}, {user?.age} years old
                                </div>
                            </div>
                            
                            { user.events.length > 0 && <div className="text-center text-2xl font-bold py-8 text-blue-700 border-t border-blueGray-200">
                                Events
                                <div className="p-10 flex flex-wrap justify-center gap-5">
                                    {user.events.map(e=>(
                                        <Link to={'/events/'+e._id} key={e._id} className="rounded bg-white overflow-hidden shadow-md hover:shadow-xl w-[280px] h-[375px]">
                                            <img className="w-full h-[150px]" src={ `${url}/${e.img}` } alt="Event bg"/>
                                            
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