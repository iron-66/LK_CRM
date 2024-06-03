import React, {Component} from "react";
import {Link} from "react-router-dom";

// Карточка практиканта для канбана
class Card extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <Link to={'/student/:'+ this.props.studentId} state={{page: ""}}>
            <li className="people-card">
                <div>
                    {this.props.name}
                </div>
            </li>
        </Link>
    }
}

export default Card