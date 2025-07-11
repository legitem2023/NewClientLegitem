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
    <div key={index} className='ReusableCardContainer' style={{padding:'5px'}}>
      <div className='ReusableCardContainer_1'>
        <Image
          src={imageSource(thumbnail)}
          height={100}
          width={100}
          style={{ aspectRatio:'1/1',border:'solid 1px #cccccc',boxSizing:'border-box' }} alt={`image${index}`}
        />
      </div>
      <div className='ReusableCardContainer_1'>
        <Element_Title Label="" value={title} />
        <HtmlRenderer htmlContent={summary} />
        <ReusableText label={noOfDays(dateCreated)} />  
      </div>
    </div>
  );
};

export default UniversalContainerItem;
