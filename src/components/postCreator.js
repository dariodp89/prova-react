import {useEffect, useState} from 'react';
import {useAddPostMutation} from "../queryConfig";

export default function PostCreator(props) {
    const [addPost] = useAddPostMutation();

    const nextPostId = props.nextPostId;

    const [postCreatorFormData, setPostCreatorFormData] = useState({id: '', title: '', author: ''});

    useEffect(() => {
        setPostCreatorFormData({id: nextPostId, title: '', author: ''});
    }, [nextPostId])
    
    async function createPost(event) {
        event.preventDefault();

        await addPost(postCreatorFormData);
    }

    return(
        <section className="post-creator">
            <p>Create new post</p>
            <form onSubmit={createPost}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={postCreatorFormData.title} onChange={(event) => setPostCreatorFormData({...postCreatorFormData, title: event.target.value})} />
                </div>
                
                <div>
                    <label>Author</label>
                    <input type="text" name="author" value={postCreatorFormData.author} onChange={(event) => setPostCreatorFormData({...postCreatorFormData, author: event.target.value})} />
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </section>
    );
}