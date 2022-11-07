import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>HELLO WORLD</h1>
      <Link href={"/postsSSG"}>postsSSG</Link>
      <br/>
      <Link href={"/postsSSR"}>postsSSR</Link>
      <br/>
      <Link href={"/postsCSR"}>postsCSR</Link>
    </>
  );
}
