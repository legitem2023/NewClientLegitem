import React, { useState } from 'react'
import { GET_CHILD_INVENTORY_RELATED_COLOR_SIZE } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { imageSourceGallery } from 'utils/scripts'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setViewedProd } from 'Redux/viewedProdSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import ReusableFirstLetterImage from 'components/Reusable/ReusableFirstLetterImage'

interface RelatedSizeProps {
  styleCode: string
  currentsize: string
}

const RelatedSize: React.FC<RelatedSizeProps> = ({ styleCode, currentsize }) => {
  const { data, loading, error } = useQuery(GET_CHILD_INVENTORY_RELATED_COLOR_SIZE, {
    variables: {
      styleCode: styleCode,
    },
  })

  const dispatch = useDispatch()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const path = process.env.NEXT_PUBLIC_PATH

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading related sizes.</p>

  const view = (item: any) => {
    dispatch(setViewedProd([item]))
  }

  return (
    <Swiper
      modules={[Navigation, Thumbs, Autoplay]}
      slidesPerView={4}
      spaceBetween={10}
      watchSlidesProgress
      thumbs={{ swiper: thumbsSwiper }}
    >
      {data?.getChildInventory_details?.map((item: any) => (
        <SwiperSlide
          key={item.id}
          onClick={() => view(item)}
          style={{
              display: 'flex', flexDirection: 'column',
              height: '35px',
              width: '50%',
              border: currentsize === item.size ? 'solid 2px brown' : 'solid 2px white',
            }}
        >{item.size}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default RelatedSize
