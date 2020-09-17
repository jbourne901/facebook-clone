import {postRef} from "../firebase";
import IPost from "../types/post";

const listPosts = async (uid: string) => {
    let posts: IPost[] = [];
    try {        
        await postRef.on("value", (data) => {
            data.forEach( (pp) => {
                const p: IPost = {...pp.val(), postKey: pp.key};
                posts.push(p);
            });
            posts.reverse();
        });
        return posts;        
    } catch(err) {
        console.error(err);
        return err;
    }              
};

export default listPosts;