import {storageRef} from "../firebase";

const uploadImage = async (file: File) => {
    if(!file) {
        return;
    }
    const onNext = () => {};
    const onError = (err: any) => {console.error(err)};
    let imageURL;
    const onComplete = async () => {
        console.log("getting URL");
        try {
            imageURL = await uploadTask.snapshot.ref.getDownloadURL();
        } catch(err) {
            console.error(err);
            throw err;
        }
    };
    const uploadTask = storageRef.ref(`image/${file.name}`).put(file);
    uploadTask.on("state_changed", onNext, onError, onComplete);
    return imageURL;
};
export default uploadImage;
