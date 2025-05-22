import React from 'react';
import { Icon } from '@iconify/react';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import Image from 'next/image';
import { imageSource } from 'utils/scripts';

interface UniversalContainerItemProps {
  title: string;
  thumbnail: string;
  summary: string;
  dateCreated: string;
  index: number;
}

const UniversalContainerItem: React.FC<UniversalContainerItemProps> = ({ title, thumbnail, summary, dateCreated, index }) => {
 
  return (
    <div className="ReusableCardContainer">
      <div className="ReusableCardContainer_1">
        <Image src={imageSource(thumbnail)} height={100} width={200} alt={`image${index}`} />
      </div>
      <div className="ReusableCardContainer_1">
        <HtmlRenderer htmlContent={summary} />
        <TimestampConverter timestamp={dateCreated} />
      </div>
    </div>
  );
};

export default UniversalContainerItem;
