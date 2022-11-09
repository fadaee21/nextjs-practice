import style from "../styles/home.module.css";
export default function Home() {
  return (
    <>
      <h1 className={style.bgColor}>HELLO WORLD</h1>

      <div>
        Hello world
        <p>scoped!</p>
        <style jsx>{`
          p {
            color: blue;
          }
          div {
            background: red;
          }
          @media (max-width: 600px) {
            div {
              background: blue;
            }
          }
        `}</style>
        {/* if you want to have global style, add global property */}
        <style global jsx>{`
          body {
            background: blue;
          }
        `}</style>
      </div>
    </>
  );
}
