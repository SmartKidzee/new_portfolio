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
        titleTemplate="%s | Shreyas - Tech Enthusiast"
        defaultTitle="Shreyas | Tech Enthusiast"
        description="Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website."
        canonical="https://iamshreyas.live/"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://iamshreyas.live/',
          siteName: 'Shreyas Portfolio',
          title: 'Shreyas | Tech Enthusiast',
          description: 'Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website.',
          images: [
            {
              url: 'https://iamshreyas.live/og-image.png',
              width: 1200,
              height: 630,
              alt: 'Shreyas',
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