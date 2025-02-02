import React, { useState } from 'react'
import ContactUs from 'components/ContactUs/ContactUs';
import { useMutation } from '@apollo/client';
import { CONTACT_US } from 'graphql/mutation';
import DataManager from 'utils/DataManager';
import ReusableBody from 'components/UI/ReusableBody';
const Contact = () => {
    const Manager = new DataManager();
    const [errors, setErrors]:any = useState();
    const [isLoading,setLoading] = useState(false);

    const [formData, setFormData] = useState({
      emailAddress: '',
      fullname:'',
      contactNo:'',
      details:''
    });
  const [contact_us] = useMutation(CONTACT_US,{
    onCompleted: (e:any) => {
      if(e.contactUs.statusText==="Successfully"){
        Manager.Success(e.contactUs.statusText);
        setLoading(false);
      }else{
        Manager.Error(e.contactUs.statusText);
      }
    },
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const validateForm = () => {
    if (!formData.fullname.trim()) return setErrors('Full Name is required');
    if (!formData.contactNo.trim()) return setErrors('Contact No. is required');
    if (!formData.emailAddress.trim()) return setErrors('Email is required');
    if (!formData.details.trim()) return setErrors('datails is required');
    
    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.emailAddress)) return setErrors('Invalid email format');
  
    // Clear errors if all validations pass
    setErrors('');
    return true;
  };
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await contact_us({
        variables: {
          "messagebody": {
            "contactNo": formData.contactNo,
            "details": formData.details,
            "emailAddress": formData.emailAddress,
            "fullname": formData.fullname
          }
        }});
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <ReusableBody
      childA={()=>""}
      childB={()=>(
        <ContactUs handleSubmit={handleSubmit} handleInputChange={handleInputChange} errors={errors} setLoading={setLoading} isLoading={isLoading}/>
      )}
      childC={()=>""}/>
    );
}

export default Contact