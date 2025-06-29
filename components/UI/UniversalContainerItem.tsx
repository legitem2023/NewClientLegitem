import React from 'react';
import { Icon } from '@iconify/react';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import ReusableText from 'components/Reusable/ReusableText';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import Image from 'next/image';
import { imageSource, noOfDays } from 'utils/scripts';
import Element_Title from './Element_Title';

interface UniversalContainerItemProps {
  title: string;
  thumbnail: string;
  summary: string;
  dateCreated: string;
  index: number;
}

const UniversalContainerItem: React.FC<UniversalContainerItemProps> = ({
  title,
  thumbnail,
  summary,
  dateCreated,
  index,
}) => {
  return (
    <div style={{ aspectRatio:'1/2', width:'100%',boxSizing:'border-box' }} className='ReusableCardContainer'>
      <div className='ReusableCardContainer_1'>
        <Image
          src={imageSource(thumbnail)}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          alt={`image${index}`}
        />
      </div>

      <div className='ReusableCardContainer_1'>
        <Element_Title Label="" value={title} />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <HtmlRenderer htmlContent={summary} />
        </div>
        <ReusableText label={noOfDays(dateCreated)} />   
      </div>
    </div>
  );
};

export default UniversalContainerItem;
