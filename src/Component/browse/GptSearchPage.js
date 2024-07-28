import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { background_Img } from '../../Utils/constants/constants'

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={background_Img} alt="background-img" />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch