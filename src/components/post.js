export default function Post({id, title, author}) {
    return(
        <div className="post">
            {id && <p>ID: {id}</p>}
            {title && <p>Title: {title}</p>}
            {author && <p>Author: {author}</p>}
        </div>
    );
}