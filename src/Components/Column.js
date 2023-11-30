import React, {Component} from "react";

import '../Styles/Column.css'

class Column extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <li className="column-element">
            <h2 className="name-column">{this.props.name}</h2>
            <ul className="cards-list"></ul>
        </li>
    }
}

export default Column