import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'

const OrderLoading = () => {
  return (
            <ReusableCenterLayout
                child1={()=>(
                <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>
                )}
                child2={()=>(
                <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>
                )}
                child3={()=>(
                <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #000000'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>
                )}
                child4={()=>(<></>)}
            />
  )
}

export default OrderLoading
