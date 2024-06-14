import React, {Component} from "react";
import '../Styles/TableRow.css'
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';

const statues = {
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
        return <Link to={'/student/:'+ this.props.student.id} state={{page: "table"}}>
                    <tr className="row">
                        <td className="fio"><h2>{this.props.student.full_name}</h2></td>
                        <td className="status"><h2>{statues[this.props.student.status]}</h2></td>
                        <td className="phone-number"><h2>{this.props.student.phone}</h2></td>
                        <td className="vk-link"><h2>{this.props.student.vk}</h2></td>
                        <td className="email"><h2>{this.props.student.email}</h2></td>
                        <td className="uni"><h2>{this.props.student.university}</h2></td>
                        <td className="direction"><h2>{this.props.student.speciality}</h2></td>
                        <td className="course"><h2>{this.props.student.course}</h2></td>
                        <td className="degree"><h2>{this.props.student.degree}</h2></td>
                        {/* <td><h2 className="results">{this.props.student.is_test_send}</h2></td> */}
                        <td className="results"><h2>...</h2></td>
                    </tr>
                </Link>
    }
}