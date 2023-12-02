import React, {Component} from "react";

import '../Styles/CardInfo.css'
import backArrowIcon from '../Files/BackArrowIcon.svg'

const form = {
    "fullname:": "ФИО:",
    "education" : "Учебное заведение:",
    "speciality" : "Специальность/направление:",
    "degree": "Академическая степень:",
    "phone": "Номер телефона:",
    "telegram": "Telegram тег:",
    "vk": "Vk id:",
    "email": "Email:",

}

class CardInfo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className="card-container">
            <div className="card-field">
                <section className="card-header">
                    <img className="card-backicon" src={backArrowIcon}></img>
                    <h2 className="card-title">Информация о практиканте</h2>
                </section>
                <section className="card-information">
                    {Object.keys(form).map(key => (
                        <div>
                            <p>{form[key]}</p>
                            <p className="info" id={key}>Заглушка</p>
                        </div>
                    ))}
                    <div className="flex-box">
                        <div>
                            <p>О себе:</p>
                            <p className="about-me"></p>
                        </div>
                        <div className="flex-box center vertical">
                            <div className="flex-box vertical test-info">
                                <p>Результаты тестирования практиканта</p>
                                <p className="info">34/40</p>
                            </div>
                            <div className="flex-box">
                                <button className="card-button">Отклонить</button>
                                <button className="card-button">Принять</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}

export default CardInfo