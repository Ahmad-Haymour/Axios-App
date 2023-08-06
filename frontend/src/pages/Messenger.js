import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import Axios from "axios";
import InputEmoji from 'react-input-emoji';

export default function Messenger(){
    const url = 'https://axios-app.onrender.com/'

    const user = useUser(),
    [ chat, setChat] = useState({}),
    [ users, setUsers] = useState([]),
    [ filterUsers, setFilterUsers] = useState([]),
    [ chatID, setChatID] = useState(''),
    [ friend, setFriend] = useState(''),
    [ message, setMessage] = useState(''),
    [ ready, setReady] = useState(false),
    [ participantReady, setParticipantReady] = useState(false),

    // Set a new connection between two users to start chatting
    handleSetChat = async(e, participantID)=>{
        e.preventDefault()
        setParticipantReady(false)
        await Axios.post(`${url}messenger/set`, {friendID: participantID})
            .then(async(res)=>{
                setFriend(participantID)
                setChatID(res.data[0]?._id)

                if(res.data[0]?._id) await Axios.get(`${url}messenger?chatID=`+res.data[0]?._id)
                    .then(async(response)=>{
                        setChat(response.data)
                    })
            })
            .catch(err=>console.log(err))
            .finally(()=> setParticipantReady(true))
    },

    handleSendMessage = async(e)=>{
        // e.preventDefault()

        if(!message) return
        
        // setMessage(text)
        await Axios.post(`${url}messenger`, 
        {
            chatID: chatID ,
            friend: friend,
            message: message
        })
            .then(async (res)=>{
                await Axios.get(`${url}messenger?chatID=`+res.data._id)
                    .then(async(response)=>{
                        setChat(response.data)
                        setChatID(response.data._id)
                        setMessage('')
                    })                
            })
            .catch(err=>console.log(err))
    },

    messageTimeFormatter = (msg)=>{
        const time = msg.createdAt?.slice(11,16),
        date = msg.createdAt?.slice(0,10)
        return [time, date]
    },

    searchFunction = (value)=>{
        const searchResult = users.filter(e=>e.firstname.toLowerCase().includes(value.toLowerCase()) || e.lastname.toLowerCase().includes(value.toLowerCase()))
        setFilterUsers(searchResult)
    }

    useEffect( ()=>{
        setReady(false)
        Axios.get(`${url}user/all`)
            .then(async(res)=>{
                setUsers(res.data)
                setFilterUsers(res.data)
            })
            .catch (err=> console.log(err))
            .finally( ()=> setReady(true))
    }, [] )

    const [ text, setText ] = useState('')

    useEffect(()=>{
        setMessage(text)
    }, [text])

    if(!ready) return <h1 className="animate-bounce h-[80vh] text-center mt-40 text-4xl">Loading ...</h1>

    return (

        <div className="container mx-auto shadow-lg rounded-lg lg:min-w-[750px] min-h-[87vh] sm:h-[70vh] lg:h-[90vh]">

            <div className="sm:flex flex-row justify-between bg-white sm:h-[85vh] lg:h-[95vh] my-4">
                {/* <!-- chat list --> */}

                <div className="flex flex-col sm:w-2/5 border-r-2 overflow-y-auto h-[170px] sm:h-full border-2 border-sky-400 sm:border-gray-500/50">
                        {/* <!-- search compt --> */}
                    <div className="border-b-2 py-6 px-2">
                        <input
                            type="text"
                            placeholder="search chatting"
                            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            onChange={(e)=>searchFunction(e.target.value)}
                        />
                    </div>
                        {/* <!-- end search compt -->

                        <!-- user list --> */}
                    { user.data && users && filterUsers.filter(element=>element._id !== user.data?._id).map((u)=>( 

                        <div onClick={(e)=>handleSetChat(e, u._id)} key={u._id} className="flex flex-row py-4 px-2 justify-between items-center border-b-2">
                            <div className="w-2/4">
                                <img
                                src={u.avatar}
                                className="object-cover h-12 w-12 rounded-full"
                                alt="Participant avatar"
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
               { !participantReady ? <h1 className="text-sky-700 text-xl animate-spin">LOADING...</h1> : <div className="flex sm:p-2 justify-between flex-col w-full h-[66vh] sm:h-full">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        {/* { chat?.participants &&  */}

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
                                        { chat.participants ? 
                                            <span className="text-gray-700 mr-3">
                                                { 
                                                    chat.participants?.filter(u=> u._id !== user.data?._id)[0].firstname  + ' ' +
                                                    chat.participants?.filter(u=> u._id !== user.data?._id)[0].lastname  
                                                }
                                            </span>
                                            :
                                            <span className="text-lg text-gray-600">Choose a friend..</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        {/* } */}
                    </div>

                    {/* Chat Messages start here => */}

                    <div  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

                        { chat && chat.messages?.map((mes)=>(

                            <div key={mes.createdAt} id="messages">
                            
                                { (mes.user?._id !== user?.data?._id) ? 
                                <div className="chat-message">
                                    <div className="flex items-start cursor-pointer" >
                                        <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-2 items-start" title={messageTimeFormatter(mes)[1]}>
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                    {mes.message}
                                                </span>
                                                <span className="text-sm block">{messageTimeFormatter(mes)[0]}</span>
                                            </div>
                                        </div>
                                        <img src={mes.user?.avatar} alt="My profile" className="w-12 h-12 rounded-full order-1"/>
                                    </div>
                                </div>
                                :
                                <div className="chat-message">
                                    <div className="flex items-start justify-end start cursor-pointer" >
                                        <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-end" title={messageTimeFormatter(mes)[1]}>
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                                    {mes.message}
                                                </span>
                                                <span className="text-sm block text-right">{messageTimeFormatter(mes)[0]}</span>
                                            </div>
                                        </div>
                                        <img src={mes.user?.avatar} className="w-10 h-10 rounded-full order-2" alt="user avatar"/>
                                    </div>
                                </div>
                                }
                            </div>
                        ))}
                    </div>

                    {/* Chat Messages ends here => */}

                    {/* Send Message Input && Emoji Input and Display */}
                    <div className="border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
                        <InputEmoji
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleSendMessage}
                            placeholder="Type a message"
                        />
                    </div>
                </div>}
            </div>
        </div>
    )
}