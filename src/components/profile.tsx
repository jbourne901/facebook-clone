import React, {useState} from 'react';
import {Icon} from "react-materialize";
import IUser from "../types/user";
import EditProfile from "./edit-profile";

interface IProps {
    userDetails?: IUser;
}

const Profile = (props: IProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    
    if(editMode && props.userDetails) {
        return (
            <div className="outerBox m10">
                <EditProfile userDetails={props.userDetails} 
                                setViewMode = {() => setEditMode(false)} 
                />
            </div>
        );
    }
    let imgURL = "https://specials-images.forbesimg.com/imageserve/5d2388f14c687b00085c0f91/416x416.jpg?background=000000&cropX1=0&cropX2=1559&cropY1=130&cropY2=1690";
    let detailsText = "Loading ...";
    if(props.userDetails) {
        if(props.userDetails.imageURL) {
            imgURL = props.userDetails.imageURL;
        }
        if(props.userDetails.firstName) {
            detailsText = `${props.userDetails.firstName} ${props.userDetails.lastName}`;
        }
    }
    const details = <div className="profile-details"> 
                        {detailsText} 
                    </div>;
    const img = (
        <div className="profile-outer">
            <div className="profile-img">
                <img src={imgURL} alt="profile" height="100%"/>
            </div>
        </div>
    );
    const edit = (
        <div className="profile-edit">
                <Icon>edit</Icon>
        </div>
    );
    const ctl = (              
        <div className="outerBox m10">
            <div> {img} {details} {edit} </div>
            <div className="profile-about-header-outer">
                <div className="profile-about-header-inner">
                    About me:
                </div>
                <div className="profile-about-body">
                    Software engineer loves to teach CS, Sports: Football,
                    Table tennis, Basketball and Badminton
                </div>
            </div>
        </div>
    );
    return ctl;    
};

export default Profile;