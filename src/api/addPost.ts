import {postRef} from "../firebase";
import IPost from "../types/post";

const addPost = async (uid: string, content: string) => {
    try {
        const p: IPost = { createdBy: uid, content, createdAt: new Date().toLocaleDateString() };
        await postRef.push(p);
        console.log(`Added post ${content}`)
    } catch(err) {
        console.error(err);
        throw(err);
    }              
};

export default addPost;