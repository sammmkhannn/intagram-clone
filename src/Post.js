import React from 'react'
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
function Post({username,caption,imageUrl}) {
  return (
    <div className='post'>
      <div className='post__header'>
      <Avatar
        className='post__avatar'
        alt={username}
        src = "https://images.unsplash.com/photo-1536896407451-6e3dd976edd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      />
        <h3>Username</h3>
      </div>
          {/* avatar */}
          <img className='post__image' src ={imageUrl} alt="user profile" />
          {/*image*/}

      <h4 className='post__text'><strong>{username}</strong>{caption}</h4>
          {/* username  + caption*/}
    </div>
  )
}

export default Post