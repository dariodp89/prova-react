import {useState, useEffect} from 'react';
import {useDeletePostMutation} from "../queryConfig";

export default function PostDeleter(props) {
    const [deletePost] = useDeletePostMutation();

    const posts = props.posts;

    const [postDeleterPostId, setPostDeleterPostId] = useState('');

    useEffect(() => {
        if (posts) {
            setPostDeleterPostId(posts[0].id);
        }
    }, [posts]);
    
    async function erasePost(event) {
        event.preventDefault();

        await deletePost(postDeleterPostId);
    }

    return(
        <section className="post-deleter">
            <p>Delete existing post</p>
            <form onSubmit={erasePost}>
                <div>
                    <label>Delete post by id</label>
                    <select name="id" value={postDeleterPostId} onChange={(event) => setPostDeleterPostId(event.target.value)}>
                        {posts?.map(item => <option key={item.id} value={item.id}>{item.id}</option>)}
                    </select>
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </section>
    );
}