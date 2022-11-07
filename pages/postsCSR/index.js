import Link from "next/link";
import { useState, useEffect } from "react";

const PostList = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchPostData() {
            const response = await fetch('http://localhost:8000/posts');
            const data = await response.json();
            setPosts(data)
            setLoading(false)
        }

        fetchPostData()
    }, [])

    if(loading){
        return <h2>Loading ...</h2>
    }
    return (
        <>
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link href={`/postsCSR/${post.id}`} passHref>
                                <span>{post.id} - {post.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default PostList;