import { Icon } from '@iconify/react';
import { useState } from 'react';

const Accordion = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };

    return (
        <div className='accordion_container'> 
                  <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /><span>Frequently Asked Questions</span></div>
            <div className="faq-accordion">
                {faqs.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAccordion(index)}>
                            {faq.question}
                            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
