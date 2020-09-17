import {postRef} from "../firebase";

const deletePost = async (postKey: string) => {
    try {
        const data = await postRef.child(postKey).remove();
        console.log(`Removed post `)
        console.dir(data)
    } catch(err) {
        console.error(err);
        throw(err);
    }              
};

export default deletePost;