import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Wishlist from './Wishlist'

const Product = (props) => {
  return (
    <div className="card mb-5 br-lg">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.product.imageUrl} alt={props.product.title} className="img-product" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content mb-1">
          <h6>{props.product.title}</h6>
          <h2 className="mt-0">{props.product.price}</h2>
          <div className="mt-5">
            <span className="br-sm p-2"><FontAwesomeIcon icon={faStar} className="w-18 has-text-warning" /> <small className="has-text-grey">4.5</small></span> <small className="has-text-grey br-sm p-s">Sold 250</small>
            <Wishlist className="heart-product-list"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;