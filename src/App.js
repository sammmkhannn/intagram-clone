
import './App.css';
import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Post from "./Post.js";
import db from "./firebase.js";
import { auth } from "./firebase.js";
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyles] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          //dont update username
        } else {
          //if we juster create a user
          return authUser.updateProfile({
            displayName: username
          })
        }
      } else {
        //user is logged out
        setUser(null);
      }
    })
    return () => {
      //perfom some cleanup actions
      unsubscribe();
    }
  }, [user, username]);
  useEffect(() => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      //everytime a post is added, this will fire an event
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })));
    })
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => {
        alert(err.message);
      })
    setOpen(false);
  }
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenSignIn(false);
  }
  return (      
    <div className="app">
      {
        user?.displayName ? (<ImageUpload username={user.displayName} />) : (
          <h3>Sorry you need to login to upload</h3>
        )
      }
     
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
       
        <div style={modalStyles} className={classes.paper}>
          <form className='app__signup' >
            <center>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBvvRY2qdk21cCDqMgUYXHfcA4T5vaDKSDA&usqp=CAU" alt="" className='app__headerImage' />
              <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type='password'
                vlaue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </center>
          </form>
          
        </div>
        
     
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
       
        <div style={modalStyles} className={classes.paper}>
          <form className='app__signup' >
            <center>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBvvRY2qdk21cCDqMgUYXHfcA4T5vaDKSDA&usqp=CAU" alt="" className='app__headerImage' />
            
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type='password'
                vlaue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </center>
          </form>
          
        </div>
      </Modal>
      <div className='app__header'>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBvvRY2qdk21cCDqMgUYXHfcA4T5vaDKSDA&usqp=CAU" alt="" className='app__headerImage' />
      </div>
      {
        user ? (<Button onClick={() => auth.signOut()}>Logout</Button>) :
          <div className='app__loginContainer'>
            <Button onClick={() => setOpenSignIn(true)}>Sing In</Button>
            <Button onClick={() => setOpen(true)}>Sing Up</Button>
          </div>
      }
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />)
        )
      }
    </div>)
  
  
}

export default App;
