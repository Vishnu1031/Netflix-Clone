import React from 'react'
import { IMG_CDNURL } from '../../Utils/constants/constants'

const MovieCard = ({cardPath}) => {
  return (
    <div className='w-48 m-2 p-2'>
        <img
        alt="movie-card"
        src={`${IMG_CDNURL}${cardPath}`}
        />
    </div>
  )
}

export default MovieCard