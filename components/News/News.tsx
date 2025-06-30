import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { READ_NEWS } from 'graphql/queries';

import Loading from 'components/Partial/LoadingAnimation/Loading';
import LikesLoading from '../Likes/LikesLoading';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import UniversalContainerItem from 'components/UI/UniversalContainerItem';
import { imageSource } from 'utils/scripts';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';

const News: React.FC = () => {
  const { data, loading, error } = useQuery(READ_NEWS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedNews = useMemo(() => {
    return data?.readNews?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];
  }, [data, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil((data?.readNews?.length || 0) / itemsPerPage);
  }, [data, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (loading) return <LikesLoading />;
  if (error) return <div>Connection Error</div>;

  return (
    <ReusableCenterLayout
      child1={() => <ReusableLabel icn="bi:tags-fill" label="News" />}
      child2={() => <></>}
      child3={() => (
        <div style={{ overflowY: 'auto', height: 'auto', scrollbarWidth: 'none' }}>
          <div className="LikeContainer">
            {paginatedNews.length > 0 ? (
              paginatedNews.map((item: any, idx: number) => (
                <UniversalContainerItem
                  key={idx}
                  title={item.title}
                  thumbnail={imageSource(item.thumbnail)}
                  summary={item.summary}
                  dateCreated={item.dateCreated}
                  index={idx}
                />
              ))
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </div>
      )}
      child4={() => (
        <UniversalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    />
  );
};

export default News;
