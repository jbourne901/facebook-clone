import React, {useState, useEffect} from 'react';
import listPosts from "../api/listPosts";
import IPost from "../types/post";
import SinglePost from "./single-post";

interface IProps {
    myUID: string;
}

const PostList = (props: IProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    
    useEffect( () => {
        const fetchData = async () => {
            try {
                const posts = await listPosts(props.myUID);
                setPosts(posts);
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, [props.myUID]);

    return (
        <div>
            {posts.map( p => (
                <SinglePost key={p.postKey} post={p} myUID={props.myUID} />
            ))}
        </div>
    );
};

export default PostList;


