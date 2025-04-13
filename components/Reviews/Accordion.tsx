import { Icon } from '@iconify/react';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import Ratings from 'components/Partial/Ratings/Ratings';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentPage } from 'Redux/currentPageSlice';
import { maskEmail } from 'utils/scripts';

const Accordion = ({ data }) => {
    const Reviews = data.readFeedBack;
    const dispatch = useDispatch();
    const CurrentPage = useSelector((state: any) => state.currentPage.currentPage);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };

    const itemsPerPage = 20;
    const paginatedProducts = Reviews.slice(
        (CurrentPage - 1) * itemsPerPage,
        CurrentPage * itemsPerPage
    );

    const totalPages = useMemo(() => {
        const itemsPerPage = 20;
        return Math.ceil((Reviews?.length || 0) / itemsPerPage);
    }, [Reviews]);

    const handlePageChange = useCallback((page: number) => {
        dispatch(setcurrentPage(page)); // Corrected from `pages` to `page`
    }, [dispatch]);

    return (
        <div className="" style={{ position: 'relative' }}>
            <ReusableLabel icn='' label='Products Feedback'/>
            <div className="faq-accordion">
                {paginatedProducts.map((rev, index) => (
                    <div className="faq-item" key={index}>
                        <div
                            className="faq-question"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div>Feedback By: {maskEmail(rev.By)}</div>
                            <span
                                className={`arrow ${activeIndex === index ? 'open' : ''}`}
                            >
                                &#9660;
                            </span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{rev.Comment}</p>
                                <Ratings data={rev.Ratings} count={rev} />
                                {rev.Attachment && (
                                    <img
                                        src={rev.Attachment}
                                        alt="Feedback Attachment"
                                        className="feedbackattachment"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="viewmore">
                <UniversalPagination
                    currentPage={CurrentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Accordion;
