import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import Accordion from 'components/Accordion/Accordion';
import FAQ from 'json/faq.json'
import ReusableBody from 'components/UI/ReusableBody';
const FaQ = () => {
    return (
      <ReusableBody
      childA={()=>""}
      childB={()=>(
        <Accordion faqs={FAQ}></Accordion>
      )}
      childC={()=>""}/>
    );
}

export default FaQ