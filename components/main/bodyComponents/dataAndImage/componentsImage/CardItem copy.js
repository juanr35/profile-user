import { useState, useEffect } from 'react';
import { getProviders, signIn, signOut, useSession, getSession } from 'next-auth/react'
import axios from 'axios'

/** Material UI */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fab from "@mui/material/Fab";
import Button from '@mui/material/Button';


const maxWidth = 250
const maxHeight = 250

export default function CardItem(props) {
  const { data: session, status } = useSession()
  const { name, title, file, setFiles, subheader } = props;

  /**Control menu icon */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFile = () => {
    /*
    setAnchorEl(null);
    setFiles( (files) => {
      return {
        ...files,
        [name]: {
          ...file,
          newFile: null 
        }
      }
    });
    */
    axios({
      url: `${process.env.BACKEND_URL}/api-user/${session.user._id}/files`,
      method: "DELETE",
      data: {
        [name] : file
      },
      headers: {
        'Authorization':`Bearer ${process.env.TOKEN_ACCESS}`
      },
      withCredentials: true,
    })
  }

  /**Control upload files */
  const [preview, setPreview] = useState(null)

  const handleChangeFile = (e) => {

    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    setFiles( (files) => {
      return {
        ...files,
        [e.target.name]: {
          ...file,
          newFile: e.target.files[0] 
        }
      }
    });
    setAnchorEl(null)        
  }

  // If url of image exist, create a preview as a side effect
  useEffect(() => {
    if ( !file?.secure_url && !file?.newFile ) {
      setPreview(null)  
      return
    }
    else if ( file.newFile ) {
      const objectUrl = URL.createObjectURL(file.newFile)
      setPreview(objectUrl)
  
      // Free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }
    else {
      setPreview(file.secure_url)
    }    
  }, [file])
 
  return (
    <>
    <Card 
        elevation={3}
        sx={{  
          width: maxWidth,
        }}
      >
        <CardHeader
            title={title}
            subheader={subheader}
            action={
              preview ? (
                <div>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={deleteFile}>Delete</MenuItem>
                    <MenuItem component="span" >
                      <label htmlFor={`upload-${name}`}>
                        <input
                          style={{ display: "none" }}
                          id={`upload-${name}`}
                          name={name}
                          type="file"
                          onChange={handleChangeFile}
                        />
                          Upload image
                      </label>
                    </MenuItem>
                  </Menu>
                </div>
              ) : null
            }
        />
        {
          preview ? (
            <CardMedia
              component="img"
              image={preview}
              alt={title}
            />         
          ) : (
            <Box 
              align="center"
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: maxWidth,
                height: maxHeight 
              }}
            >
              <Typography variant="h4" component="h1" align='center' gutterBottom>
                Empty
              </Typography>

              <label htmlFor={`upload-${name}`}>
                <input
                  style={{ display: "none" }}
                  id={`upload-${name}`}
                  name={name}
                  type="file"
                  onChange={handleChangeFile}
                />
                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  sx={{ zIndex: 1 }}
                >
                  <AddIcon /> Upload photo
                </Fab>
              </label>
            </Box>
          )
        }
      </Card>
    </>
  );
}