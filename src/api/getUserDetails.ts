import {userRef} from "../firebase";
import IUser from "../types/user";

const getUserDetails = async (uid: string) => {
    const user: IUser = {firstName: "", lastName: "", email: "", uid, imageURL: ""};
    try {        
        await userRef.child(uid).once("value", (data) => {
            const u: IUser = data.val();
            user.firstName = u.firstName;
            user.lastName = u.lastName;
            user.email = u.email;
            user.imageURL = u.imageURL;
        });
        return user;
    } catch(err) {
        console.error(err);
        throw(err);
    }              
};

export default getUserDetails;