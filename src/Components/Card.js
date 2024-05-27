import React, {Component} from "react";
import {Link} from "react-router-dom";

class Card extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <Link to={'/student/:'+ this.props.studentId}>
            <li className="people-card">
                <div>
                    {this.props.name}
                </div>
            </li>
        </Link>
    }
}

//Зырь Петя я пофиксил

export default Card