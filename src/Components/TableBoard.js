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
            filteredStudentsData: [],
            filterStatus: "default",
            filterCourse: "default",
            IsUpdate: false,
        }
    }


    async componentDidMount(){
        await axios("http://158.160.131.224:8000/get-students/") //http://crm.studprzi.beget.tech/get-students/ http://158.160.131.224:8000/get-students/
        .then(response => {this.setState({
            studentsData: response.data,
            filteredStudentsData: response.data
        })})
    }

    async componentDidUpdate(){
        console.log("update")
        if (this.state.IsUpdate){
            console.log("updateUpdate")
            this.setState({
                IsUpdate: !this.state.IsUpdate
            })
        }
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

    filter= () => {
        console.log(this.state.filterCourse, this.state.filterStatus)
        if (this.state.filterStatus == "default" && this.state.filterCourse == "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData
            })  
        } else if (this.state.filterStatus == "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.course === this.state.filterCourse)
            })
        } else if (this.state.filterCourse == "default"){
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.status === this.state.filterStatus)
            })
        } else {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.status === this.state.filterStatus && s.course === this.state.filterCourse)
            })
        }
        this.state.IsUpdate = true
        console.log(this.state.filteredStudentsData)
    }

    render() {
        return <div>
            <div className="container">
                <select className="filter-by-status" onChange={(e) => {this.state.filterStatus = e.target.value; this.filter()}}>
                    <option selected value={"default"}>По статусу</option>
                    {Object.keys(statues).map(key => (
                        <option value={key}>{statues[key]}</option>
                    ))}
                </select>
                <select className="filter-by-course" onChange={(e) => {this.state.filterCourse = e.target.value; this.filter()}}>
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