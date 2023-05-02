import React , {useState , useEffect , createContext } from "react";
import Axios from "axios"

const Context = createContext({
    data : null ,
    error : '',
    errors : [],
    isFetching : false ,
    loggedIn: Boolean,
    login: async()=>0,
    register: async()=>0,
    logout : async()=>0
})

export function UserProvider (props){
    const [user , setUser] = useState(null)
    const [error , setError] = useState('')
    const [errors , setErrors] = useState([])

    const [isFetching, setIsFetching] = useState(false)
    const [ready , setReady] = useState(false)

    const [loggedIn , setLoggedIn] = useState(Boolean)

    useEffect(()=>{

        Axios.get(`http://127.0.0.1:5000/user`,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
            .then(async (res) =>{
                // const result = await res.json()
                console.log('RES LOOK HERE', res);
                if(res.data._id !== user?.data._id){
                    setUser(res.data)
                    console.log('Use Effect NEW User: ', res.data);
                }
                else if(res.data._id === user?.data._id){
                    setUser(res.data)
                    console.log('Use Effect OLD User: ', res.data);

                }
            })
            .catch(err=> console.log(err))
            .finally(()=>{
                setReady(true)
            })
    },[])

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
                        setUser(res.data)
                    })
                    .catch(err=>{
                        console.log(err)
                        setError(err.response.data.error)
                    })

                // const result = await res.json()
                // if(res.status === 200){
                //     setUser(result)
                //     setLoggedIn(true)
                // }
                // else if(result.errors){
                //     setErrors(result.errors)
                //     setTimeout(() => {
                //         setErrors('')
                //     }, 2000);
                // }
                // else if (result.error){
                //     setError(result.error)
                //     setTimeout(() => {
                //         setError('')
                //     }, 2000);
                // }
                // setIsFetching(false)

                // console.log('Result by useUser:',result);
                // return result
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

                await Axios.post("http://127.0.0.1:5000/user/register", formData, {headers: { 'Content-Type': 'application/json;charset=UTF-8',
                }})
                    .then(res=> {
                        console.log(res)
                        setUser(res.data)
                    })
                    .catch(err=>{
                        console.log(err)
                        setError(err.response.data.error)
                    })

                // const res = await fetch('http://127.0.0.1:5000/user/register', {
                //     method : "POST",
                //     credentials : 'include',
                //     body : formData
                // })

                // const result = await res.json()
                // if(res.status === 200){
                //     setUser(result)
                //     setLoggedIn(true)

                //     console.log(result);
                // }
                // else if(result.errors){
                //     setErrors(result.errors)
                //     setTimeout(() => {
                //         setErrors("")
                //     }, 2000);
                // }
                // else if (result.error){
                //     setError(result.error)
                //     setTimeout(() => {
                //         setError('')
                //     }, 2000);
                // }
                // setIsFetching(false)

                // return result                
            },
            update: async (body) => {
                setError('')
                setIsFetching(true)
                const formData = new FormData()
                formData.append('firstname', body.firstname)
                formData.append('lastname', body.lastname)
                formData.append('age', body.updateAge)
                formData.append('gender', body.updateGender)
                formData.append('avatar', body.updateImage)
          
                const res = await fetch('http://localhost:4000/user', {
                  method: 'PATCH',
                  credentials: 'include',
                  body: formData
                })
          
                const result = await res.json()
          
                if(res.status === 200) {
                  setUser(result)
                }
                else if (result.errors) {
                  setError(result.errors[0].msg)
                }
                else if (result.error) {
                  setError(result.error)
                }
          
                setIsFetching(false)
          
                return res.status
              },

            logout: async()=>{
                await Axios.post('http://127.0.0.1:5000/user/logout')
                setUser(null)
                setLoggedIn(false)
            }
        }
    
    return (
        <Context.Provider value={data}>
          {ready && props.children}
        </Context.Provider>
      )
}

export default function useUser(){
    return React.useContext(Context)
}