import React, { useState,useEffect, useRef } from 'react';

function PostShow(props) {
    const [post, setPost] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        fetch("http://localhost/api/post/" + props.id)
        .then(res => res.json())
        .then(
          (result) => {
            setPost(result);
          },
          (error) => {
            console.log(error);
          }
        );

        return () => {
            setPost(null);
        }
    }, [isUpdate]);

    const commentAdd = async () => {}

    const postUpdate = () => {
        setIsUpdate(!isUpdate);
    }

    return(
        <React.Fragment>
            <h1><button onClick={() => postUpdate()}>Обновить</button></h1>
            {post && (
                <React.Fragment>
            <h1>{post.post_title}</h1>
            <h1>{post.post_info}</h1>
            </React.Fragment>
            )}

        </React.Fragment>
    );
}

export default PostShow;