import React from 'react'
import { useSelector } from 'react-redux'

const ChatMessage = ({item}) => {
  const { auth } = useSelector(store => store)

  const isReqUserMessage = auth.user?.id === item.user?.id

  return (
    <div className={`flex ${isReqUserMessage ? "justify-end" : "justify-start"}`}>
      <div className={`p-2 px-5 rounded-2xl max-w-[50%] 
        ${isReqUserMessage ? "bg-blue-400 text-white" : "bg-gray-100"}`}>
        {item.image && <img className='w-[12rem] h-[17rem] object-cover rounded-md mb-2' 
          src={item.image} alt="" />}
        <p>{item.content}</p>
      </div>
    </div>
  )
}

export default ChatMessage