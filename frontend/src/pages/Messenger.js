import { useEffect, useState } from "react"
import useUser from "../hooks/useUser"
import Axios from "axios";


export default function Messenger(){

    const user = useUser(),
    [ chat, setChat] = useState({}),
    [ users, setUsers] = useState([]),
    [ chatID, setChatID] = useState(''),
    [ friend, setFriend] = useState(''),
    [ message, setMessage] = useState(''),

    handleSetChat = async(e, participantID)=>{
        e.preventDefault()

        await Axios.post("http://127.0.0.1:5000/messenger/set", {friendID: participantID})
            .then(async(res)=>{
                console.log('Handle Set Chat => ', res.data);
                setChat(res.data[0])
                setFriend(participantID)
                setChatID(res.data[0]._id)

                if(chatID) await Axios.get("http://127.0.0.1:5000/messenger?chatID="+chatID)
                    .then(async(response)=>{
                        console.log( 'Read Chat Response => ', response.data);
                        // if(response.data) setChat(response.data)
                        // if(response.data) setChatID(response.data._id)
                    })
                else console.log('CHAT ID NULLL: ', chatID);

            })
            .catch(err=>console.log(err))
    },

    handleSendMessage = async(e)=>{
        e.preventDefault()

        await Axios.post("http://127.0.0.1:5000/messenger", 
        {
            chatID: chatID ,
            friend: friend,
            message: message
        })
            .then((res)=>{
                console.log('Handle Send Message => ', res.data);
                setChat(res.data)
                setChatID(res.data._id)
                setMessage('')
            })
            .catch(err=>console.log(err))
    }

    useEffect( ()=>{
        Axios.get("http://127.0.0.1:5000/user/all")
            .then(async(res)=>{
                console.log( 'All Users => ', res.data);
                setUsers(res.data)
            })
            .catch (err=> console.log(err))
    }, [] )

    // useEffect( ()=>{
    //     Axios.get("http://127.0.0.1:5000/messenger?chatID="+chatID)
    //     .then(async(res)=>{
    //         console.log( 'Read Chat => ', res.data);
    //         setChat(res.data)
    //         setChatID(res.data._id)
    //     })
    //     .catch (err=> console.log(err) )
    // }, [chatID] )

    return (

        <div className="container mx-auto shadow-lg rounded-lg lg:min-w-[750px]">
              
                {/* <!-- Chatting container -->  */}
            <div className="flex flex-row justify-between bg-white max-h-full">
                {/* <!-- chat list --> */}

                <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                        {/* <!-- search compt --> */}
                    <div className="border-b-2 py-4 px-2">
                        <input
                            type="text"
                            placeholder="search chatting"
                            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                        />
                    </div>
                        {/* <!-- end search compt -->

                        <!-- user list --> */}
                    { user.data && users.filter(element=>element._id !== user.data?._id).map((u)=>( 

                        <div onClick={(e)=>handleSetChat(e, u._id)} key={u._id} className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                src={u.avatar}
                                className="object-cover h-12 w-12 rounded-full"
                                alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold"> 
                                    {u.firstname+' '+u.lastname}
                                </div>
                                {/* <span className="text-gray-500"> Time Pick me at 9:00 Am</span> */}
                            </div>
                        </div>
                    )) } 
                </div>
                {/* <!-- end chat list --> */}

                {/* <!-- Participant -->  */}
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        { chat?.participants && 

                            <div className="relative flex items-center space-x-4">
                                <div className="relative">
                                    <span className="absolute text-green-500 right-0 bottom-0">
                                        <svg width="20" height="20">
                                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                        </svg>
                                    </span>
                                    <img src={chat.participants?.filter(u=> u._id !== user.data?._id)[0].avatar} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                                </div>
                                
                                <div className="flex flex-col leading-tight">
                                    <div className="text-2xl mt-1 flex items-center">
                                        <span className="text-gray-700 mr-3">
                                        { 
                                            chat.participants?.filter(u=> u._id !== user.data?._id)[0].firstname  + ' ' +
                                            chat.participants?.filter(u=> u._id !== user.data?._id)[0].lastname  
                                        }
                                        </span>
                                    </div>
                                    <span className="text-lg text-gray-600">Junior Developer</span>
                                </div>
                            </div>
                        }
                    </div>

                    {/* Chat Messages start here => */}

                    <div  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

                        { chat && chat.messages?.map((mes)=>(

                            <div key={mes.createdAt} id="messages">
                            
                                { (mes.user._id !== user?.data?._id) ? 
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                    {mes.message}
                                                </span>
                                            </div>
                                        </div>
                                        <img src={mes.user.avatar} alt="My profile" className="w-6 h-6 rounded-full order-1"/>
                                    </div>
                                </div>
                                :
                                <div className="chat-message">
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                                    {mes.message}
                                                </span>
                                            </div>
                                        </div>
                                        <img src={mes.user.avatar} className="w-6 h-6 rounded-full order-2"/>
                                    </div>
                                </div>
                                }
                            </div>
                        ))}
                    </div>

                    {/* Chat Messages ends here => */}

                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" jidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </button>
                            </span>
                            <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>

                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                onClick={handleSendMessage}>
                                    <span className="font-bold">Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}