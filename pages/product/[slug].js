import Head from 'next/head'
import { QueryClient, useQuery, useMutation, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Wishlist from '../../components/Wishlist'
import Back from '../../components/Back'
import ApiQuery from '../../components/ApiQuery'

export async function getServerSideProps({ query }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['detailProduct', query.slug], fetchProduct.bind(this, query.slug))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query
    }
  }
}

const fetchProduct = (slug) => {
  return ApiQuery("product/detail/" + slug, "GET")
}

const createMarkup = (description) => {
  return { __html: description };
}

export default function Keyword({ query }) {

  /*------------------ START LOGIC FOR PERFORMANCE --------------------*/

  const queryClient = useQueryClient()
  const [isMounted, setIsMounted] = useState(false)
  const { isLoading, isError, data, error } = useQuery(['detailProduct', query.slug], fetchProduct.bind(this, query.slug))

  // Post Cart
  const postCart = () => {
    const body = {
      product_id: data.product.id
    }
    return ApiQuery("cart/insert","POST",body)
  }
  const postMutation = useMutation(postCart, {
    onMutate: data => {
      queryClient.setQueryData("cart", data)
    }
  })
  const insertCart = () => {
    // Save data cart to cache (Combine Cart data in cache with cart data that you Post)
    const newCart = {product: [...dataCart.product, {
      product_id: data.product.id, 
      slug: data.product.slug, 
      title: data.product.title, 
      description: data.product.description, 
      price: data.product.price, 
      rating: data.product.rating, 
      image_url: data.product.image_url, 
      sold: data.product.sold
    }]}
    postMutation.mutate(newCart)
  }

  // Get updated Cart, if already in cache then take data cart from cache and combine cart data with "Post Cart", So in cart page you will get the updated cart data. Be the fast with cache data.
  // but if the cart data on the server changes then the cart data in the cache will also change. This is the Performant and the powerful data synchronization.
  const fetchCart = async () => {
    return ApiQuery("cart/list", "GET")
  }
  const { isLoading: isLoadingCart, isError: isErrorCart, data: dataCart, error: errorCart } = useQuery("cart", fetchCart)

  /*--------------------- END LOGIC FOR PERFORMANCE -----------------------*/

  useEffect(() => {
    setIsMounted(true)

    return function cleanup() {
      setIsMounted(false)
    };
  }, []);

  return (
    <div className="default-content">
      <Head>
        <title>Product {query.slug}</title>
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
            : (data.product.length < 1) ?
              (<span>Wishlist is empty</span>)
              :
              (<>
                <nav className="navbar is-fixed-bottom my-page-width" role="navigation">
                  <div className="navbar-menu pb-0">
                    <div className="navbar-item pt-1 is-expanded is-block  has-text-centered">
                      <b className="is-size-5 mb-0">{data.product.price}</b>
                    </div>
                    <div className="navbar-item pt-0 pb-0 is-expanded is-block has-text-centered">
                      <div className="button is-info br-sm is-fullwidth mt-0 mb-0" onClick={insertCart}>Buy</div>
                    </div>
                  </div>
                </nav>

                <div className="section pt-2 my-page-width">
                  <div className="card mb-5 br-lg">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={data.product.image_url} alt={data.product.title} className="img-detail-product" />
                      </figure>
                    </div>
                  </div>
                  <div className="is-relative">
                    <div className="title is-4 mb-2">{data.product.title}</div>
                    {isMounted&&
                      <Wishlist className="heart-product-detail" id={data.product.id} />
                    }
                  </div>
                  <div className="mt-5">
                    <div className="title ttl mb-2">Description</div>
                    <div dangerouslySetInnerHTML={createMarkup(data.product.description)} />
                  </div>
                  <br />
                </div>
              </>
              )
      }
    </div>
  )
}
