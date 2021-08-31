import replaceAll from 'replaceall'

const SearchSchema = (data,query,perPage,page) => {
      
    // For Canonical
    var lastOffset = query.page * 1
    const q_sort = (query.sort)?'&sort='+query.sort : ""
    const q_cat_id = (query.catId)?'&cat_id='+query.catId : ""
    page = page+'?'
    var prevUrl = (lastOffset !== 0)?`${page}`+q_sort+q_cat_id+"&page="+(lastOffset - 1 ) : ''
    prevUrl = prevUrl.toString().replace('?&','?')
    prevUrl = replaceAll(' ', '-', prevUrl)
    var nextUrl = (Math.trunc(data.total / perPage) > lastOffset && (lastOffset !== (lastOffset + 1) ) )? `${page}`+q_sort+q_cat_id+"&page="+(lastOffset + 1) : ''
    nextUrl = nextUrl.toString().replace('?&','?')
    nextUrl = replaceAll(' ', '-', nextUrl)
    
    var canonical = page.toString().replace('?','')

    // For Schema
      var schemaProductList = ''
      if(data.product.length > 0){
        schemaProductList = data.product.map( (dataProduct)=>
          (
            (dataProduct.rating_count > 0)?
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": dataProduct.title,
              "description": (dataProduct.description)? dataProduct.description.replace(/<[^>]*>?/gm, '').replace(/[\n\r]+/g, ' ').trim() : "",
              "url": (dataProduct.title)? 'https://ecommerce.id/product/'+dataProduct.slug: "",
              "productID": dataProduct.id,
              "image": dataProduct.image,
              "brand": "",
              "offers": 
                (dataProduct.price !== data.discount_price)?
                {
                  "@type": "AggregateOffer",
                  "lowPrice": (dataProduct.discount_price)? dataProduct.discount_price : 0,
                  "highPrice": (dataProduct.price)? dataProduct : 0,
                  "priceCurrency": "IDR",
                  "availability": "http://schema.org/InStock"
                }
                :
                {
                  "@type": "Offer",
                  "price": (dataProduct.price)? dataProduct : 0,
                  "priceCurrency": "IDR",
                  "availability": "http://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "bestRating": 5,
                  "worstRating": 1,
                  "ratingCount": dataProduct.rating_count,
                  "ratingValue": dataProduct.rating
                }
            }
            :
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": dataProduct.title,
              "description": (dataProduct.description)? dataProduct.description.replace(/<[^>]*>?/gm, '').replace(/[\n\r]+/g, ' ').trim() : "",
              "url": (dataProduct.title)? 'https://eporter.id/product/'+dataProduct.slug : "",
              "productID": dataProduct.id,
              "image": dataProduct.image,
              "brand": "",
              "offers": 
                (dataProduct.price !== dataProduct.discount_price)?
                {
                  "@type": "AggregateOffer",
                  "lowPrice": (dataProduct.discount_price)? dataProduct.discount_price : 0,
                  "highPrice": (dataProduct.price)? dataProduct : 0,
                  "priceCurrency": "IDR",
                  "availability": "http://schema.org/InStock"
                }
                :
                {
                  "@type": "Offer",
                  "price": (dataProduct.price)? dataProduct : 0,
                  "priceCurrency": "IDR",
                  "availability": "http://schema.org/InStock"
                }
            }
          )
      );
    }
    return {
        prevUrl,
        nextUrl,
        schemaProductList,
        canonical
    }
}

export default SearchSchema