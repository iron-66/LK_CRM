import React, {Component} from "react";
import '../Styles/MainPage.css'

import SettingsIcon from "../Files/SettingsIcon.svg"
import CardList from './CardList'

const statues = {
    "send_data": 'Отправил(а) персональные данные',
    "undone_test": 'Не прошёл(ла) тестирование',
    "done_test": 'Прошёл(ла) тестирование',
    "add_chat": 'Добавлен(а) в организационный чат',
    "start_practice": 'Приступил(а) к практике',
    "finish_practice": 'Завершил(а) прохождение практики',
    "delete_practice":'Удалён(а) с практики',
}

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            isVisible: false
        }
    }

    ChangeVisibility = () => {
        this.setState((state) => {
            return {isVisible: !state.isVisible}
        })
    }

    render() {
        return <div>
                <div className="container">
                    <img 
                        className="settings-icon" 
                        src={SettingsIcon} 
                        onClick={this.ChangeVisibility}
                    />
                    <h2 className="header-name">Главная страница</h2>
                    <button className="forms-button">К формам и тестам</button>
                </div>
                <ul className="status-columns">
                    {Object.keys(statues).map(key => (
                        <CardList name={statues[key]} isVisible={this.state.isVisible} cardListId={key}></CardList>
                    ))}
                </ul>
        </div>
        
    }
}

export default MainPage