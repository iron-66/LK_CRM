import React, {Component} from "react";

class Card extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <li className="people-card">
            <div>{this.props.name}</div>
        </li>
    }
}

export default Card