import React, {Component} from "react";
import '../Styles/TableBoard.css'
import axios from "axios";
import TableRow from "./TableRow";

const statues = {                             //Статусы студентов
    "new": 'Отправил(а) персональные данные',
    "undone_test": 'Не прошёл(ла) тестирование',
    "done_test": 'Прошёл(ла) тестирование',
    "add_chat": 'Добавлен(а) в организационный чат',
    "start_practice": 'Приступил(а) к практике',
    "finish_practice": 'Завершил(а) прохождение практики',
    "delete_practice":'Удалён(а) с практики',
}

export default class TableBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentsData: [],
            filteredStudentsData: []
        }
    }

    async componentDidMount(){
        await axios("http://crm.studprzi.beget.tech/get-students/") //http://crm.studprzi.beget.tech/get-students/ http://158.160.171.6:8000/get-students/
        .then(response => {this.setState({
            studentsData: response.data,
            filteredStudentsData: response.data
        })})
    }

    handleExport = async () => {
        try {
            const response = await axios.get("http://158.160.171.6:8000/export-students-xlsx/", {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'students.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error during exporting XLSX file", error);
        }
    }

    handleKanban = () => {
        window.location.href = '/';
    }

    filterByStatus = (e) => {
        if (e.target.value !== "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.status === e.target.value)
            })
        } else {
            this.setState({
                filteredStudentsData: this.state.studentsData
            })
        }
        console.log(this.state.filteredStudentsData)
    }

    filterByCourse = (e) => {
        if (e.target.value !== "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.course === e.target.value)
            })
        } else {
            this.setState({
                filteredStudentsData: this.state.studentsData
            })
        }
        console.log(this.state.filteredStudentsData)
    }

    render() {
        return <div>
            <div className="container">
                <select className="filter-by-status" onChange={this.filterByStatus}>
                    <option selected value={"default"}>По статусу</option>
                    {Object.keys(statues).map(key => (
                        <option value={key}>{statues[key]}</option>
                    ))}
                </select>
                <select className="filter-by-course" onChange={this.filterByCourse}>
                    <option selected value={"default"}>По курсу</option>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <option value={i}>{i}</option>
                    ))}
                </select>
                <input type="search" placeholder="Поиск по странице" className="search-input"></input>
                <button className="export-button" onClick={this.handleExport}>Экспортировать</button>
                <button className="to-kanban-button" onClick={this.handleKanban}>Канбан</button>
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
                    this.state.filteredStudentsData.map(human => (
                        <TableRow student={human}></TableRow>
                    ))
                }
            </ul>
        </div>
    }
}