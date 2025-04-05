import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'

const HomeLoading = () => {
  return (

        <ReusableCenterLayout
        child1={()=>(
            <></>
        )}
        child2={()=>(
            <>
            </>
    )}
        child3={()=>(
            <div className='messagesUL'>
                <div className='messagesLI' >
                    <div>
                        <div className='messageSender'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"20px",width:"100%"}}></div>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"20px",width:"100%"}}></div>
                        </div>
                        <div className='messageBody'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"200px"}}></div>
                        </div>
                        <div className='messageReactions'>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>

                        </div>
                    </div>
                </div>
                <div className='messagesLI' >
                    <div>
                        <div className='messageSender'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"30px",width:"100%"}}></div>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"30px",width:"100%"}}></div>
                        </div>
                        <div className='messageBody'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"200px"}}></div>
                        </div>
                        <div className='messageReactions'>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>

                        </div>
                    </div>
                </div>
                <div className='messagesLI' >
                    <div>
                        <div className='messageSender'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"30px",width:"100%"}}></div>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"30px",width:"100%"}}></div>
                        </div>
                        <div className='messageBody'>
                            <div className='loading-screen' style={{boxSizing:"border-box",height:"200px"}}></div>
                        </div>
                        <div className='messageReactions'>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>
                        <div className='loading-screen' style={{boxSizing:"border-box",height:"30px"}}></div>

                        </div>
                    </div>
                </div>
            </div>
        )}
        child4={()=>(<></>)}
    />
  )
}

export default HomeLoading
