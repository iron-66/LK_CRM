import React, {Component} from "react";
import '../Styles/TableBoard.css'
import axios from "axios";
import TableRow from "./TableRow";

const statues = {
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
            filterFIO: "",
            IsUpdate: false,
        }
    }


    async componentDidMount(){
        await axios("http://crm.studprzi.beget.tech/get-students/")
        .then(response => {this.setState({
            studentsData: response.data,
            filteredStudentsData: response.data
        })})
    }

    handleExport = async () => {
        try {
            const response = await axios.get("http://crm.studprzi.beget.tech/export-students-xlsx/", {
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

    filter = () => {
        console.log(this.state.filterCourse, this.state.filterStatus)
        if (this.state.filterStatus == "default" && this.state.filterCourse == "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.full_name.toLowerCase().includes(this.state.filterFIO))
            })  
        } else if (this.state.filterStatus == "default") {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.course === this.state.filterCourse && s.full_name.toLowerCase().includes(this.state.filterFIO))
            })
        } else if (this.state.filterCourse == "default"){
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.status === this.state.filterStatus && s.full_name.toLowerCase().includes(this.state.filterFIO))
            })
        } else {
            this.setState({
                filteredStudentsData: this.state.studentsData.filter(s => s.status === this.state.filterStatus && s.course === this.state.filterCourse && s.full_name.toLowerCase().includes(this.state.filterFIO))
            })
        }
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
                <input type="search" placeholder="Поиск по ФИО" className="search-input" 
                    onChange={(e) => {this.state.filterFIO = e.target.value.toLowerCase().trim(); this.filter()}}></input>
                <button className="export-button" onClick={this.handleExport}>Экспортировать</button>
                <button className="to-kanban-button" onClick={this.handleKanban}>Канбан</button>
            </div>
            <table>
                <thead>
                    <tr className="table-header">
                        <th className="th-fio">Фамилия, имя, отчество</th>
                        <th className="th-status">Статус</th>
                        <th className="th-phone-number">Номер телефона</th>
                        <th className="th-vk-link">Ссылка на вк</th>
                        <th className="th-email">Почта</th>
                        <th className="th-uni">Учебное заведение</th>
                        <th className="th-direction">Направление</th>
                        <th className="th-course">Курс</th>
                        <th className="th-degree">Академ. степень</th>
                        <th className="th-results">Результаты тестов</th>
                    </tr>
                </thead>
                <tbody className="table-list">
                    {       
                        this.state.filteredStudentsData.map(human => (
                            <TableRow student={human}></TableRow>
                        ))
                    }
                </tbody>
            </table>
            {/* <ul className="table-list">
            {       
                    this.state.filteredStudentsData.map(human => (
                        <TableRow student={human}></TableRow>
                    ))
                }
            </ul> */}
        </div>
    }
}