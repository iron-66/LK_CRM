import React, {Component} from "react";
import '../Styles/TableRow.css'
import axios from "axios";

const statues = {                             //Статусы студентов
    "new": 'Отправил(а) персональные данные',
    "undone_test": 'Не прошёл(ла) тестирование',
    "done_test": 'Прошёл(ла) тестирование',
    "add_chat": 'Добавлен(а) в организационный чат',
    "start_practice": 'Приступил(а) к практике',
    "finish_practice": 'Завершил(а) прохождение практики',
    "delete_practice":'Удалён(а) с практики',
}

export default class TableRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
                <div className="row">
                    <h2 className="fio">{this.props.student.full_name}</h2>
                    <h2 className="status">{statues[this.props.student.status]}</h2>
                    <h2 className="phone-number">{this.props.student.phone}</h2>
                    <h2 className="vk-link">{this.props.student.vk}</h2>
                    <h2 className="email">{this.props.student.email}</h2>
                    <h2 className="uni">{this.props.student.university}</h2>
                    <h2 className="direction">{this.props.student.speciality}</h2>
                    <h2 className="course">{this.props.student.course}</h2>
                    <h2 className="degree">{this.props.student.degree}</h2>
                    <h2 className="results">{this.props.student.is_test_send}</h2>
                </div>
        </div>
    }
}