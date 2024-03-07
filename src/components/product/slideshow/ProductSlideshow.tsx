'use client'

import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { type Swiper as SwiperObject } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './slideshow.css'
import Image from 'next/image'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={image}>
            <Image
              className="rounded-lg object-fill"
              src={`/products/${image}`}
              alt={title}
              width={1024}
              height={800}
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              className="rounded-lg object-fill"
              src={`/products/${image}`}
              alt={title}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
