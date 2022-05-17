import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import dbConnect from "../lib/dbConnect";

export default function Home({ isConnected }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      window.location.replace("https://www.anhtuan.info");
    }
  }, []);

  return (
    <>
      <Head>
        <title>My API V1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="box">
        {isConnected ? (
          <h1 className="title">You are connected to MongoDB</h1>
        ) : (
          <h1 className="title">You are NOT connected to MongoDB.</h1>
        )}

        <div>
          <Link href="/api/movies/">
            <div className="card">
              <h3>Movies</h3>
            </div>
          </Link>

          <Link href="/api/quotes/">
            <div className="card">
              <h3>Quotes</h3>
            </div>
          </Link>

          <Link href="/api/news/">
            <div className="card">
              <h3>News</h3>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          min-height: 100vh;
          flex-direction: column;
          padding: 1rem;
          color: #fff;
          background-color: #191820;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .card {
          cursor: pointer;
          border-radius: 0.25rem;
          margin-top: 1.5rem;
          border-width: 1px;
          border-style: solid;
          border-color: #ffffff4d;
          padding: 0 1rem;
        }

        .card h3 {
          font-size: 1.5rem;
          text-align: center;
        }

        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
