import Head from 'next/head'
import React from 'react'
import Header from "../components/header";

function Layout({children}) {

    return (
        <>
            <Head>
                <title>GainNotes</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="GainNotes" key="title" />
            </Head>

            <Header/>

            <main className={"font-unineuebook"}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    );
}

export default Layout;
