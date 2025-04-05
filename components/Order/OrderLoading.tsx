import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'

const OrderLoading = () => {
  let clipPathA = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"; // Middle tabs (arrow on both sides)      
  let clipPathB = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"; // First tab (flat left, arrow right)        
  let clipPathC = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)"; // Last tab (arrow left, flat right)
          
  return (
            <ReusableCenterLayout
                child1={()=>(
                <div style={{padding:'2px'}}>
                <div style={{height:"40px",
                             gap:"2px",
                             display:'grid',
                             gridTemplateColumns:'14% 14% 14% 14% 14% 14% 14%', 
                             marginTop:'5px',
                             marginBottom:'5px',
                             boxShadow:'0.5px 0.5px 3px #000000'}}>
          <div className='loading-screen'
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                clipPathA,
                borderRadius: "3px",
                padding: "8px 17px"
              }}></div>
<div className='loading-screen'
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                clipPathB,
                borderRadius: "3px",
                padding: "8px 17px"
              }}></div>                  <div className='loading-screen' style={{boxSizing:"border-box",clipPathB}}></div>                  <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
<div className='loading-screen'
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                clipPathB,
                borderRadius: "3px",
                padding: "8px 17px"
              }}></div>                  
<div className='loading-screen'
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                clipPathC,
                borderRadius: "3px",
                padding: "8px 17px"
              }}></div>                </div>
                )}
                child2={()=>(
                <div style={{padding:'2px'}}>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                  <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                  </div>
                </div>
                )}
                child3={()=>(
                <div style={{padding:'2px'}}>
                </div>
                )}
                child4={()=>(<></>)}
            />
  )
}

export default OrderLoading
