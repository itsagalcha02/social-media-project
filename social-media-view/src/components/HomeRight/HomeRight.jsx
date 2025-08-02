import React from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'

const popularUser = [1, 1, 1, 1, 1]

const HomeRight = () => {
    return (
        <div className='pr-3 pt-3'>
            <SearchUser />
            <Card className='p-3 pt-0 py-1'>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold opacity-70'>Suggestions for you</p>
                    <p className='font-semibold text-xs opacity-90'>View All</p>
                </div>

                <div >
                    {popularUser.map((item) => <PopularUserCard />)}
                </div>
            </Card> 

        </div>

    )
}

export default HomeRight
