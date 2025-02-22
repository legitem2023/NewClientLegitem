import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import React from 'react'

const ProductLoading = () => {
  return (
            <ReusableCenterLayout
                child1={()=>(
                    <></>
                // <div className='card' style={{height:"30vh",marginBottom:"5px",boxShadow:"0.5px 0.5px 3px #000000"}}>
                //     <div className='loading-screen'></div>
                // </div>
                )}
                child2={()=>(
                <div className='searchContaier' style={{height:"45px",gap:"5px"}}>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                    <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
                </div>)}
                child3={()=>(
                    <div className="Thumbnails">
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'></div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
                                    <div className='loading-screen'></div>
                                    <div className='loading-screen'></div>
                            </div>
                        </div>
                        <div className='thumbnail'>
                            <div className='thumbnailImageContainer'>
                                <div className='loading-screen'>Free Tier has cold start expect 30 delay</div>
                            </div>
                            <div className='labels'>
                                    <div className='loading-screen'></div>    
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
