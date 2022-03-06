import Post from './post';

export default function PostList(props) {
    const {posts, postsLoadingError, postsLoading, postsFetching, postsLoadingSuccess} = props;

    return(
        <section className="post-list">
            {posts?.map(item => <Post key={item.id} {...item}/>)}
        </section>
    );
}