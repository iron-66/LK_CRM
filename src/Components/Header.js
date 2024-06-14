import React, {Component} from "react";
import '../Styles/Header.css'

import sideBar from '../Files/Sidebar.svg'
import logo from '../Files/Logo.png'
import menu from '../Files/Menu.svg'
import avatar from '../Files/Avatar.svg'

class Header extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return <div className="header">
            <img className="sidebar_icon" src={sideBar}/>
            <img className="logo" src={logo}/>
            <a className="projects">
                <img className="menu_icon" src={menu}/>
                <h1>Проекты</h1>
            </a>
            <a className="profile">
                <img className="avatar_icon" src={avatar}/>
                <h1>Профиль</h1>
            </a>
        </div>
    }
}

export default Header