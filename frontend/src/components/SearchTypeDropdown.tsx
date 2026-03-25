import React from "react";
export type SearchTypeDropDownValue = "title" | "author";


type SearchTypeDropDownProps = {
    value : SearchTypeDropDownValue
    onchange : (value :SearchTypeDropDownValue) => void;
};

export const SearchTypeDropDown : React.FC<SearchTypeDropDownProps> = ({value,onchange}) => {

    return (
        <select 
            className = "searchDropdown"
            value = {value}
            onChange = { e => onchange(e.target.value as SearchTypeDropDownValue)}
        >

            <option value="title">Title</option>
            <option value="author">Author</option>
        
        </select>
    );



}