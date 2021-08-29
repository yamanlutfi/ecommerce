import Head from 'next/head'
import { useQuery } from 'react-query'
import Back from '../components/Back'

export default function Cart() {
  const fetchTodoList = () => {
    return fetch('https://private-4639ce-ecommerce56.apiary-mock.com/home').then(res =>
      res.json()
    )
  }
  const { isLoading, isError, data, error } = useQuery('home', fetchTodoList)

  return (
    <div className="default-content">
      <Head>
        <title>Purchase History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
        <div className="p-4 nav-item">
          <Back/>
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
              :
              (
                <div className="container">
                  {data[0].data.productPromo.map(product => (
                    <div className="br-lg mb-5 is-flex">
                      <figure class="image is-128x128">
                        <img src={product.imageUrl} className="image-cart"/>
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
        <br/>
      </div>
    </div>
  )
}
