//!first method:add guard by SSR
import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";

function AuthPage({}) {
  return <AuthForm />;
}
export default AuthPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
//!second method: useSession hook
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
// import AuthForm from "../components/auth/auth-form";

// function AuthPage() {
//   const router = useRouter();
//   const { status } = useSession();
//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }
//   if (status === "unauthenticated") {
//     return <AuthForm />;
//   } else {
//     router.replace("/profile");
//   }
// }

// export default AuthPage;
