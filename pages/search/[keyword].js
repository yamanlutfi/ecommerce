import Head from 'next/head'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import replaceAll from 'replaceall'
import SearchSchema from '../../components/SearchSchema';
import ApiQuery from '../../components/ApiQuery';
import SearchNav from '../../components/layout/SearchNav';
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
  return ApiQuery("product/list","GET")
}

export default function Keyword({query}) {
  const { isLoading, isError, data, error } = useQuery(['home',1], fetchProduct)

  // For Meta  
  const title = `Jual beli ${query.keyword} murah | eCommerce`
  const description = `Jual beli ${query.keyword} murah hanya di eCommerce. Lengkap, murah, aman dan nyaman.`

  // Reuse Dinamyc Schema
  const url = `${process.env.API}search/${query.keyword}`
  const headMeta = SearchSchema(data,query,data.product.per_page,url)

  return (
    <SearchNav>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="eCommerce.id" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={query.keyword} />

        <link rel="canonical" href={headMeta.canonical} />
        {
        headMeta.prevUrl != 0 &&
          <link rel="prev" href={headMeta.prevUrl}/>
        }
        <link rel="next" href={headMeta.nextUrl}/>
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="ePorter" />
        <meta property="og:url" content={headMeta.canonical} />
        <meta property="og:image" content={'https://d3ol8ih1xbmzso.cloudfront.net/asset/logo/img-eporter-605c71397477a'} />
        <meta property="og:type" content="website" />
        {
        (data.product.length > 0)?
          (headMeta.schemaProductList)&&
            headMeta.schemaProductList.map((dataSchema, index)=>
              <script
                key={`schema-${index}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(dataSchema) }}
              />
            )
        :
        ""
        }
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
                  {data.product.map(product => (
                    <Product product={product} key={product.id}/>
                  ))}
                </div>
              )
        }
        <br/>
      </div>
    </SearchNav>
  )
}
