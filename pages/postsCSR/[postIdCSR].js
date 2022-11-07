import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PostItem = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const router = useRouter();
    const { postIdCSR } = router.query;

    useEffect(() => {
        async function fetchPostData() {
            const response = await fetch(`http://localhost:8000/posts/${postIdCSR}`);
            const data = await response.json();
            setPost(data)
            setLoading(false)
        }

        fetchPostData()
    }, [postIdCSR])

    if (loading) {
        return <h2>Loading ...</h2>
    }

    return (
        <>
            <h2>{post.id} - {post.title}</h2>
            <p>{post.body}</p>
        </>
    )
}

export default PostItem;