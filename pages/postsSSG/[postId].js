import { useRouter } from "next/router";

const PostItem = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <h2>{post.id} - {post.title}</h2>
            <p>{post.body}</p>
        </>
    )
}

export default PostItem;

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/posts');
    const data = await res.json();
    const paths = data.slice(0, 3).map(post => {
        return {
            params: { postId: `${post.id}` }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const res = await fetch(`http://localhost:8000/posts/${params.postId}`);
    const data = await res.json();

    console.log(`Generating page for /posts/${params.postId}`);

    if (!data.id) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: data
        }
    }
}