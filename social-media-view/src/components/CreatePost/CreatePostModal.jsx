import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { createPostAction } from '../../Redux/Post/post.action';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '.6rem',
    outlined: "none",
};

const CreatePostModal = ({ handleClose, open }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();

    const handleSelectImage = async (event) => {
        setIsloading(true);
        const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imgUrl);
        setIsloading(false);
        formik.setFieldValue("image", imgUrl);

    };

    const handleSelectVideo = async (event) => {

        setIsloading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsloading(false);
        formik.setFieldValue("video", videoUrl);
    };

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: "",
        },

        onSubmit: (values) => {
            console.log("Form values:", values);
            dispatch(createPostAction(values))
        },
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit} >
                        <div className="">

                            <div className="flex space-x-4 items-center">
                                <Avatar />
                                <div>
                                    <p className="font-bold text-md">suryanshu</p>
                                    <p className="text-sm">@Agalcha</p>
                                </div>
                            </div>

                            <textarea
                                rows={3}
                                placeholder="Write caption..."
                                className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054]"
                                type="text"
                                name="caption"
                                value={formik.values.caption}
                                onChange={formik.handleChange}
                            />

                            <div className="flex space-x-4 items-center mt-4">
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleSelectImage}
                                        style={{ display: "none" }}
                                        id="image-input"
                                    />
                                    <label htmlFor="image-input">
                                        <IconButton color="primary" component="span">
                                            <ImageIcon />
                                        </IconButton>
                                    </label>
                                    <span>Image</span>
                                </div>

                                <div>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleSelectVideo}
                                        style={{ display: "none" }}
                                        id="video-input"
                                    />
                                    <label htmlFor="video-input">
                                        <IconButton color="primary" component="span">
                                            <VideocamIcon />
                                        </IconButton>
                                    </label>
                                    <span>Video</span>
                                </div>
                            </div>

                            {selectedImage && (
                                <div>
                                    <img className="h-[8rem]" src={selectedImage} alt="" />
                                </div>
                            )}

                            <div className="flex w-full justify-end">
                                <Button
                                    sx={{ borderRadius: "1.5rem" }}
                                    variant="contained"
                                    type="submit">
                                    Post
                                </Button>
                            </div>
                        </div>
                    </form>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    )
}

export default CreatePostModal