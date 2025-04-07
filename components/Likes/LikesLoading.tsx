import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import React from 'react'

const LikesLoading = () => {
  return (
    <ReusableCenterLayout
      child1={() =>
        <div style={{height:"45px", gap:"2px", marginTop:'5px', marginBottom:'5px', boxShadow:'0.5px 0.5px 3px #c0c0c0'}}>
          <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
        </div>
      }
      child2={() =>
        <div className="card" style={{height:"200px", gap:"2px", marginTop:'5px', marginBottom:'5px', boxShadow:'0.5px 0.5px 3px #c0c0c0'}}>
          <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
        </div>
      }
      child3={() =>
        <div className="LikeContainer">
          {[...Array(10)].map((_, index) => (
            <div key={index} className='loading-screen' style={{height:150}}></div>
          ))}
        </div>
      }
      child4={() =><></>}
    />
  )
}

export default LikesLoading
