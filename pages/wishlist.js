import Head from 'next/head'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Back from '../components/Back';
import Product from '../components/Product';

export default function Wishlist() {
  const fetchTodoList = () => {
    return fetch('https://private-4639ce-ecommerce56.apiary-mock.com/home').then(res =>
      res.json()
    )
  }
  const { isLoading, isError, data, error } = useQuery('home', fetchTodoList)

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
    </div>
  )
}
