import { Html, NextScript, Head, Main  } from "next/document";

//to insert html working with next you should create _document.tsx and use next/documents tags
//https://nextjs.org/docs/advanced-features/custom-document
export default function Document (){
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
            </Head>

            <body className="bg-gray-900 bg-app bg-no-repeat bg-cover">
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}