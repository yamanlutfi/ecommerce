import ApiQuery from './ApiQuery'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const Wishlist = (props) => {
  const queryClient = useQueryClient()

  // Check wishlist
  const fetchWishlist = () => {
    return ApiQuery("wishlist/check_wishlist/"+props.id,"GET")
  }
  const { isLoading: isLoadingWishlist, isError: isErrorWishlist, data: dataWishlist, error: errorWishlist } = useQuery(["wishlist", localStorage.getItem("token"), props.id], fetchWishlist)

  // Edit wishlist status cache In all page (Home, Product Search and Detail Product)
  // Post Wishlist
  const postWishlist = () => {
    const body = {
      product_id: props.id
    }
    return ApiQuery("wishlist/insert","POST",body)
  }
  const postMutation = useMutation(postWishlist, {
    onMutate: data => {
      queryClient.setQueryData(["wishlist", localStorage.getItem("token"), props.id], data)
    }
  })

  // Delete Wishlist
  const deleteWishlist = () => {
    return ApiQuery("wishlist/del/"+props.id,"DELETE")
  }
  const deleteMutation = useMutation(deleteWishlist, {
    onMutate: data => {
      queryClient.setQueryData(["wishlist", localStorage.getItem("token"), props.id], data)
    }
  })

  const wishlistAnimation = () => {
    if(dataWishlist.is_my_wishlist == "is-active"){
      // save data wishlist to cache
      deleteMutation.mutate({
        is_my_wishlist: "",
        status: "success"
      })
    }else{
      // save data wishlist to cache
      postMutation.mutate({
        is_my_wishlist: "is-active",
        status: "success"
      })
    }
  }

  if(isLoadingWishlist){
    return (<div>Loading</div>)
  }else if(isErrorWishlist){
    return (<div>{errorWishlist}</div>)
  }

  return (
    <div className={"heart "+props.className+" "+dataWishlist.is_my_wishlist}>
      <div className="heart-click" onClick={wishlistAnimation}></div>
    </div>
  )
}

export default Wishlist;