import './Posts.css';
import React, { useState, useEffect } from 'react';
import Post from '../post/Post';
import PostCreate from '../post-create/PostCreate';
import PostShow from '../post-show/PostShow';

function Posts() {
    const [posts, setPosts] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [routerComponent, setRouterComponent] = useState('posts');
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        
        fetch("http://localhost/api/posts")
        .then(res => res.json())
        .then(
          (result) => {
            setPosts(result);
          },
          (error) => {
            console.log(error);
          }
        );

        return () => {
            setPosts(null);
        }
    }, [isUpdate]);

    const postUpdate = () => {
        setIsUpdate(!isUpdate);
    }

    const openPost = (id) => {
        setRouterComponent('postShow');
        setPostId(id);
    }

    return(
        <React.Fragment>
            {routerComponent === 'posts' && (
                <React.Fragment>
                    <h1>
                        Посты 
                        <a style={{color: 'blue'}} onClick={() => setRouterComponent('postCreate')}>Добавить новый</a> 
                        <button onClick={() => postUpdate()}>Обновить</button>
                    </h1>
                    {!!posts && (
                        posts.map((post, index) => (
                        <Post key={"post_" + index} post={post} isClick={() => openPost(post.id)} />
                    )))}
                </React.Fragment>
            )}
            {routerComponent === 'postCreate' && (
                <React.Fragment>
                    <h1>Новый пост <a style={{color: 'blue'}} onClick={() => setRouterComponent('posts')}>
                    Все посты</a></h1>
                    <PostCreate isCreate={() => setRouterComponent('posts')}/>
                </React.Fragment>
            )}
            {routerComponent === 'postShow' && (
                <React.Fragment>
                    <h1>Пост <a style={{color: 'blue'}} onClick={() => setRouterComponent('posts')}>Все посты</a></h1>
                    {postId && (<PostShow id={postId}/>)}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Posts;