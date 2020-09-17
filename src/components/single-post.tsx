import React, {useState, useEffect} from 'react';
import {Dropdown, Icon, Button, DropdownOptions} from "react-materialize";
import moment from "moment";
import IPost from '../types/post';
import getUserDetails from "../api/getUserDetails";
import deletePost from "../api/deletePost";


interface IProps {
    post: IPost;
    myUID: string;
}

const SinglePost = (props: IProps) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");

    const fetchData = async () => {
        try {
            const u = await getUserDetails(props.post.createdBy);
            setFirstName(u.firstName);
            setLastName(u.lastName);
            if(u.imageURL) {
                setImageURL(u.imageURL);
            }            
        } catch(err) {
            console.error(err);
        }        
    };

    useEffect( () => {
        if(props.post.createdBy) {
            fetchData();
        }        
    });

    const onPostDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(props.post && props.post.postKey) {
            try {
                await deletePost(props.post.postKey);
            } catch(err) {
                console.error(err);
            }
        }        
    };

    const onPostEdit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        console.error("Not implemented");
    };

    const imgURL = imageURL || "https://specials-images.forbesimg.com/imageserve/5d2388f14c687b00085c0f91/416x416.jpg?background=000000&cropX1=0&cropX2=1559&cropY1=130&cropY2=1690";

    const img = (
        <div className="post-img-outer">
            <div className="post-img-inner">
                <img src={imgURL} alt="profile photi"/>
            </div>
        </div>
    );

    const userInfo = (
        <div className="post-userinfo-outer">
            <div className="post-userinfo-inner">
                {firstName} {lastName}
            </div>
            <div className="post-createdat">
                {moment(props.post.createdAt).fromNow()}  
            </div>
        </div>
    );

    const op: DropdownOptions = {
        alignment: "left",
        autoTrigger: true,
        closeOnClick: true,
        constrainWidth: true,
        coverTrigger: true,
        hover: false,
        inDuration: 150,
        outDuration: 250
    };

    const trg = (
        <Button flat node="button">
            <Icon>more_vert</Icon>
        </Button>
    );
    const postActions = (
        <div>
            <Dropdown options={op} trigger={trg}>
                <a onClick={(e)=>onPostEdit(e)} href="w" className="post-action">
                    Edit
                </a>
                <a onClick={(e)=>onPostDelete(e)} href="w" className="post-action">
                    Delete
                </a>
            </Dropdown>
        </div>
    )

    return (
        <div>
            <div className="outerBox m10">
                <div>
                    <div>
                        {img}
                        {userInfo}
                        {props.myUID===props.post.createdBy && postActions}
                    </div>
                </div>
                <div>{props.post && props.post.content ? props.post.content : ""}</div>
            </div>
        </div>
    );
};

export default SinglePost;
