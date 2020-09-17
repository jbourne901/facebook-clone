import React, {useState} from 'react';
import {TextInput, Button, } from "react-materialize";
import signIn from "../api/signIn";

interface IProps {
    switchToSignUp: () => void;
}

const SignIn = (props: IProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const user = await signIn(email, password);
    }
    return (
        <div>            
            <div className="outerBox">
                <h3> Sign In</h3>
                <TextInput label="Email" 
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <TextInput label="Password" password={true} 
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <Button node="button" waves="light" 
                     onClick={(e) => onSignIn(e)}>Sign In</Button>
                <p>&nbsp;&nbsp;Don't have an account?
                    <span className="togglesigninup" onClick={() => props.switchToSignUp()}>&nbsp;&nbsp; Sign Up</span>
                </p>
            </div>

        </div>
    );
}

export default SignIn;