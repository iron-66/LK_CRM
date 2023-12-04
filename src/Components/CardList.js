import React, {Component} from "react";

import Card from './Card'
import '../Styles/CardList.css'
import ColorPicker from "./ColorPicker";

const people = ['Соловьёв П. Д.', 'Аляскина Ф. Р.', 'Кукушкин П. Н.', 'Кефирова Р. О.', 'Рыбова В. Ф.', 'Филиппов В. Ф.', 'Аляскина Ф. Р.']

//SliderPicker спрятан с помощью класс hidden, который расписан в App.css

class Column extends Component{
    constructor(props){
        super(props)
        this.state = {
            backgroundColor: '#dddddd'
        }
    }

    ColorChange = (colorData) => {
        this.setState((state) => {
            return {backgroundColor: colorData}
        })
    } 
    render(){
        return <li style={{backgroundColor: this.state.backgroundColor}} className="column-element">
            <ColorPicker onChangeColor={this.ColorChange} isVisible={this.props.isVisible}/> 
            <div className="name-column"><h2>{this.props.name}</h2></div>
            <ul className="cards-list">
            {
                    people.map(human => (
                        <Card name={human}></Card>
                    ))
                }
            </ul>
        </li>
    }
}

export default Column