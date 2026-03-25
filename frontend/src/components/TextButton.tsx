
import React  from "react";

type TextButtonProps = {
    onclick : () => void;
    text : string

};

export const TextButton : React.FC<TextButtonProps> = ({onclick,text }) => {

    return (
        <button
        className ="textButton" 
        onClick={onclick}

        >
        <span>{text}</span>
        
        </button>
    )

}
