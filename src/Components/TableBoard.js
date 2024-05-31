import React, {Component} from "react";
import '../Styles/TableBoard.css'
import axios from "axios";

import TableRow from "./TableRow";

export default class TableBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentsData: []
        }
    }

    async componentDidMount(){
        await axios("http://crm.studprzi.beget.tech/get-students/")
        .then(response => {this.setState({
            studentsData: response.data
        })})
    }

    render() {
        return <div>
            <div className="container">
                <button className="sort-button">Отсортировать</button>
                <input type="search" placeholder="Поиск по странице" className="search-input"></input>
                <button className="export-button">Экспортировать</button>
                <button className="to-kanban-button">Канбан</button>
            </div>
            <div className="table-header">
                <h2 className="th-fio">Фамилия, имя, отчество</h2>
                <h2 className="th-status">Статус</h2>
                <h2 className="th-phone-number">Номер телефона</h2>
                <h2 className="th-vk-link">Ссылка на вк</h2>
                <h2 className="th-email">Почта</h2>
                <h2 className="th-uni">Учебное заведение</h2>
                <h2 className="th-direction">Направление</h2>
                <h2 className="th-course">Курс</h2>
                <h2 className="th-degree">Академ. степень</h2>
                <h2 className="th-results">Результаты тестов</h2>
            </div>
            <ul className="table-list">
            {       
                    this.state.studentsData.map(human => (
                        <TableRow student={human}></TableRow>
                    ))
                }
            </ul>
        </div>
    }
}