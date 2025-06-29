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
    <div
      className="UniversalContainerItem"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        aspectRatio: '1 / 2',
        boxSizing: 'border-box',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: '0 0 auto',
          width: '150px',
          height: '150px',
          position: 'relative',
        }}
      >
        <Image
          src={imageSource(thumbnail)}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          alt={`image${index}`}
        />
      </div>

      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Element_Title Label="" value={title} />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <HtmlRenderer htmlContent={summary} />
        </div>
        {/* Uncomment if you want to show the date
        <ReusableText label={noOfDays(dateCreated)} />
        */}
      </div>
    </div>
  );
};

export default UniversalContainerItem;
