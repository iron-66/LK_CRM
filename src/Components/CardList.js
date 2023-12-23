import React, {Component} from "react";

import Card from './Card'
import '../Styles/CardList.css'
import ColorPicker from "./ColorPicker";

class Column extends Component{
    constructor(props){
        super(props)
        this.state = {
            backgroundColor: localStorage.getItem(this.props.cardListId) ? localStorage.getItem(this.props.cardListId) : "#dddddd",
            studentsArr: []
        }
    }

    componentDidUpdate(){
        this.state.studentsArr = this.props.students
    }

    ColorChange = (colorData) => {
        this.setState((state) => {
            return {backgroundColor: colorData}
        })
    }

    render(){
        return <li style={{backgroundColor: this.state.backgroundColor}} className="column-element">
            <ColorPicker onChangeColor={this.ColorChange} isVisible={this.props.isVisible} colorKey={this.props.cardListId}/> 
            <div className="name-column"><h2>{this.props.name}</h2></div>
            <ul className="cards-list" id={this.props.cardListId}>
            {       
                    this.state.studentsArr.map(human => (
                        <Card name={human.full_name} studentId={human.id}></Card>
                    ))
                }
            </ul>
        </li>
    }
}

export default Column