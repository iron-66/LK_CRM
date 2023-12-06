import React, {useState} from "react";
import { GithubPicker } from "react-color";

export default function ColorPicker (props) {
    const [color, setColor] = useState('#dddddd');
    return <div className="color-picker">
        <GithubPicker
            triangle="hide"
            className={!props.isVisible ? "hidden" : ""}
            color={color}
            onChange={ (color) => {
                setColor(color.hex)
                props.onChangeColor(color.hex)
            }}
            onChangeComplete={ (color) => {
                localStorage.setItem(props.colorKey, color.hex)
            }}
        />
    </div>
}