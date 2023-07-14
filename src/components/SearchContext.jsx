import React, { createContext, useState } from 'react'


export const SearchContext = createContext()
export const Provider = ({children})=>{
    const [search, setSearch]=useState('')
    const [dropdownValue, setDropdownValue] = useState('');

    return (

        <SearchContext.Provider value={{ search, setSearch, dropdownValue, setDropdownValue }}>
        {children}
    </SearchContext.Provider>
)
}
