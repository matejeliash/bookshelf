import React  from "react";

type SearchButtonProps = {
    onclick : () => void;
};

export const SearchButton : React.FC<SearchButtonProps> = ({onclick }) => {

    return (
        <button
        className ="searchButton" 
        onClick={onclick}
        >
        <img className="searchButtonImg" src="/search.svg"></img>
        <p>Search</p>
        
        </button>
    )

}
