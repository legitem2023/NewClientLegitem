import React from 'react'
import './Loading.css';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      top: 0, 
      width: '100%',
      WebkitOverflowScrolling: 'touch' // Safari momentum scrolling
    }}>
      
      <div className="Header" style={{ WebkitTransform: 'translate3d(0,0,0)' }}>  
        <div className="HeaderRight">  
          <div style={{ padding: '5px' }}>  
            <div style={{ 
                height: '40px', 
                width: 'auto',
                maxWidth: '100%' // Safari image sizing fix
              }}>
                <div className='loading-screen' style={{boxSizing:"border-box"}}></div>
            </div>  
          </div>  
          
        </div> 
        
        <div className="HeaderLeft">  
          <div className="Navigation">  
            <div className="HeaderNav" style={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              WebkitBoxPack: 'justify' // Safari flexbox fallback
            }}>  
  
                <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  
                <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  
                <nav                    
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <div style={{borderRadius:'100%',height:"25px",width:"25px",gap:"2px",marginBottom:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className='loading-screen' style={{borderRadius:'100%',height:"25px",width:"25px",boxSizing:"border-box"}}></div>
                  </div>  
                </nav>  
            </div>  
          </div>  
        </div>  
      </div>    
    </div>
  )
}
export default Loading
