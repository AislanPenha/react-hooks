import './styles.css';

export const PostPanel = ({id, cover, title, body}) =>{
    return (
        <div className='post'>
            <div className='post-content'>
                <img src={cover} alt={title} />
                <h2>{id} {title}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}