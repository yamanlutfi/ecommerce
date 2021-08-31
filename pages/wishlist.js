import Head from 'next/head'
import { useQuery } from 'react-query'
import Back from '../components/Back';
import Product from '../components/Product';
import ApiQuery from '../components/ApiQuery';

export default function Wishlist() {
  const fetchTodoList = () => {
    return ApiQuery("wishlist/list","GET")
  }
  const { isLoading, isError, data, error } = useQuery('productWishlist', fetchTodoList)

  return (
    <div className="default-content">
      <Head>
        <title>Wishlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
        <div className="p-4 nav-item">
          <Back/>
        </div>
        <div className="pl-0 pt-4 pb-4 nav-item has-text-grey">
          Wishlist
        </div>
      </nav>

      <div className="section pt-4 my-page-width">
        {
          (isLoading) ?
            (<div>Loading...</div>)
            : (isError) ?
              (<span>Error: {error.message}</span>)
              : (data.product.length < 1) ?
              (<span>Wishlist is empty</span>)
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
    </div>
  )
}
