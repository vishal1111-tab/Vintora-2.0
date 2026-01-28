import React from 'react'
import SingleBannerCarousel from './SingleBannerCarousel'
import ProductCardsCarousel from './ProductCardsCarousel'

function HomePage() {
  return (
    <div>
        <SingleBannerCarousel></SingleBannerCarousel>
        <ProductCardsCarousel></ProductCardsCarousel>
        <ProductCardsCarousel></ProductCardsCarousel>
    </div>
  )
}

export default HomePage