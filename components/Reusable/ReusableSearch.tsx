import { Icon } from '@iconify/react';
import React, { FC, ReactNode } from 'react'
type ReusableSearchProps = {
    search:(event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    sort:(event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    trigger:(event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
const ReusableSearch:FC<ReusableSearchProps> = ({search,sort,trigger}) => {
  return (
        <div className='searchContaier'>
            {/* <div><input type='text' placeholder='Search' onChange={(e: any) => search(e)}></input></div> */}
            <div>
            <label htmlFor="mySelect" className='hidden'>Choose an option:</label>
            <select onChange={(e:any) => sort(e)}>
                <option value=''>Sort</option>
                <option value='name'>By Name</option>
                <option value='price'>By Price</option>
            </select>
            </div>
            <div>
                <button onClick={()=>trigger} aria-label='sort'>
                <Icon icon="bx:sort" />
                </button>
            </div>
        </div>
  )
}

export default ReusableSearch