import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>HELLO WORLD</h1>
      <Link href={"/todos"} legacyBehavior>
        <a>todos</a>
      </Link>
    </>
  );
}
