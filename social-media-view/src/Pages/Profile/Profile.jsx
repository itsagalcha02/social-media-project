import React from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import PostCard from '../../components/Post/PostCard'
import UserReelCard from '../../components/Reels/UserReelCard'
import { useSelector } from 'react-redux'
import ProfileModal from "./ProfileModal";

const tabs = [
    { value: "post", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "repost", name: "RePost" },
]
const post = [1, 1, 1, 1, 1]
const reels = [1, 1, 1, 1]
const savedPost = [1, 1]
const Profile = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { auth, post } = useSelector(store => store)
    const { id } = useParams()
    const [value, setValue] = React.useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card className='my-2 w-[40rem] ml-20 p-4'>

            <div className='rounded-md'>

                <div className='h-[15rem]'>
                    <img className='h-full w-full rounded-t-md object-cover'
                        src="https://wallpapers.com/images/hd/wide-3840-x-1163-background-5nfaut9equv6dgxn.jpg" alt="" />
                </div>

                <div className='px-5 justify-between flex items-start mt-3 h-[2.5rem]'>

                    <Avatar className='transform -translate-y-20'
                        sx={{ width: "7rem", height: "7rem" }}
                        src="https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg" />

                    {true ? <Button onClick={handleOpenProfileModal} sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button> : <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>}

                </div>
                <div className='p-3'>

                    <div>
                        <h1 className='py-1 font-bold text-md'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
                        <p>{"@" + auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
                    </div>

                    <div className='flex gap-4 items-center py-1'>
                        <span>32 posts</span>
                        <span>40 followers</span>
                        <span>12 followings</span>
                    </div>

                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab reprehend </p>
                    </div>
                </div>

                <section>
                    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            {tabs.map((item) => <Tab value={item.value} label={item.name} />)}
                        </Tabs>
                    </Box>

                    <div className='flex justify-center'>

                        {value === "post" ? (
                            <div className='space-y-5 w-[80%] my-5'>

                                {post.posts.map((item) => (<div className='border rounded-md border-slate-100'>
                                    <PostCard item={item} />
                                </div>))}

                            </div>
                        ) :
                            value === "reels" ? <div className='flex gap-5 flex-wrap justify-center my-5 '>

                                {reels.map((reel) => (<UserReelCard />))}
                            </div>
                                : value === "saved" ? <div className='space-y-5 w-[80%] my-5'>

                                    {savedPost.map((item) => (<div className='border rounded-md border-slate-100'>
                                        <PostCard />
                                    </div>))}

                                </div> : (
                                    <div>Repost</div>)}
                    </div>
                </section>
            </div>
            <section>
                <ProfileModal open={open} handleClose={handleClose} />
            </section>
        </Card>

    )
}

export default Profile
