import React, { useState, useRef } from 'react';
import Post from '../post/Post';

function PostCreate(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const inputPostTitle = useRef();
    const inputPostInfo = useRef();
    const inputPostImage = useRef();

    const postAdd = async () => {
        const postTitle = inputPostTitle.current.value;
        const postInfo = inputPostInfo.current.value;
        const postImage = inputPostImage.current.files;
        console.log(postImage);

        if (!postTitle || !postInfo) {
            return;
        }

        // const data = {
        //     post_title: postTitle,
        //     post_info: postInfo
        // }

        let data = new FormData();
        data.append('post_title', postTitle);
        data.append('post_info', postInfo);
        for (let index = 0; index < postImage.length; index++) {
            data.append(`post_files[${index}]`, postImage[index]);
        }


        fetch("http://localhost/api/post/add", {
            method: 'POST',
            body: data
          })
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
            },
            (error) => {
              console.log(error);
            }
          );

        // const response = await fetch("http://localhost/api/post/add", {
        //     method: "POST",
        //     headers: {
        //         // 'Accept': 'application/json',
        //         // 'Content-Type': 'application/json',
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     // body: JSON.stringify(data),
        //     body: data
        // });

        // const result = await response.json();

        // if (!!result.id) {
        //     props.isCreate();
        // }
    }

    const addDisable = () => {
        const postTitle = inputPostTitle.current.value;
        const postInfo = inputPostInfo.current.value;

        if (postTitle.trim().length > 0 && 
        postInfo.trim().length > 0) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    return(
        <React.Fragment>

            <div>
                <label>Заголовок</label>
                <input ref={inputPostTitle} type="text" onChange={() => addDisable()}/>
            </div>
            <div>
                <label>Описание</label>
                <input ref={inputPostInfo} type="text" onChange={() => addDisable()}/>
            </div>
            <div>
                <label>Картинка</label>
                <input ref={inputPostImage} type="file" multiple="multiple" accept="image/png, image/gif, image/jpeg"/>
            </div>
            <div>
                <button onClick={() => postAdd()}
                 disabled={isDisabled}
                 >Добавить</button>
            </div>
        </React.Fragment>
    );
}

export default PostCreate;