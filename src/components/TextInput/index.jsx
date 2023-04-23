export const TextInput = ({handleChange, searchValue}) => {
    return (
        <input 
        type='search' 
        onChange={handleChange} 
        value={searchValue} 
        placeholder="Type your search"/>
    );
}