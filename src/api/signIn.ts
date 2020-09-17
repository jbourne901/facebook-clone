import {firebaseApp, userRef} from "../firebase";
import IUser from "../types/user";

const signIn = async (email: string, password: string) => {
    try {
        const user = await firebaseApp.auth()
            .signInWithEmailAndPassword(email, password)
        if(user && user.user && user.user.uid) {
            let userData: IUser | undefined;
            await userRef.child(user.user.uid)
                             .once("value", (data) => {userData = data.val()});
            if(userData) {
                console.log(`Signed in as user ${user.user?.uid}`)
                console.dir(userData)
                userData.uid = user.user.uid;
                return userData;
            }
        }
        throw Error("Unknown error happened");
    } catch(err) {
        console.error(err);
        throw err;
    }              
};

export default signIn;