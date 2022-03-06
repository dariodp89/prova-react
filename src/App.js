import {useState, useEffect} from 'react';
import PostList from './components/postList';
import PostCreator from './components/postCreator';
import PostUpdater from './components/postUpdater';
import PostDeleter from './components/postDeleter';
import {useGetPostsQuery} from './queryConfig';

function App() {
  const [posts, setPosts] = useState([]);

  const {data: postsData, error: postsLoadingError, isLoading: postsLoading, isFetching: postsFetching, isSuccess: postsLoadingSuccess} = useGetPostsQuery();

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  return (
    <div className="App">
      {postsLoading && <p>Loading...</p>}
      {!postsLoading && postsLoadingError && <p>Error!</p>}
      
      {!postsLoading && postsLoadingSuccess && posts?.length > 0 && <PostList posts={posts} postsLoadingError={postsLoadingError} postsLoading={postsLoading} postsFetching={postsFetching} postsLoadingSuccess={postsLoadingSuccess} />}
      {!postsLoading && postsLoadingSuccess && posts?.length == 0 && <p>There are no posts.</p>}

      {!postsLoading && postsLoadingSuccess && <PostCreator nextPostId={posts?.length + 1} />}

      {!postsLoading && postsLoadingSuccess && posts?.length > 0 && <>
        <PostUpdater posts={posts} />
        <PostDeleter posts={posts} />
      </>}
    </div>
  );
}

export default App;
