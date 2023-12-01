import React, {Component} from "react";
import '../Styles/MainPage.css'

import SettingsIcon from "../Files/SettingsIcon.svg"
import CardList from './CardList'

const statues = ['Отправил(а) персональные данные', 
    'Не прошёл(ла) тестирование', 
    'Прошёл(ла) тестирование', 
    'Добавлен(а) в организационный чат', 
    'Приступил(а) к практике', 
    'Завершил(а) прохождение практики',
    'Удалён(а) с практики']

class MainPage extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return <div>
                <div className="container">
                    <img className="settings-icon" src={SettingsIcon}/>
                    <h2 className="header-name">Главная страница</h2>
                    <button className="forms-button">К формам и тестам</button>
                </div>
                <ul className="status-columns">
                    {statues.map(status => (
                        <CardList name={status}></CardList>
                    ))}
                </ul>
        </div>
        
    }
}

export default MainPage