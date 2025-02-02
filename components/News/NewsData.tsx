'use client';
import News from './News';
import PostedBy from './PostedBy';
import React from 'react';
import ReusableMainLayout from 'components/Layout/ReusableMainLayout';

const NewsData:React.FC = () => {

  return (
    <ReusableMainLayout
      childA={()=>(<PostedBy/>)}
      childB={()=>(
        <News/>
      )}
      childC={()=><></>}
    ></ReusableMainLayout>
  );
};

export default NewsData;
