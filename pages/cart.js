import Head from 'next/head'
import { useQuery } from 'react-query'
import ApiQuery from '../components/ApiQuery'
import Back from '../components/Back'

export default function Cart() {
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const fetchTodoList = async () => {
    await sleep(2000)
    return ApiQuery("cart/list", "GET")
  }
  const { isLoading, isError, data, error } = useQuery("cart", fetchTodoList)

  return (
    <div className="default-content">
      <Head>
        <title>Purchase History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
        <div className="p-4 nav-item">
          <Back />
        </div>
        <div className="pl-0 pt-4 pb-4 nav-item has-text-grey">
          Purcase History
        </div>
      </nav>

      <div className="section pt-4 my-page-width">
        {
          (isLoading) ?
            (<div>Loading...</div>)
            : (isError) ?
              (<span>Error: {error.message}</span>)
              : (data.product.length < 1) ?
                (<span>Cart is empty</span>)
                :
                (
                  <div className="container">
                    {data.product.map(product => (
                      <div className="br-lg mb-5 is-flex">
                        <figure class="image is-128x128">
                          <img src={product.image_url} className="image-cart" />
                        </figure>
                        <div className="p-4">
                          <div>{product.title}</div>
                          <div className="title is-5 mt-4">{product.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
        }
        <br />
      </div>
    </div>
  )
}
