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
                <h2 style={{width: "310px", marginLeft: "20px"}}>Фамилия, имя, отчество</h2>
                <h2 style={{width: "160px", marginLeft: "70px"}}>Статус</h2>
                <h2 style={{width: "180px", marginLeft: "60px"}}>Номер телефона</h2>
                <h2 style={{width: "120px", marginLeft: "50px"}}>Ссылка на вк</h2>
                <h2 style={{width: "95px", marginLeft: "50px", marginRight: "10px"}}>Почта</h2>
                <h2>Учебное заведение</h2>
                <h2>Направление</h2>
                <h2 style={{marginLeft: "20px"}}>Курс</h2>
                <h2>Академ. степень</h2>
                <h2>Результаты тестов</h2>
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