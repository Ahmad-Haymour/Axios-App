import Axios from 'axios';
import { useState } from "react";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";

export default function Comments({event, handleCloseOptoins}){

    const user = useUser()
    const {id} = useParams(),
    [commentID, setCommentID] = useState(''),
    [comment, setComment] = useState(''),
    [open , setOpen] = useState(false),
      
    handleAddComment = async(e)=>{
        e.preventDefault()

        await Axios.post("http://127.0.0.1:5000/comment", {
            message: comment,
            event: id
        })
            .then(async(res)=>{
                setComment('')
                handleCloseOptoins()
            })
            .catch (err=> console.log(err))
    },

    handleDeleteComment = async(e, commentID)=>{
        e.preventDefault()

        await Axios.delete("http://127.0.0.1:5000/comment", {
            data:  {
                commentID: commentID,
                eventID: id
            }
        })
            .then(async res=>{
                await user.invokeUser();
                setOpen( false  )
            })
            .catch(err=>console.log(err))
    }

    return (
        <section className="bg-white  py-8 lg:py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Discussion ({event.comments ? event.comments.length: 0})</h2>
                </div>

                <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6" value={comment} onChange={(e)=> setComment(e.target.value)}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400"
                            placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit" onClick={handleAddComment}
                        className="inline-flex items-center py-2.5 px-4 text-xs text-white font-medium text-center bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                </form>

                {event.comments?.map(comment => (
                    <article key={comment._id} onMouseEnter={()=>setCommentID(comment._id)} onMouseLeave={()=>setCommentID('')} className="relative p-6 mb-6 text-base bg-white rounded-lg shadow-xl">
                        
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                                    <img className="mr-2 w-6 h-6 rounded-full"
                                        src={comment.user.avatar? comment.user.avatar : "https://flowbite.com/docs/images/people/profile-picture-2.jpg"}
                                        alt="user name"/>
                                    {comment.user.firstname+
                                    ' '+comment.user.lastname}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate={"true"} dateTime="2022-02-08"
                                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                            </div>
                            <button onClick={ ()=>setOpen(!open) }
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-400/25 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:hover:text-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                    </path>
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>

                            {/* <!-- Dropdown menu --> */}

                            { open  && comment._id === commentID &&
                            
                            <div className={`absolute right-6 top-16 z-10 flex bg-white shadow-xl rounded`}>

                                <div className="flex flex-col justify-between items-start w-32 h-28 p-3 text-sm text-gray-700 dark:text-gray-200">
                                    <button className="w-full text-left text-black hover:bg-gray-300" onClick={(e)=>{handleDeleteComment(e, comment._id)}}>
                                        {/* <span className="block py-2 px-4 hover:bg-gray-100 hover:bg-gray-300 hover:text-black"></span> */}
                                        Remove
                                    </button>
                                    <button className="w-full text-left text-black hover:bg-gray-300">
                                        {/* <span className="block py-2 px-4 hover:bg-gray-100 hover:bg-gray-300 hover:text-black"></span> */}
                                        Edit
                                    </button>
                                    <button className="w-full text-left text-black hover:bg-gray-300">
                                        {/* <span className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"></span> */}
                                        Report
                                    </button>
                                </div>
                            </div>
                            }
                        </footer>
                    
                        <p className="text-gray-500 hover:text-gray-400 bg-gray-100/50">{comment.message}.</p>
                        
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                Reply
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}