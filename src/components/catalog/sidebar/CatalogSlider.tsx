import React, { useState } from 'react'
import { DualRangeSlider } from '../../ui/slider'

interface CatalogSliderProps {
    setPrice: (v: number[]) => void,
}

export default function CatalogSlider({setPrice}: CatalogSliderProps) {
  const [currPrice, setCurrPrice] = useState([0, 5000]);
  return (
    <div className='pb-4'>
        <div className='flex justify-between mb-3'>
            <p>Min: <span className='font-semibold'>{currPrice[0]}</span></p>
            <p>Max: <span className='font-semibold'>{currPrice[1]}</span></p>
        </div>
        <DualRangeSlider
              minStepsBetweenThumbs={2}
              value={currPrice}
              onValueChange={
                (values) => {
                  setCurrPrice(values);
                }
              }
              onValueCommit={(values) => {
                setPrice(values)
              }}
              min={0}
              max={5000}
              step={1}
          />
    </div>
  )
}