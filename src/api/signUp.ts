import {firebaseApp, userRef} from "../firebase";

const signUp = async (email: string, password: string, firstname: string, lastname: string) => {
    try {
        const user = await firebaseApp.auth()
            .createUserWithEmailAndPassword(email, password)        
        if(user && user.user && user.user.uid) {
            console.log(`Created user ${user.user.uid}`)
            await userRef.child(user.user.uid).set({
                email,
                firstname, 
                lastname
            });
            return true;
        }        
        console.error("Unknown error happened")
    } catch(err) {
        console.error(err);
        return err;
    }              
};

export default signUp;

