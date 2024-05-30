import React, {Component} from "react";
import '../Styles/TableRow.css'
import axios from "axios";

export default class TableRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
                <div className="row">
                    <h2 className="fio">Сантонов Александр Петрович</h2>
                    <h2 className="status">Отправил(а) персональные данные</h2>
                    <h2 className="phone-number">+79888888888</h2>
                    <h2 className="vk-link">https://vk...</h2>
                    <h2 className="email">Smart.ek0...</h2>
                    <h2 className="uni">Уральски...</h2>
                    <h2 className="direction">Прикладная информатика</h2>
                    <h2 className="course">4</h2>
                    <h2 className="degree">Специалитет</h2>
                    <h2 className="results">Подробнее...</h2>
                </div>
        </div>
    }
}