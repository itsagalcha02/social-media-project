import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { Avatar, IconButton, TextField } from '@mui/material';
import { useFormik } from "formik";
import CloseIcon from '@mui/icons-material/Close';
import { updateProfileAction } from "../../Redux/Auth/auth.action";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3
};

export default function ProfileModal({ handleClose, open }) {

  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("values ", values)
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: ""
    },
    onSubmit: (values) => {
      console.log("values", values)
      dispatch(updateProfileAction(values))
    }
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-0 mb-4">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>

              <Button type="submit">Save</Button>
            </div>

            <div>
              <div className="h-[15rem]">
                <img className="h-full w-full rounded-t-md object-cover"
                  src="https://wallpapers.com/images/hd/wide-3840-x-1163-background-5nfaut9equv6dgxn.jpg"
                  alt="Img"
                />
              </div>

              <div className='px-5 justify-between flex items-start mt-3 h-[2.5rem]'>
                <Avatar className='transform -translate-y-20'
                  sx={{ width: "6rem", height: "6rem" }}
                  src="https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg" />
              </div>

            </div>

            <div className='space-y-3'>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}

              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>

        </Box>
      </Modal >
    </div >
  );
}
