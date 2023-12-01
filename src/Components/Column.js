import React, {Component, useState} from "react";
import { SliderPicker } from 'react-color';

import Card from './Card'
import '../Styles/Column.css'

const people = ['Соловьёв П. Д.', 'Аляскина Ф. Р.', 'Кукушкин П. Н.', 'Кефирова Р. О.', 'Рыбова В. Ф.', 'Филиппов В. Ф.', 'Аляскина Ф. Р.']

//SliderPicker спрятан с помощью класс hidden, который расписан в App.css

class Column extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <li style={{backgroundColor: this.color}} className="column-element">
            <SliderPicker className="color-slider hidden" 
                color={this.color}
                /> 
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