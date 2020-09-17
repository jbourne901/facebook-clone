import React from 'react';
import {Container, Navbar, Icon, NavbarOptions, NavItem} from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import {firebaseApp} from "../firebase";
import F from "../assets/f.png";

const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    firebaseApp.auth().signOut();
}
interface IProps {
    isLoggedIn: boolean;
}

const MenuBar = (props: IProps) => {
    const options: NavbarOptions = {
        draggable: true,
        edge: "left",
        inDuration: 250,
        outDuration: 200,
        preventScrolling: true
    };
    const icon = (<Icon>menu</Icon>);

    const brand = (
        <a className="brand-logo menubar-logo"
           href="w">
            <img src={F} alt="Logo" height="40px"/>
        </a>
    );
    return (
        <div className="menubar-div">
            <Container>
                <Navbar menuIcon={icon} brand={brand} options = {options} 
                    className="menubar" alignLinks="right">
                    <NavItem onClick={(e: React.MouseEvent) => onLogout(e)}>Log Out</NavItem>                    
                </Navbar>
            </Container>
        </div>        
    );
}

export default MenuBar;