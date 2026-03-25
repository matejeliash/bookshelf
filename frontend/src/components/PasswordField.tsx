
import React from "react";


export type PasswordFieldProps = {
    value : string;
    onchange : (value: string ) => void;
};

export const PasswordField : React.FC<PasswordFieldProps> = ({value,onchange}) =>{

    return(
        <input
        className="passwordField"
            type="password"
            placeholder="password"
            value={value}
            onChange={e => onchange(e.target.value)}
        >
        
        </input>


    )

}