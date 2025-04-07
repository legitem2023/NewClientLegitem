import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import React from 'react'

const LikesLoading = () => {
  return (
    <ReusableCenterLayout
      child1={() =><></>}
      child2={() =><></>}
      child3={() =>(
        <div
          style={{ overflowY: 'auto', height: 'auto', scrollbarWidth: 'none' }} // Set height to auto
        >
         <div className="LikeContainer">
           {[...Array(10)].map((_, index) => (
             <div key={index} className='loading-screen' style={{height:150,margin:"4px"}}></div>
           ))}
         </div>
        </div>
          )
      }
      child4={() =><></>}
    />
  )
}

export default LikesLoading
