import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'

const ProductLoading = () => {
  return (
            <ReusableCenterLayout
                child1={()=>(
                <div style={{height:"45px",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #c0c0c0'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>
                )}
                child2={()=>(
                <div className="card" style={{width:"100%",aspectRatio:"4 / 3",gap:"2px",marginTop:'5px',marginBottom:'5px',boxShadow:'0.5px 0.5px 3px #c0c0c0'}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>
                )}
                child3={()=>(
                    <div className="Thumbnails">
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                        <div className='thumbnailImageContainer'>
                            <div className='loading-screen'></div>
                        </div>
                        <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                                    
                            </div>
                    </div>
                    <div className='thumbnail'>
                        <div className='thumbnailImageContainer'>
                            <div className='loading-screen'></div>
                        </div>
                        <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                                    
                            </div>
                    </div>
                    <div className='thumbnail'>
                        <div className='thumbnailImageContainer'>
                            <div className='loading-screen'></div>
                        </div>
                        <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                                    
                            </div>
                    </div>
                    <div className='thumbnail'>
                        <div className='thumbnailImageContainer'>
                            <div className='loading-screen'></div>
                        </div>
                        <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                                  
                            </div>
                    </div>
                    <div className='thumbnail'>
                        <div className='thumbnailImageContainer'>
                            <div className='loading-screen'></div>
                        </div>
                        <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div> 
                        </div>
                    </div>
                    </div>
                )}
                child4={()=>(<></>)}
            />
  )
}

export default ProductLoading
