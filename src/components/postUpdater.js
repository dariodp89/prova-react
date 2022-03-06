import {useEffect, useState} from 'react';
import {useUpdatePostMutation} from "../queryConfig";

export default function PostUpdater(props) {
    const [updatePost] = useUpdatePostMutation();

    const posts = props.posts;

    const [postUpdaterFormData, setPostUpdaterFormData] = useState({id: '', title: '', author: ''});

    useEffect(() => {
        if (posts) {
            setPostUpdaterFormData({
                id: postUpdaterFormData.id || posts[0].id,
                title: postUpdaterFormData.title || posts[0].title,
                author: postUpdaterFormData.author || posts[0].author
            });
        }
    }, [posts]);
    
    async function modifyPost(event) {
        event.preventDefault();

        await updatePost(postUpdaterFormData);
    }

    return(
        <section className="post-updater">
            <p>Update existing post</p>
            <form onSubmit={modifyPost}>
                <div>
                    <label>Edit post by id</label>
                    <select name="id" value={postUpdaterFormData.id} onChange={(event) => setPostUpdaterFormData({id: event.target.value, title: posts.filter(item => item.id == event.target.value)[0].title, author: posts.filter(item => item.id == event.target.value)[0].author})}>
                        {posts?.map(item => <option key={item.id} value={item.id}>{item.id}</option>)}
                    </select>
                </div>

                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={postUpdaterFormData.title} onChange={(event) => setPostUpdaterFormData({...postUpdaterFormData, title: event.target.value})}/>
                </div>

                <div>
                    <label>Author</label>
                    <input type="text" name="author" value={postUpdaterFormData.author} onChange={(event) => setPostUpdaterFormData({...postUpdaterFormData, author: event.target.value})}/>
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </section>
    );
}