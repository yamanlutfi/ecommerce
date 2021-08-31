import Head from 'next/head'
import { QueryClient, useQuery, useMutation, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
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
  const refModal = useRef(null)
  const refBtn = useRef(null)

  /*------------------ START LOGIC FOR PERFORMANCE --------------------*/

  const queryClient = useQueryClient()
  const [isMounted, setIsMounted] = useState(false)
  const { isLoading, isError, data, error } = useQuery(['detailProduct', query.slug], fetchProduct.bind(this, query.slug))

  // Post Cart
  const postCart = () => {
    const body = {
      product_id: data.product.id
    }
    return ApiQuery("cart/insert", "POST", body)
  }
  const postMutation = useMutation(postCart, {
    onMutate: data => {
      queryClient.setQueryData("cart", data)
    },
    onSuccess: data => {
      refModal.current.classList.add("is-active")
      refBtn.current.disabled = false
      refBtn.current.innerHTML = "Buy"
    }
  })
  const insertCart = () => {
    refBtn.current.disabled = true
    refBtn.current.innerHTML = "Loading..."

    // Save data cart to cache (Combine Cart data in cache with cart data that you Post)
    const newCart = {
      product: [...dataCart.product, {
        product_id: data.product.id,
        slug: data.product.slug,
        title: data.product.title,
        description: data.product.description,
        price: data.product.price,
        rating: data.product.rating,
        image_url: data.product.image_url,
        sold: data.product.sold
      }]
    }
    postMutation.mutate(newCart)
  }

  // Get updated Cart, if already in cache then take data cart from cache and combine cart data with "Post Cart", So in cart page you will get the updated cart data. Be the fast with cache data.
  // but if the cart data on the server changes then the cart data in the cache will also change. This is the Performant and the powerful data synchronization.
  const fetchCart = async () => {
    return ApiQuery("cart/list", "GET")
  }
  const { isLoading: isLoadingCart, isError: isErrorCart, data: dataCart, error: errorCart } = useQuery("cart", fetchCart)

  /*--------------------- END LOGIC FOR PERFORMANCE -----------------------*/

  /*------------------ START SETUP FOR SEO --------------------*/

  // For Meta  
  const title = `Jastip - Jual beli ${data.product.title} | eCommerce`
  const description = `Jual ${data.product.title}. ${(data.product.description) ? data.product.description.replace(/<[^>]*>?/gm, '').replace(/[\n\r]+/g, ' ').trim() : ""} - eCommerce`
  const canonical = "http://localhost:3000/product/" + data.product.slug
  const image_product = data.product.image_url

  // Schema Product Detail
  const DetailProductSchema = (data.product.rating > 0) ?
    {
      "@context": "http://schema.org",
      "@type": "Product",
      "name": title,
      "description": description,
      "url": (data.product.title) ? 'https://eCommerce.id/product/' + data.product.slug : "",
      "productID": data.product.product_id,
      "image": image_product,
      "brand": (data.product.manufacturer) ? data.product.manufacturer.trim() : "",
      "offers":
        (data.product.discount_price !== data.product.price) ?
          {
            "@type": "AggregateOffer",
            "lowPrice": (data.product.discount_price) ? data.product.discount_price : 0,
            "highPrice": (data.product.price) ? data.product.price : 0,
            "priceCurrency": "USD",
          }
          :
          {
            "@type": "Offer",
            "price": (data.product.price) ? data.product.price : 0,
            "priceCurrency": "USD",
          },
      "aggregateRating": {
        "@type": "AggregateRating",
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": data.product.rating_count,
        "ratingValue": data.product.rating
      }
    }
    :
    {
      "@context": "http://schema.org",
      "@type": "Product",
      "name": title,
      "description": description,
      "url": (data.product.title) ? 'https://eCommerce.id/product/' + data.product.slug + '/' + data.product.product_id : "",
      "productID": data.product.product_id,
      "image": image_product,
      "brand": (data.product.manufacturer) ? data.product.manufacturer.trim() : "",
      "offers":
        (data.product.price !== data.product.discount_price) ?
          {
            "@type": "AggregateOffer",
            "lowPrice": (data.product.discount_price) ? data.product.discount_price : 0,
            "highPrice": (data.product.price) ? data.product.price : 0,
            "priceCurrency": "USD",
          }
          :
          {
            "@type": "Offer",
            "price": (data.product.price) ? data.product.price : 0,
            "priceCurrency": "USD",
          }
    }

  /*------------------ End SETUP FOR SEO --------------------*/

  const closeModal = () => {
    refModal.current.classList.remove("is-active")
  }

  useEffect(() => {
    setIsMounted(true)

    return function cleanup() {
      setIsMounted(false)
    };
  }, []);

  return (
    <div className="default-content">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="eCommerce.id" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={title} />

        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="eCommerce" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={(image_product) ? image_product : 'https://d3ol8ih1xbmzso.cloudfront.net/images/logo/eCommerce_id.png'} />
        <meta property="og:type" content="product" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(DetailProductSchema) }}
        />
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
              (<span>Product not found</span>)
              :
              (<>
                <nav className="navbar is-fixed-bottom my-page-width" role="navigation">
                  <div className="navbar-menu pb-0">
                    <div className="navbar-item pt-1 is-expanded is-block  has-text-centered">
                      <b className="is-size-5 mb-0">{data.product.price}</b>
                    </div>
                    <div className="navbar-item pt-0 pb-0 is-expanded is-block has-text-centered">
                      <div ref={refBtn} className="button is-info br-sm is-fullwidth mt-0 mb-0" onClick={insertCart}>Buy</div>
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
                    <h1 className="title is-4 mb-2 pr-5">{data.product.title}</h1>
                    {isMounted &&
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
      <div ref={refModal} className="modal pl-5 pr-5">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-content has-background-white pb-5 pt-5 pl-5 br-lg">
          <span className="icon-text">
            <span className="icon mr-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-26 has-text-info" />
            </span>
            <span className="title is-5">Add to cart successfully</span>
          </span>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </div>
  )
}
