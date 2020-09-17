import {userRef} from "../firebase";
import IUser from "../types/user";

const saveUserDetails = (uid: string, user: IUser) => {
    userRef.child(uid).set(user);
};

export default saveUserDetails;