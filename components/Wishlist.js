import { useRef } from 'react'

const Wishlist = (props) => {
  const refWishlist = useRef(null)

  const wishlistAnimation = () => {
    const span = refWishlist.current;
    if(span.classList.contains("is-active") == true){
      span.classList.remove("is-active")
    }else{
      span.classList.add("is-active")
    }
  };

  return (
    <div ref={refWishlist} className={"heart "+props.className}>
      <div className="heart-click" onClick={wishlistAnimation}></div>
    </div>
  )
}

export default Wishlist;