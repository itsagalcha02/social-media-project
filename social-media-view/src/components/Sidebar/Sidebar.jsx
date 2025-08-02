import React from 'react'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const { auth } = useSelector(store => store)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (item) => {
        if (item.title === "Profile") {
            navigate(`/profile/${auth.user?.id}`)
        }
        else {
            navigate(`${item.path}`)
        }
    }

    return (
        <Card className=' flex flex-col justify-between py-4 px-2 h-[93vh] w-full'>

            <div className='space-y-6 pl-5'>

                <div className=''>
                    <span className='logo font-bold text-xl'>Social Media</span>
                </div>

                <div className='space-y-6'>

                    {navigationMenu.map((item) => <div onClick={() => handleNavigate(item)}
                        className='flex items-center space-x-3 cursor-pointer'>
                        {item.icon}
                        <p className='text-xl'>{item.title}</p>
                    </div>)}
                </div>

            </div>

            <div>
                <Divider />
                <div className='flex items-center pl-2 justify-between pt-4'>

                    <div className='flex items-center space-x-2 mr-2 '>
                        <Avatar src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg' />

                        <div>
                            <p className='font-bold'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
                            <p className='opacity-55 text-sm'>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
                        </div>
                    </div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>

        </Card>
    )
}

export default Sidebar
