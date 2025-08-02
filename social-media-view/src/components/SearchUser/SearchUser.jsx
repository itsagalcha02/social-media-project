import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {

  const [username, setUserName] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector(store => store)

  const handleSearchUser = (e) => {

    setUserName(e.target.value)
    console.log("search user...")
    dispatch(searchUser(username))
  }

  const handleClick = (id) => {
    dispatch(createChat({ userId: id }))
  }

  return (
    <div>

      <div className='py-3 relative'>

        <input className='bg-transparent border border-[#304554] outline-none w-full px-4 py-1 rounded-full'
          type="text" placeholder='search user...' onChange={handleSearchUser} />

        {
          username && (
            auth.searchUser.map((item) => <Card key={item.id} className='absolute z-10 top-[3rem] cursor-pointer w-full'>

              <CardHeader onClick={() => {
                handleClick(item.id);
                setUserName("")
              }}

                avatar={<Avatar
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc0VGkMpHxPP-jRj6-jaGZUINhk1mD36PkEw&s' />}

                title={item.firstName + " " + item.lastName}
                subheader={item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}
              />

            </Card>)
          )}

      </div>
    </div>
  )
}

export default SearchUser
