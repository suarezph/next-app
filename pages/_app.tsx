import { ReactElement, useState, useEffect } from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import DefaultThemes from 'components/themes/default'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { userService } from 'services'

import type { AppProps } from 'next/app'
import PageWithLayoutType from '../types/layout.type'

export type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null)
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles: HTMLInputElement | null =
      document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue)
    const publicPaths = ['/auth/signup', '/auth/login']
    const path = url.split('?')[0]
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/auth/login',
        query: { returnUrl: router.asPath },
      })
    } else {
      setAuthorized(true)
    }
  }

  const Layout =
    Component.layout || ((children: ReactElement) => <>{children}</>)

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={DefaultThemes}>
        <Layout>
          {authorized ? <Component {...pageProps} /> : <div>loading</div>}
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
