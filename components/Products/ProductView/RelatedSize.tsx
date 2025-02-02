import React from 'react'
import { GET_CHILD_INVENTORY_RELATED_COLOR_SIZE } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { imageSourceGallery } from 'utils/scripts'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setViewedProd } from 'Redux/viewedProdSlice'
const RelatedSize = ({styleCode}) => {
    const {data,loading,error} = useQuery(GET_CHILD_INVENTORY_RELATED_COLOR_SIZE,{
        variables:{
            styleCode:styleCode
        }
    })
    const dispatch = useDispatch();

    const path = process.env.NEXT_PUBLIC_PATH;

    if(loading) return;
    if(error) return
      const view = (item:any) =>{
        console.log([item]);
        dispatch(setViewedProd([item]))
      }
    return (
    <div className='colorSelection'>{
        data.getChildInventory_details.map((item:any)=>(
            <div key={item.id} onClick={()=>view(item)}>
                {item.size}
            </div>
        ))
    }</div>
  )
}

export default RelatedSize