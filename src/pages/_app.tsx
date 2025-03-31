import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo
        titleTemplate="%s | Shreyas J - Tech Enthusiast"
        defaultTitle="Shreyas J | Tech Enthusiast"
        description="Shreyas J is a software engineer specializing in web development, AI, and mobile applications. Check out his portfolio, projects, and blog."
        canonical="https://iamshreyas.live/"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://iamshreyas.live/',
          siteName: 'Shreyas J Portfolio',
          title: 'Shreyas J | Tech Enthusiast',
          description: 'Shreyas J is a software engineer specializing in web development, AI, and mobile applications.',
          images: [
            {
              url: 'https://iamshreyas.live/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Shreyas J',
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          handle: '@kidzeesmart',
          site: '@kidzeesmart',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'software engineer, web developer, AI, machine learning, portfolio, blog, projects, frontend developer, backend developer, fullstack developer',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 