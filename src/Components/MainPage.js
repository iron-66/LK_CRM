import React, {Component} from "react";
import '../Styles/MainPage.css'

import SettingsIcon from "../Files/SettingsIcon.svg"

class MainPage extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return <div className="container">
                <img src={SettingsIcon}/>
                <h2 className="header-name">Главная страница</h2>
                <button className="forms-button">К формам и тестам</button>
            </div>
    }
}

export default MainPage