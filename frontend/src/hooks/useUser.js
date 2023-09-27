import React , {useState , useEffect , createContext } from "react";
import Axios from "axios";

const Context = createContext({
    data : null ,
    error : '',
    errors : [],
    isFetching : false ,
    loggedIn: Boolean,
    login: async()=>0,
    register: async()=>0,
    logout : async()=>0,
    update: async()=>0,
    invokeUser: async()=>0,
    createEvent: async()=>0,
    updateEvent: async()=>0,
    deleteEvent: async()=>0,
    joinEvent: async()=>0
})

export function UserProvider (props){
    const [user , setUser] = useState(null)
    const [error , setError] = useState('')
    const [errors , setErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [loggedIn , setLoggedIn] = useState(Boolean)
    const [refreshUser, setRefreshUser] = useState(false)

    const url = 'https://axios-app.onrender.com'

    Axios.defaults.withCredentials = true;

    useEffect(()=>{

        Axios.get(`${url}/user`,
            {headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/x-www-form-urlencoded'}}
        )
            .then(async (res) =>{
                setUser(res.data)
            })
            .catch(err=> console.log(err))
    }, [refreshUser])

        const data = {
            data: user,
            error : error,
            errors : errors,
            isFetching: isFetching,
            loggedIn: loggedIn,

            login : async(body)=>{
                setError('')
                setErrors([])
                setIsFetching(true)

                await Axios.post(`${url}/user/login`, {email:body.email, password:body.password},  {headers: { 'Content-Type': 'application/json;charset=UTF-8',
                }})
                    .then(res=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        setError(err.response.data.error)
                    })
            },

            register: async(body)=>{
                setError('')
                setErrors("")
                setIsFetching(true)

                const formData = new FormData()
                formData.append("email", body.email)
                formData.append("password", body.password)
                formData.append("firstname", body.firstname)
                formData.append("lastname", body.lastname)
                formData.append("gender", body.gender)
                formData.append("age", body.age)
                formData.append("address", body.address)
                formData.append("bio", body.bio)
                formData.append("avatar", body.avatar)

                await Axios.post(`${url}/user/register`, formData, {headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'multipart/form-data'}})
                    .then(res=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        setError(err.response.data.error)
                    })              
            },

            update: async (body) => {
                setError('')
                setIsFetching(true)

                const formData = new FormData()
                formData.append("firstname", body.firstname)
                formData.append("lastname", body.lastname)
                formData.append("age", body.age)        
                formData.append("gender", body.gender)
                formData.append("address", body.address)
                formData.append("bio", body.bio)
                formData.append("avatar", body.avatar)

                await Axios.patch(`${url}/user`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(res=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        setError(err.response.data.error)
                    })
              },

            logout: async()=>{
                await Axios.post(`${url}/user/logout`)
                setUser(null)
                setLoggedIn(false)
            },

            invokeUser: async()=>{
                await  Axios.get(`${url}/user`,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                )
                .then(async (res) =>{
                    setUser(res.data)
                })
                .catch(err=> console.log(err))
            },

            createEvent: async (body) => {
                setError('')
                setIsFetching(true)

                let eventID = ""
                
                try {
                    const formData = new FormData()
                    formData.append("title", body.title)
                    formData.append("address", body.address)
                    formData.append("date", body.date)
                    formData.append("description", body.description)
                    formData.append("category", body.category)
                    formData.append("eventBild", body.eventBild)
    
                    const response = await Axios.post(`${url}/event`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    eventID = response.data._id
                    setRefreshUser(state=>!state)
                    return eventID

                } catch (error) {
                    console.error('Error by creating an event:', error);
                }
            },

            updateEvent: async (body) => {
                setError('')
                setIsFetching(true)
                
                const formData = new FormData()
                formData.append("title", body.title)
                formData.append("address", body.address)
                formData.append("date", body.date)
                formData.append("description", body.description)
                formData.append("category", body.category)
                formData.append("eventBild", body.eventBild)

                try {
                    await Axios.patch(`${url}/event/`+body.id , formData, {headers: {'Content-Type': 'multipart/form-data'},});
                    setRefreshUser(state=>!state);
                } catch (error) {
                    setError(error.response?.data?.error || "An error occurred")
                }
            },

            deleteEvent: async (body) => {
                await Axios.delete(`${url}/event/`+body.id, {id: body.id}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} )
                    .then(async()=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            },

            joinEvent: async (body) => {
                await Axios.post(`${url}/event/join`, {id: body.id}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} )
                    .then(async(res)=> {
                        console.log('Join Response:  ',res.data);
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            }
        }
    
    return (
        <Context.Provider value={data}>
          { props.children }
        </Context.Provider>
      )
}

export default function useUser(){
    return React.useContext(Context)
}