import React, {useState} from 'react';
import {TextInput, Button} from "react-materialize";
import IUser from "../types/user";
import { firebaseApp } from '../firebase';
import uploadImage from '../api/uploadImage';
import saveUserDetails from "../api/saveUserDetails";

interface IProps {
    userDetails: IUser;
    setViewMode: () => void;
}

const Profile = (props: IProps) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [image, setImage] = useState<File|undefined>(undefined);

    const onGoBack = () => {
        props.setViewMode();
    };
    const onSubmit = async () => {
        const uid = firebaseApp.auth().currentUser?.uid;
        if(!uid) {
            throw Error("User is not logged in");
        }
        const updatedDetails: IUser = {
            firstName, 
            lastName,
            email: props.userDetails.email,
            imageURL: ""
        };
        try {
            if(image) {
                updatedDetails.imageURL = await uploadImage(image);
                if(!updatedDetails.imageURL) {
                    throw Error("Upload image failed");
                }    
            }                        
            saveUserDetails(uid, updatedDetails);
        } catch(err) {
            console.error(err);
            throw err;
        }

    }
    let img;
    if(image) {
        const url = URL.createObjectURL(image);
        img = <img src={url} alt="profile pic" height="40px"/>;
    }

    const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target && e.target.files && e.target.files.length>0) {
            const file = await e.target.files[0];
            setImage(file);
        }
    }

    return (
        <div>
            <div onClick={() => onGoBack()}>
                {img}
                <input type="file" onChange={(e)=>onUploadImage(e)} />
            </div>
            <TextInput label="First Name" value={firstName} 
                onChange = {(e) => setFirstName(e.target.value)} 
            />
            <TextInput label="Last Name" value={firstName} 
                onChange = {(e) => setLastName(e.target.value)} 
            />
            <Button onClick={() => onSubmit()}>Submit</Button>
        </div>
    )
};

export default Profile;
