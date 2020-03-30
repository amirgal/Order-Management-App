import React, {useState} from 'react';
import { TextField } from '@material-ui/core';

const SearchBar = (props) => {
    const [input,setInput] = useState('')

    const handleSearch = e => {
        setInput(e.target.value)
        props.handleSearch(e.target.value)
    }

    return (
        <div id="completed-search-bar">
            <TextField id="outlined-basic" onChange={handleSearch}
            value={input} label="Search by Order Id" variant="outlined" />
        </div>
    )
}

export default SearchBar