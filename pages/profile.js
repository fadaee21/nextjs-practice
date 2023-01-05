//!first method:add guard by SSR
import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
function ProfilePage() {
  return <UserProfile />;
}
export default ProfilePage;

//obviously use getServerSideProps,in every request you get proper response
//in getStaticProps, every thing create in build time and never change in request time
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // if session was null redirect to login page
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        //permanent false declare only this time that user doesn't login
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}


//!second method: useSession hook
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// function ProfilePage() {
//   const { status } = useSession();
//   const router = useRouter();
//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }
//   if (status === "unauthenticated") {
//     router.replace("/auth");
//   } else {
//     return <UserProfile />;
//   }
// }

// export default ProfilePage;
