import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
    return (
        <div>
            <div className='flex flex-col items-center mr-2 cursor-pointer'>
                <Avatar sx={{ width: "4rem", height: "4rem" }}
                    src='https://i.pinimg.com/236x/85/59/09/855909df65727e5c7ba5e11a8c45849a.jpg' >
                </Avatar>
                <p>setan..</p>
            </div>

        </div>
    )
}

export default StoryCircle
