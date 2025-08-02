import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';

const PostCard = ({ item }) => {

    const dispatch = useDispatch();
    const { auth, post } = useSelector(store => store)
    const [showComments, setShowComments] = useState(false);
    const handleShowComment = () => setShowComments(!showComments);

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData))
    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.id))
    }

    return (

        <Card className='' sx={{ w: "100% " }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        S
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user?.firstName + " " + item.user?.lastName}
                subheader={"@" + item.user?.firstName.toLowerCase() + "_" + item.user?.lastName.toLowerCase()}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="shinchan cartoon"
            /> */}
            <img src={item.image} alt="" className='w-full max-h-[25rem] object-cover' />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        {<ShareIcon />}
                    </IconButton>

                    <IconButton onClick={handleShowComment}>
                        {<ChatBubbleIcon />}
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && <section>
                <div className='flex items-center space-x-3 mx-6 my-4'>

                    <Avatar sx={{}} />
                    <input type="text" onKeyPress={(e) => {

                        if (e.key === "Enter") {
                            handleCreateComment(e.target.value)
                            console.log("enter pressed..", e.target.value)
                        }
                    }}
                        className='w-full outline-none bg-transparent border border-[#3b4050] rounded-full px-5 py-2' placeholder='write your comment....' />

                </div>
                <Divider />

                <div className='mx-4 space-y-1 my-3 text-xs'>

                    {item.comments.map((comment) => <div className='flex items-center space-x-3'>
                        <Avatar sx={{ height: "1.8rem", width: "1.8rem", fontSize: "0.6rem" }}>
                            {comment.user?.firstName[0]}
                        </Avatar>
                        <p>{comment.content}</p>
                    </div>)}

                </div>
            </section>}
        </Card>
    )
}

export default PostCard
