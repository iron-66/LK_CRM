import React, {Component} from "react";
import { useParams } from "react-router-dom";

import '../Styles/CardInfo.css'
import backArrowIcon from '../Files/BackArrowIcon.svg'
import { Link } from "react-router-dom";
import axios from "axios";


// По факту этот объект это все айдишники полей, куда надо вписывать поля. [id объекта]: [Название поля]
const form = {
    "full_name": "ФИО:",
    "university": "Учебное заведение:",
    "speciality": "Специальность/направление:",
    "degree": "Академическая степень:",
    "course": "Курс:",
    "phone": "Номер телефона:",
    "telegram": "Telegram тег:",
    "vk": "Vk id:",
    "email": "Email:",
    //test-result: Результаты тестирования

}

function withParams(Component){
    return props => <Component {...props} params={useParams()} />;
}

class CardInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            studInfo: {}
        }
    }

    async componentDidMount(){
        const id = this.props.params.studentId.slice(1)
        await axios(`http://158.160.137.207:8000/get-info/${id}/`)
        .then(response => {this.setState({
                studInfo: response.data
            })
        })
    }
    
    render(){
        return <div className="card-container">
            <div className="card-field">
                <section className="card-header">
                    <Link to='/'><img className="card-backicon" src={backArrowIcon}/></Link>
                    <h2 className="card-title">Информация о практиканте</h2>
                </section>
                <section className="card-information">
                    {Object.keys(form).map(key => (
                        <div className={"div-"+key}>
                            <p>{form[key]}</p>
                            <p className="info" id={key}>{this.state.studInfo[key]}</p>
                        </div>
                    ))}
                    <div className="flex-box div-about-me">
                        <div>
                            <p>О себе:</p>
                            <p className="about-me"></p>
                        </div>
                        <div className="flex-box center vertical">
                            <div className="flex-box vertical test-info">
                                <p>Результаты тестирования практиканта</p>
                                <p className="info" id="test-result">34/40</p>
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

export default withParams(CardInfo)