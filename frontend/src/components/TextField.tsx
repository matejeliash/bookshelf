import React from "react";


export type SearchFieldProps = {
    value : string;
    defaultvalue : string
    onchange : (value: string ) => void;
};

export const TextField : React.FC<SearchFieldProps> = ({value, defaultvalue,onchange}) =>{

    return(
        <input
        className="textField"
            type="text"
            placeholder="search here"
            value={value}
            onChange={e => onchange(e.target.value)}
            //defaultValue={defaultvalue}
        >
        
        </input>


    )

}