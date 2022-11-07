import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>HELLO WORLD</h1>
      <Link href={"/products"} legacyBehavior>
        <a>products</a>
      </Link>
    </>
  );
}
