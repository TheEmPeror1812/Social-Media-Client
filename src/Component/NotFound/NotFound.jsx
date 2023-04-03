import { ErrorOutline } from '@mui/icons-material'
import "./NotFound.css"
import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notFound">
        <div className="notFoundContainer">
            <ErrorOutline />
            <Typography variant='h2' style={{padding:"2vmax"}}>Page Not Found</Typography>
            <Link to={"/"}><Typography variant='h5'>GO TO HOME</Typography></Link>
        </div>
    </div>
  )
}

export default NotFound