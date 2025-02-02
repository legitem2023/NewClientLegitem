import React from 'react';
import { Icon } from '@iconify/react';
// import { setGlobalState } from 'state';
import { PaginationProps } from 'utils/types/types';
import { useDispatch } from 'react-redux';
import { setcurrentPage } from 'Redux/currentPageSlice';
const Pagination = ({currentPage,totalPages,onPageChange}: PaginationProps): JSX.Element => {
  const dispatch = useDispatch();
  const siblingsCount = 2;
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pagesToShow = range(
    Math.max(1, currentPage - siblingsCount),
    Math.min(totalPages, currentPage + siblingsCount)
  );

  return (
    <div className='flex justify-center my-4 bg-stone-400 border-4 border-stone-500 p-2 pagination'>
      <button
        aria-label='pagination'
        className="transformRotate"
        onClick={() => {onPageChange(1);dispatch(setcurrentPage(1))}}
        disabled={currentPage === 1}>
        <Icon icon="gg:chevron-double-right" style={{transform:'scaleX(-1)'}} />
      </button>
      <button
        aria-label='pagination'
        className="transformRotate"
        onClick={() => {onPageChange(currentPage - 1);dispatch(setcurrentPage(currentPage - 1))}}
        disabled={currentPage === 1}>
        <Icon icon="gg:chevron-right" style={{transform:'scaleX(-1)'}}/>
      </button>

      {pagesToShow.map(page => (
        <button
        aria-label='pagination'
          key={page}
          className={page === currentPage ? 'CurrentPagination' : ''}
          onClick={() => {onPageChange(page);dispatch(setcurrentPage(page))}}>
          {page}
        </button>
      ))}

      <button
        aria-label='pagination'
        className="transformRotate"
        onClick={() => {onPageChange(currentPage + 1);dispatch(setcurrentPage(currentPage + 1))}}
        disabled={currentPage === totalPages}>
        <Icon icon="gg:chevron-right" />
      </button>

      <button
        aria-label='pagination'
        className="transformRotate"
        onClick={() => {onPageChange(totalPages);dispatch(setcurrentPage(totalPages))}}
        disabled={currentPage === totalPages}>
        <Icon icon="gg:chevron-double-right"/>
      </button>

    </div>
  );
};

export default Pagination;