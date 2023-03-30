import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
import i18nextConfig from '../next-i18next.config'

type Props = DocumentProps & Record<string, unknown>

class MyDocument extends Document<Props> {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta name="description" content="Smiles Web" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
