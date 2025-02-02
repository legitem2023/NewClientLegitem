import { useState } from 'react';
import AboutJson from 'json/About.json'
import { Icon } from '@iconify/react';
import { READ_ABOUT_US } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import ReusableBody from 'components/UI/ReusableBody';
const About = () => {
    const { data, loading,error } = useQuery(READ_ABOUT_US);

    if (loading) return <Loading/>
    if(error) return "Connection Error";
    return (
                  <ReusableBody
                  childA={()=>""}
                  childB={()=>(
                  <div className="Privacy">
                    {data?.readAbout?.map((item: any,idx:number) => (
                        <div key={idx}>
                            <HtmlRenderer htmlContent={item.content}/>
                        </div>
                    ))}
                    </div>
                  )}
                  childC={()=>""}/>
    );
};

export default About;


