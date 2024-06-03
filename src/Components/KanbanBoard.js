import React, {Component} from "react";
import axios from "axios";
import '../Styles/KanbanBoard.css'

import SettingsIcon from "../Files/SettingsIcon.svg"
import CardList from './CardList'

const statues = {                             //Статусы студентов
    "new": 'Отправил(а) персональные данные',
    "undone_test": 'Не прошёл(ла) тестирование',
    "done_test": 'Прошёл(ла) тестирование',
    "add_chat": 'Добавлен(а) в организационный чат',
    "start_practice": 'Приступил(а) к практике',
    "finish_practice": 'Завершил(а) прохождение практики',
    "delete_practice":'Удалён(а) с практики',
}

class KanbanBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            isVisible: false,
            studentsData: [],
            filteredStudentsData: [],
            update: false
        }
        
    }

    ChangeVisibility = () => {
        this.setState((state) => {
            return {isVisible: !state.isVisible}
        })
    }

    async componentDidMount(){
        await axios("http://crm.studprzi.beget.tech/get-students/") // http://crm.studprzi.beget.tech/get-students/ http://158.160.165.203:8000/get-students/
        .then(response => {this.setState({
            studentsData: response.data,
            filteredStudentsData: response.data
        })})
        this.state.update = true
    }

    async componentDidUpdate(){
        if (this.state.update) {
            this.setState({
                update: false
            })
        }
    }

    handleTable = () => {
        window.location.href = '/table';
    }

    searchingOnPage = (e) => {
        var searchingValue = e.target.value.toLowerCase().trim();
        this.setState({
            filteredStudentsData: this.state.studentsData.filter(s => s.full_name.toLowerCase().includes(searchingValue))
        })
        this.state.update = true
        
    }

    render() {
        return <div>
                <div className="kanban-header-container">
                    <img 
                        className="settings-icon" 
                        src={SettingsIcon} 
                        onClick={this.ChangeVisibility}
                    />
                    <input type="text" placeholder="Поиск по странице" onChange={this.searchingOnPage} id="kanban-search-input"></input>
                    <button className="exp-button">Экспортировать</button>
                    <button className="forms-button" onClick={this.handleTable}>Табличный вид</button>
                </div>
                <ul className="status-columns">
                    {Object.keys(statues).map(key => (
                        <CardList key={key}
                        name={statues[key]} 
                        isVisible={this.state.isVisible} 
                        cardListId={key}
                        students={this.state.filteredStudentsData.filter(stud => stud.status === key)}
                        />
                    ))}
                </ul>
        </div>
        
    }
}

export default KanbanBoard