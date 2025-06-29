import { useState } from 'react';

const ExpandableText = ({ text, maxLength = 500 }) => {
const [isExpanded, setIsExpanded] = useState(false);

const toggleExpansion = () => {
setIsExpanded((prev) => !prev);
};

// Determine whether truncation is needed
const shouldTruncate = text?.length > maxLength;

// Render text based on expansion state
const displayText = isExpanded || !shouldTruncate
? text
: text.slice(0, maxLength) + '...';

return (
<div>
<p style={{fontSize:'14px'}}>{displayText}</p>
{shouldTruncate && (
<button onClick={toggleExpansion} className="text-blue-500 underline">
{isExpanded ? 'See Less' : 'See More'}
</button>
)}
</div>
);
};

export default ExpandableText;

