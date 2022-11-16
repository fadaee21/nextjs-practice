import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Posts = ({ posts, error }) => {
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      <h2>Posts Page</h2>
      <div className="container mt-5">
        <div className="row g-3">
          {posts?.map((post) => (
            <div key={post.id} className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card=text">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;

//  "req" نکته بسیار مهم در را بطه با گرفتن
//بصورت پراپ دریافت می شود دقت شود که این فانکشن اس اس آر سمت سرور
//  اجرا می شود و توکنی به سمت کلاینت ارسال نشده است
//به هیچ عنوان نباید توکن سمت کلاینت ارسال شود

export const getServerSideProps = async ({ req }) => {
  try {
    const resApi = await axios.get("http://localhost:8000/api/posts", {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    const data = await resApi.data;

    if (resApi.status === 200) {
      return {
        props: {
          posts: data.posts,
          error: null,
        },
      };
    } else {
      return {
        props: {
          posts: null,
          error: data,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        posts: null,
        error: error.response.data.message,
      },
    };
  }
};
