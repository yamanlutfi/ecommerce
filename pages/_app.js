import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import '../styles/bulma.scss'
import '../styles/global.css'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Head from 'next/head'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ minimum: 0.1, trickleRate: 0.01, trickleSpeed: 30, showSpinner: false, trickle: true });

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()

  useEffect(() => {
    if (Router.pathname != '/login' && Router.pathname != '/register') {
      localStorage.setItem("lastPage", window.location.href);
    }
  }, [router.pathname])

  return <>
    <Head>
      <meta name='application-name' content='eCommerce' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='eCommerce' />
      <meta name='description' content='eCommerce cross border online shopping marketplace' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" id="theme-color" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      {(process.env.APP_ENV !== "development") &&
        <>
          <meta name="google-site-verification" content="VE4Sxop8tpDCKIWMjkcYDxcBCwHXn0-6I_PSC3Qlx6E" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JB6J8MPRRB"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
        
              gtag('config', 'G-JB6J8MPRRB');
              `
            }}
          />
        </>
      }
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png" />
      <link href="https://eCommerce.id/opensearch.xml" title="eCommerce.id Search" type="application/opensearchdescription+xml" rel="search" />
      <script src="/assets/js/lazysizes.min.js?v=5.3.0"></script>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  </>
}