import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'
const CrowdLoading = () => {
  return (
        <ReusableCenterLayout
        child1={()=>(
            <></>
        )}
        child2={()=>(
            <div style={{display:"flex",flexDirection:"column"}} className="Messenger_inputs">
                <div className='Messenger_inputs_fdiv'>
                    <div className='loading-screen' style={{boxSizing:"border-box",height:"40px"}}></div>
                </div>
            </div>
    )}
        child3={()=>(
            <div className='messagesUL' style={{boxShadow:"0.5px 0.5px 3px #c0c0c0"}}>
                <div className='messagesLI' style={{marginBottom:"15px"}}>
                    <div>
                        <div className='messageSender'>
                            <div className='messageSenderImgcont'>
                                <div className='loading-screen' style={{width:"40px",height:"40px",borderRadius:"100%"}}></div>
                            </div>
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
                <div className='messagesLI' style={{marginBottom:"25px"}}>
                    <div>
                        <div className='messageSender'>
                            <div className='messageSenderImgcont'>
                            <div className='loading-screen' style={{width:"50px",height:"50px",borderRadius:"100%"}}></div>
                            </div>
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
                <div className='messagesLI' style={{marginBottom:"25px"}}>
                    <div>
                        <div className='messageSender'>
                            <div className='messageSenderImgcont'>
                            <div className='loading-screen' style={{width:"50px",height:"50px",borderRadius:"100%"}}></div>
                            </div>
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

export default CrowdLoading
