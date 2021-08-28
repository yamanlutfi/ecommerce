import Head from 'next/head'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import replaceAll from 'replaceall'
import Default from '../../components/layout/Default';
import Product from '../../components/Product';

export async function getServerSideProps({query}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['home',1], fetchProduct)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query
    }
  }
}

const fetchProduct = () => {
  return fetch('https://private-4639ce-ecommerce56.apiary-mock.com/home').then(res =>
    res.json()
  )
}

export default function Keyword({query}) {
  const { isLoading, isError, data, error } = useQuery(['home',1], fetchProduct)

  return (
    <Default page="search">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="section pt-2">
        <h1 className="title is-7">Hasil pencarian <i>{replaceAll("-"," ",query.keyword)}</i></h1>
        {
          (isLoading) ?
            (<div>Loading...</div>)
            : (isError) ?
              (<span>Error: {error.message}</span>)
              :
              (
                <div className="container">
                  {data[0].data.productPromo.map(product => (
                    <Product product={product} key={product.id}/>
                  ))}
                </div>
              )
        }
        <br/>
      </div>
    </Default>
  )
}
