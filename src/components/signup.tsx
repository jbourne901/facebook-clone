import React, {useState} from 'react';
import {TextInput, Button} from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import signUp from '../api/signUp';

interface IProps {
    switchToSignIn: () => void;
}

const SignUp = (props: IProps) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const onSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await signUp(email, password, firstName, lastName);
    }

    return (
        <div className="signup-box">            
            <div className="outerBox">
                <h3> Sign Up</h3>
                <TextInput label="First Name" 
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                <TextInput label="Last Name" 
                    onChange = {(e) => setLastName(e.target.value)}
                />
                <TextInput label="Email" 
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <TextInput label="Password" password={true} 
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <TextInput label="Confirm Password" password={true} 
                    onChange = {(e) => setPassword2(e.target.value)}
                />
                <Button onClick={(e) => onSignUp(e)}>Sign Up</Button>
                <p>Already have an account? 
                    <span className="togglesigninup"  onClick={() => props.switchToSignIn()}>&nbsp;Sign In</span>
                </p>
            </div>

        </div>
    );
}

export default SignUp;