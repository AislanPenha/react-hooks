import './styles.css';

import { useState, useEffect, useCallback } from 'react';

import { PostPanel } from '../../components/PostPanel';
import { loadPost } from '../../utils/load-post';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(3);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const handleLoadPost = useCallback (async (page, postsPerPage) => {
        const postsAndPhotos = await loadPost();
       
        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);

    },[]);

    const loadPostMore = () => {
        const nextPage = page + postsPerPage;

        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);

        setPage(nextPage);

    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value)
    }


    const filteredPosts = (!!searchValue) ?
        allPosts.filter((post) => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        : posts;

        useEffect(() => {
            console.log(new Date().toLocaleDateString('pt-br'));
            handleLoadPost(0, postsPerPage);
            
        }, [handleLoadPost, postsPerPage]);
    return (
        <section className='container'>
            {!!searchValue && <h1>Search value: {searchValue}</h1>}

            <TextInput handleChange={handleChange} searchValue={searchValue} />

            <div className='posts'>
                {filteredPosts.map(post => (
                    <PostPanel
                        key={post.id}
                        id={post.id}
                        cover={post.cover}
                        body={post.body}
                        title={post.title}
                    />
                ))}
            </div>
            {!searchValue && (
                <Button
                    disable={noMorePosts}
                    text='Load post more'
                    onClick={loadPostMore}
                />
            )}


        </section>
    );
}