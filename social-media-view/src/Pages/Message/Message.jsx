import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard'
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import Stom from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom'


const Message = () => {

  const { message, auth } = useSelector(store => store)
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllChats())
  }, [])

  const handleSelectImage = async (e) => {

    setLoading(true)
    console.log("select image..")
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image")
    setSelectedImage(imgUrl);
    setLoading(false)
  }

  const handleCreateMessage = (value) => {

    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage
    }
    dispatch(createMessage({ message, sendMessageToServer }))
  };

  const [stomClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/ws')
    const stomp = Stom.over(sock)
    setStompClient(stomp)

    stomp.connect({}, onConnect, onErr)
  }, [])

  const onConnect = () => {
    console.log("websocket connected")
  }
  const onErr = (error) => {
    console.log("errrr", error)
  }
  useEffect(() => {
    if (stomClient && auth.user && currentChat) {

      console.log("subscribing to websocket")
      const subscription = stomClient.subscribe(`/user/${currentChat.id}/private`,
        (payload) => {
          const receivedMessage = JSON.parse(payload.body);
          console.log("message received from websocket", receivedMessage);
          // Only update messages through WebSocket
          setMessages(prev => {
            // Check if message already exists to prevent duplicates
            const messageExists = prev.some(msg => msg.id === receivedMessage.id);

            if (!messageExists) {
              return [...prev, receivedMessage];
            }
            return prev;
          });
        }
      );

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [stomClient, currentChat, auth.user]);

  const sendMessageToServer = (newMessage) => {
    if (stomClient && newMessage) {
      stomClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(newMessage));
    }
  }

  useEffect(()=>{
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[messages])

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <Grid container className='h-screen overflow-y-hidden'>

        <Grid item xs={3} className='px-3 w-[24%] bg-white shadow-lg'>

          <div className='flex h-full justify-between space-x-2'>

            <div className='w-full'>

              <div className='flex space-x-2 items-center py-4 border-b border-gray-200'>
                <IconButton onClick={() => navigate("/")}>
                  <ArrowBackIcon className="text-indigo-600" />
                </IconButton>

                <h1 className='text-xl font-bold text-gray-800'>Messages</h1>

              </div>

              <div className='h-[75vh]'>
                <div className='px-2 py-3'>
                  <SearchUser />
                </div>

                <div className='h-[90%] space-y-2 mt-2 overflow-y-scroll hideScrollBar'>
                  {
                    message.chats.map((item) => {
                      return <div onClick={() => {
                        setCurrentChat(item)
                        setMessages(item.messages)
                      }}>
                        <UserChatCard chat={item} />
                      </div>;

                    })}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={9} className='h-full w-[76%] bg-white shadow-lg'>
          {currentChat ? (
            <div className="h-full flex flex-col">
              <div className='flex justify-between items-center border-b p-5 bg-white'>
                <div className='flex items-center space-x-3'>
                  <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUUELNw45eGJCzwY5LcZzE1muMlUAHL52iQ&s'
                    className="border-2 border-indigo-500" />
                  <p className="font-semibold text-gray-800">
                    {auth.user?.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName
                      : currentChat.users[0].firstName + " " + currentChat.users[0].lastName}
                  </p>
                </div>

                <div className='flex space-x-2'>
                  <IconButton className="hover:bg-indigo-50">
                    <CallIcon className="text-indigo-600" />
                  </IconButton>
                  <IconButton className="hover:bg-indigo-50">
                    <VideoCallIcon className="text-indigo-600" />
                  </IconButton>
                </div>
              </div>

              <div ref={chatContainerRef} className='hideScrollBar h-[70vh] overflow-y-scroll px-4 py-4 space-y-2 bg-gray-50'>
                {messages.map((item) => <ChatMessage item={item} />)}
              </div>

              <div className='sticky bottom-0 border-t bg-white px-6 flex items-center justify-center space-x-3 py-3'>
                {selectedImage && (
                  <img className='w-[5rem] h-[5rem] object-cover rounded-lg shadow-sm'
                    src={selectedImage} alt="" />
                )}

                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleCreateMessage(e.target.value)
                      setSelectedImage("")
                      e.target.value = ""
                    }
                  }}
                  className='bg-gray-50 rounded-full w-[80%] px-5 py-3 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  type="text"
                  placeholder='Type your message...'
                />

                <div>
                  <input type="file" accept='image/*' onChange={handleSelectImage}
                    className='hidden' id='image-input' />
                  <label htmlFor="image-input"
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <AddPhotoAlternateIcon className="text-indigo-600" />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex h-full space-y-1 flex-col justify-center items-center bg-gray-50'>
              <ChatBubbleOutlineIcon sx={{ fontSize: "10rem" }} className="text-gray-300" />
              <p className='text-xl font-semibold text-gray-500'>No chat selected</p>
              <p className='text-gray-400'>Select a conversation to start messaging</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Message