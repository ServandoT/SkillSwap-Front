import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Clase from './Clase'
import '../styles/EmblaCarousel.css'

export function EmblaCarousel( {clases}) {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {clases.map((clase) => (
          <Clase className="embla__slide" key={clase.id} clase={clase} />
        ))}
      </div>
    </div>
  )
}
