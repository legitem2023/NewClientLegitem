import React from 'react'

type PropsElement = {
    "Label":string,
    "value":any,
}
const Element_Title:React.FC<PropsElement> = ({Label,value}) => {
  return (
    <div className="UniversalLabels">
      <span className='thumbElements_title'>{value}</span>
    </div>
  )
}

export default Element_Title
