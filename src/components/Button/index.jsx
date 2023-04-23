import './styles.css';

export const Button = ({onClick, text, disable}) => {
    return (
        <button 
        disabled={disable}
        className='button'
        onClick={onClick}>
            {text}
        </button>
    );
}