import { useState, useRef, useEffect } from 'react';

const ExpandableText = ({ text, maxLength = 500 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState('auto');
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setHeight(`${textRef.current.scrollHeight}px`);
    }
  }, [text]);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const shouldTruncate = text?.length > maxLength;
  const displayText = shouldTruncate ? text.slice(0, maxLength) + '...' : text;

  return (
    <>
      <style>
        {`
          .expandable-container {
            overflow: hidden;
            transition: all 0.3s ease-in-out;
          }

          .expandable-text {
            max-height: 100px; /* Initial collapsed height */
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }

          .expanded {
            max-height: 1000px; /* Large enough to show full content */
          }

          .toggle-button {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
            margin-top: 8px;
            background: none;
            border: none;
            font-size: 16px;
          }
        `}
      </style>
      <div className="expandable-container">
        <div ref={textRef} className={`expandable-text ${isExpanded ? 'expanded' : ''}`}>
          <p>{isExpanded ? text : displayText}</p>
        </div>
        {shouldTruncate && (
          <button onClick={toggleExpansion} className="toggle-button">
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    </>
  );
};

export default ExpandableText;
