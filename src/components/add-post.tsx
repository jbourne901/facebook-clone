import React, {useState} from 'react';
import {Textarea, Row, Button} from "react-materialize";
import {firebaseApp} from "../firebase";
import addPost from "../api/addPost";

const AddPost = () => {
    const [content, setContent] = useState<string>("");

    const onAddPost = async () => {
        if(!content || content.length>120) {
            return;
        }
        const uid = firebaseApp.auth().currentUser?.uid;
        if(!uid) {
            console.error("User is not logged in");
            return;
        }
        try {
            await addPost(uid, content);
            setContent("");
            console.log("Post added");
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="outerBox m10">
                <h6 className="add-post-header">What's on your mind?</h6>
                <Row className="add-post-tarow">
                    <Textarea value={content} s={12}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setContent(e.target.value)}
                        className="add-post-ta"
                        placeholder="Please write here"
                        data-length={120}                        
                    />                    
                </Row>
                <div className="add-post-buttonrow">
                    <Button onClick={() => onAddPost()}
                        className="add-post-button"
                        small waves="light" 
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default AddPost;
