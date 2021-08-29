import Head from 'next/head'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Wishlist from '../../components/Wishlist'
import Back from '../../components/Back'

export async function getServerSideProps({ query }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['home', 1], fetchProduct)
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

const createMarkup = (description) => {
  return { __html: description };
}

export default function Keyword({ query }) {
  const { isLoading, isError, data, error } = useQuery(['home', 1], fetchProduct)

  return (
    <div className="default-content">
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
        <div className="p-4 nav-item">
          <Back />
        </div>
        <div className="pl-0 pt-4 pb-4 nav-item has-text-grey">
          Product Detail
        </div>
        <div className="p-4 nav-item share">
          <div>
            <FontAwesomeIcon icon={faShareAlt} className="w-18 has-text-grey" />
          </div>
        </div>
      </nav>

      {
        (isLoading) ?
          (<div>Loading...</div>)
          : (isError) ?
            (<span>Error: {error.message}</span>)
            :
            (
              <nav className="navbar is-fixed-bottom my-page-width" role="navigation">
                <div className="navbar-menu pb-0">
                  <div className="navbar-item pt-1 is-expanded is-block  has-text-centered">
                    <b className="is-size-5 mb-0">{data[0].data.productPromo[0].price}</b>
                  </div>
                  <div className="navbar-item pt-0 pb-0 is-expanded is-block has-text-centered">
                    <div className="button is-info br-sm is-fullwidth mt-0 mb-0">Buy</div>
                  </div>
                </div>
              </nav>,

              <div className="section pt-2 my-page-width">
                <div className="card mb-5 br-lg">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={data[0].data.productPromo[0].imageUrl} alt={data[0].data.productPromo[0].title} className="img-detail-product" />
                    </figure>
                  </div>
                </div>
                <div className="is-relative">
                  <div className="title is-4 mb-2">{data[0].data.productPromo[0].title}</div>
                  <Wishlist className="heart-product-detail" />
                </div>
                <div className="mt-5">
                  <div className="title ttl mb-2">Description</div>
                  <div dangerouslySetInnerHTML={createMarkup(data[0].data.productPromo[0].description)} />
                </div>
                <br />
              </div>
            )
      }
    </div>
  )
}
