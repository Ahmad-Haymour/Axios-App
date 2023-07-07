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
    const [ready , setReady] = useState(false)
    const [loggedIn , setLoggedIn] = useState(Boolean)

    const [refreshUser, setRefreshUser] = useState(false)

    useEffect(()=>{

        Axios.get(`http://127.0.0.1:5000/user`,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
            .then(async (res) =>{
                setUser(res.data)
                console.log('Use Effect NEW User: ', res.data);
            })
            .catch(err=> console.log(err))
            .finally(()=>{
                setReady(true)
            })
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

                await Axios.post("http://127.0.0.1:5000/user/login", {email:body.email, password:body.password},  {headers: { 'Content-Type': 'application/json;charset=UTF-8',
                }})
                    .then(res=> {
                        // setUser(res.data)
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        console.log(err)
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
                formData.append("avatar", body.avatar)

                await Axios.post("http://127.0.0.1:5000/user/register", formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(res=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        console.log(err)
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
                formData.append("avatar", body.avatar)

                await Axios.patch("http://127.0.0.1:5000/user", formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(res=> {
                        console.log(res)
                        setRefreshUser(state=>!state)
                    })
                    .catch(err=>{
                        console.log(err)
                        setError(err.response.data.error)
                    })
              },

            logout: async()=>{
                await Axios.post('http://127.0.0.1:5000/user/logout')
                setUser(null)
                setLoggedIn(false)
            },

            invokeUser: async()=>{
                await  Axios.get(`http://127.0.0.1:5000/user`,
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
                
                const formData = new FormData()
                formData.append("title", body.title)
                formData.append("address", body.address)
                formData.append("date", body.date)
                formData.append("description", body.description)
                formData.append("category", body.category)
                formData.append("eventBild", body.eventBild)

                await Axios.post("http://127.0.0.1:5000/event", formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(async(res)=> {
                        eventID = res.data._id
                        setRefreshUser(state=>!state)  
                    })
                    .catch(err=>{
                        console.log(err)
                        setError(err.response.data.error)
                    })
                return eventID
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

                await Axios.patch("http://127.0.0.1:5000/event/"+body.id , formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(async()=> {
                        setRefreshUser(state=>!state)                 
                    })
                    .catch(err=>{
                        console.log(err)
                        setError(err.response.data.error)
                    })
            },

            deleteEvent: async (body) => {
                console.log(body);
                await Axios.delete("http://127.0.0.1:5000/event/"+body.id, {id: body.id}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} )
                    .then(async()=> {
                        setRefreshUser(state=>!state)
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            },

            joinEvent: async (body) => {
                await Axios.post("http://127.0.0.1:5000/event/join", {id: body.id}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} )
                    .then(async(res)=> {
                        console.log('Join Res:  ',res);
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            }
        }
    
    return (
        <Context.Provider value={data}>
          {/* {ready && props.children} */}
          { props.children}

        </Context.Provider>
      )
}

export default function useUser(){
    return React.useContext(Context)
}