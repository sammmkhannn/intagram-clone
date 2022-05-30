import React,{useState} from 'react'
import { Button, Input } from "@material-ui/core";
import db,{ storage } from "./firebase.js";
import firebase from 'firebase/compat/app';
import "firebase/storage";

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState();


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        const updloadTask = storage.ref(`images/${image.name}`).put(image);
        updloadTask.on("state_changed",
            (snapshot) => {
            //progress function...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes * 100));
                setProgress(progress);                
            }, (error) => {
                //error function...
                console.log(error); 
                alert(error.message);
        }, () => {
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timeStamp: firebase.firestore.fieldValue.setServerTimeStamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
        })

    }


    return (
        <div>
            <progress  value={progress} max="100"/>
         <Input type='text' placeholder='Enter a caption...' onChange={(e) => setCaption(e.target.value)} value={caption} />
          <Input type='file' onChange={handleChange}/>
          <Button className="imageupload__button" onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload