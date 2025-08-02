import React, { useEffect, useState } from 'react'
import { Avatar, Card, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';

const story = [1, 1, 1, 1, 1, 1]
const posts = [1, 1, 1, 1, 1]

const MiddlePart = () => {

    const dispatch = useDispatch();
    const { post } = useSelector(store => store);
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

    const handleOpenCreatePostModal = () => {
        setOpenCreatePostModal(true);
        console.log("open post modal...", openCreatePostModal)
    }

    useEffect(() => {
        dispatch(getAllPostAction())
    }, [post.newComment])

    return (
        <div className='px-5 w-min'>

            <section className='flex items-center p-4 rounded-b-md'>

                <div className='flex flex-col items-center mr-2 cursor-pointer'>
                    <Avatar sx={{ width: "4rem", height: "4rem" }} >
                        <AddIcon sx={{ width: "2.7rem", height: "2.7rem" }} />
                    </Avatar>
                    <p>New</p>
                </div>

                {story.map((item) => <StoryCircle />)}
            </section>

            <Card className='p-4 mt-4'>
                <div className='flex justify-between'>
                    <Avatar />
                    <input
                        onClick={handleOpenCreatePostModal} readOnly
                        className='outline-none w-[90%] rounded-full bg-transparent px-5 border-[#3b4054] border cursor-pointer'
                        type="text"

                    />
                </div>
                <div className='flex justify-center space-x-7 mt-4'>

                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                            <ImageIcon />
                        </IconButton>
                        <span>media</span>
                    </div>

                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                            <VideocamIcon />
                        </IconButton>
                        <span>video</span>
                    </div>

                    <div className='flex items-center'>
                        <IconButton color='primary' onClick={handleOpenCreatePostModal}>
                            <ArticleIcon />
                        </IconButton>
                        <span>Write Article</span>
                    </div>
                </div>
            </Card>

            <div className='mt-2 space-y-2'>
                {post.posts.map((item) => <PostCard item={item} />)}
            </div>

            <div>
                <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
            </div>

        </div>
    )
}

export default MiddlePart
