import React, {useState} from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const SearchBar = (props) => {
    const [input,setInput] = useState('')
    const [searchParam, setSearchParam] = React.useState('');

    const handleSearch = e => {
        setInput(e.target.value)
        props.handleSearch(e.target.value, searchParam)
    }
    const handleChange = (event) => {
      setSearchParam(event.target.value);
    };
    return (
        <div id="completed-search-bar">
            <TextField id="outlined-basic" onChange={handleSearch}
            value={input} label="Search" variant="outlined" />
             <FormControl id="search-bar-filter">
                <InputLabel>Search By</InputLabel>
                <Select
                    value={searchParam}
                    onChange={handleChange}
                >
                <MenuItem value={'shopifyId'}>Order Id</MenuItem>
                {/* <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'email'}>Email</MenuItem> */}
                <MenuItem value={'product'}>Product</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SearchBar