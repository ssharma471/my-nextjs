// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react'; // Make sure to import React

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
