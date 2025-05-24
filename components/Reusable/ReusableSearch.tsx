import { Icon } from '@iconify/react';
import React, { FC } from 'react';
import ReusableSlider from './ReusableSlider';

type ReusableSearchProps = {
  search: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  sort: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  trigger: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const ReusableSearch: FC<ReusableSearchProps> = ({ search, sort, trigger }) => {
  const items: React.ReactNode[] = [
    (
      <div key="sort-select">
        <label htmlFor="mySelect" className="hidden">Choose an option:</label>
        <select onChange={(e: any) => sort(e)}>
          <option value="">Sort</option>
          <option value="name">By Name</option>
          <option value="price">By Price</option>
        </select>
      </div>
    ),
    (
      <div key="sort-button">
        <button onClick={(e) => trigger(e)} aria-label="sort">
          <Icon icon="bx:sort" />
        </button>
      </div>
    )
  ];

  return (
    <div className="searchContaier">
      <ReusableSlider item={items} />
    </div>
  );
};

export default ReusableSearch;
