import React, {Component} from "react";
import { useParams } from "react-router-dom";

import '../Styles/CardInfo.css'
import backArrowIcon from '../Files/BackArrowIcon.svg'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
    "status": "Статус:"
    //test-result: Результаты тестирования

}

const statues = {                             //Статусы студентов
    "new": 'Отправил(а) персональные данные',
    "undone_test": 'Не прошёл(ла) тестирование',
    "done_test": 'Прошёл(ла) тестирование',
    "add_chat": 'Добавлен(а) в организационный чат',
    "start_practice": 'Приступил(а) к практике',
    "finish_practice": 'Завершил(а) прохождение практики',
    "delete_practice":'Удалён(а) с практики',
}

function withParams(Component){
    return props => <Component {...props} params={useParams()} location={useLocation()} />;
}

// Карточка студента
class CardInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            studInfo: {},
            page: ""
        }
    }

    async componentDidMount(){
        const id = this.props.params.studentId.slice(1)
        this.setState({
            page: this.props.location.state.page
        })
        await axios(`http://158.160.165.203:8000/get-info/${id}/`) // http://crm.studprzi.beget.tech/get-info/${id}/ http://158.160.171.6:8000/get-info/${id}/
        .then(response => {this.setState({
                studInfo: response.data
            })
        })
    }

    // http://158.160.165.203:8000/update-status/
    updateStatus = async (e) => {

        console.log([this.state.studInfo.id, e.target.value].join("&"))
        
        await axios.patch(`http://158.160.165.203:8000/update-status/${[this.state.studInfo.id, e.target.value].join("&")}/`)
        .then(response => {
            console.log(response.data)
        })
        
        await axios(`http://158.160.165.203:8000/get-info/${this.state.studInfo.id}/`)
        .then(response => {this.setState({
            studInfo: response.data
        })})
    }
    
    render(){
        return <div className="card-container">
            <div className="card-field">
                <section className="card-header">
                    <Link to={'/'+ this.state.page}><img className="card-backicon" src={backArrowIcon}/></Link>
                    <h2 className="card-title">Информация о практиканте</h2>
                </section>
                <section className="card-information">
                    {Object.keys(form).map(key => (
                        <div className={"div-"+key}>
                            <p>{form[key]}</p>
                            <p className="info" id={key}>{key == "status" ? statues[this.state.studInfo[key]] : this.state.studInfo[key]}</p>
                        </div>
                    ))}
                    <div className="stud-test-results">
                        <select className="change-status-btn" onChange={this.updateStatus}>
                            {/* <option selected value={"default"}>Сменить статус</option> */}
                            {Object.keys(statues).map(key => (
                                this.state.studInfo.status == key ? <option selected value={key}>{statues[key]}</option> : <option value={key}>{statues[key]}</option>
                                // <option value={key}>{statues[key]}</option>
                            ))}
                        </select>
                        <h2 className="text">Результаты тестирования практиканта</h2>
                        <h2 className="info" id="test-result">34/40</h2>
                        <div className="flex-box">
                            <button className="deny-button">Отклонить</button>
                            <button className="card-button">Принять</button>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    }
}

export default withParams(CardInfo)