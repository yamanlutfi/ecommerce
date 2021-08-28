import Head from 'next/head'
import { useQuery } from 'react-query'
import Default from '../components/layout/Default'
import Product from '../components/Product';

/* Slide feature */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar"
import SwiperCore, {
  Mousewheel,
  Scrollbar
} from 'swiper';
SwiperCore.use([Scrollbar]);

export default function Home() {
  const fetchTodoList = () => {
    return fetch('https://private-4639ce-ecommerce56.apiary-mock.com/home').then(res =>
      res.json()
    )
  }
  const { isLoading, isError, data, error } = useQuery('home', fetchTodoList)

  return (
    <Default>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        (isLoading) ?
          (<div>Loading...</div>)
          : (isError) ?
            (<span>Error: {error.message}</span>)
            :
            (

              <Swiper
                centerInsufficientSlides={true}
                spaceBetween={5}
                slidesPerView={3.4}
                breakpoints={{
                  // 1024: {
                  //   slidesPerView: 3.4,
                  //   spaceBetween: 5,
                  // },
                  768: {
                    slidesPerView: 7.6,
                    spaceBetween: 45,
                  },
                  600: {
                    slidesPerView: 7.2,
                    spaceBetween: 40,
                  },
                  455: {
                    slidesPerView: 5.8,
                    spaceBetween: 35,
                  },
                  400: {
                    slidesPerView: 4.6,
                    spaceBetween: 30,
                  },
                  321: {
                    slidesPerView: 4.7,
                    spaceBetween: 22,
                  },
                  0: {
                    slidesPerView: 4.3,
                    spaceBetween: 16,
                  }
                }} className="mySwiper">
                {data[0].data.category.map(category => (
                  <SwiperSlide key={category.id}>
                    <div className="p-2 br-md is-vcentered">
                      <img src={category.imageUrl} className="is-block" />
                    </div>
                    <div className="fs-12 has-text-centered mt-1">{category.name}</div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )
      }
      <div className="section">
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
    </Default>
  )
}
