import React from 'react';
import {Container, Row, Col} from "react-materialize";
import Profile from "./profile";
import IUser from "../types/user";
import AddPost from "./add-post";
import PostList from "./post-list";

interface IProps {
    userDetails?: IUser;
    myUID: string;
}

const Feed = (props: IProps) => {
    return (
        <Container>
            <Row>
                <Col className="teal" s={12} m={4}>
                    <Profile userDetails={props.userDetails}/>
                </Col>
                <Col className="red" s={12} m={8}>
                    <AddPost />
                    <PostList myUID={props.myUID}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Feed;