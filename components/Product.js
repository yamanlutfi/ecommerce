import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Wishlist from './Wishlist'

const Product = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return function cleanup() {
      setIsMounted(false)
    };
  }, []);

  return (
    <div className="is-relative">
      <Link href={"/product/"+props.product.slug}>
        <a>
        <div className="card mb-5 br-lg">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={props.product.image_url} alt={props.product.title} className="img-product" />
            </figure>
          </div>
          <div className="card-content">
            <div className="content mb-1">
              <h6>{props.product.title}</h6>
              <h2 className="mt-0">{props.product.price}</h2>
              <div className="mt-5">
                <span className="br-sm p-2"><FontAwesomeIcon icon={faStar} className="w-18 has-text-warning" /> <small className="has-text-grey">{props.product.rating}</small></span> <small className="has-text-grey br-sm p-s">Sold {props.product.sold}</small>
              </div>
            </div>
          </div>
        </div>
        </a>
      </Link>
      {isMounted&&
        <Wishlist className="heart-product-list" id={props.product.id}/>
      }
    </div>
  )
}

export default Product;