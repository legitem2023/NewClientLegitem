"use client";

import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import AccordionCheckout from 'components/AccordionCheckout/AccordionCheckout';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import { INSERT_ORDER } from 'graphql/mutation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DataManager from 'utils/DataManager';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import { useDispatch, useSelector } from 'react-redux';
import ReusableLabel from 'components/UI/ReusableLabel';
import { clearCart } from 'Redux/cartSlice';

const Checkout = () => {
  const Manager = new DataManager();
  const router = useRouter();
  const dispatch = useDispatch();

  // React-Redux Hooks
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const cartItems = useSelector((state: any) => state.cart.cartItems || []);

  // React State Hook
  const [loadingState, setLoading] = useState(false);

  // Apollo useMutation Hook
  const [insert_order] = useMutation(INSERT_ORDER, {
    onError: (data) => {
      console.log(data);
    },
    onCompleted: (data) => {
      if (data.insertOrder.statusText === 'Success') {
        Manager.Success('Order Successful');
        handleClearCart();
        router.push('./Order');
      }
    },
  });

  // Apollo useQuery Hook
  const {
    data: AccountDetails,
    loading: AccountLoading,
    error: AccountError,
    refetch: AccountRefetch,
  } = useQuery(GET_ACCOUNT_DETAILS_ID, {
    variables: { getAccountDetailsIdId: cookie?.userid || '' },
    skip: !cookie, // Skip query if cookie is not available
  });

  // Helper functions
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    const conf = confirm(
      `The Shipping Address you selected is \n\n Address:${'checkoutAddress'} \n\n Are you sure you want to place your order in this address?`
    );
    if (conf) {
      setLoading(true);
      insert_order({
        variables: {
          orderHistoryInput: cartItems.map((item: any) => ({
            Address: 'checkoutAddress',
            Contact: 'checkoutContact',
            Price: parseFloat(item.price),
            Quantity: item.quantity,
            emailAddress: cookie.emailAddress,
            productCode: item.productCode,
            Size: item.size,
            Image: item.image,
            Color: item.color,
            agentEmail: item.agentEmail,
            paymentMethod: 'COD',
          })),
        },
      });
    }
  };

  // Conditional render for loading or errors
  if (!cookie) return null;
  if (AccountLoading) return <Loading />;
  if (AccountError) return null;

  // Filtering account details
  const filters = AccountDetails?.getAccountDetails_id?.filter(
    (item: any) => item.defaultAddress === true
  );

  const DefaultAccount = filters?.filter(
    (item: any) => item.accountEmail === cookie.emailAddress
  );

  return (
    <ReusableCenterLayout
      child1={() => (
        <>
          <ReusableLabel icn={'ic:baseline-payment'} label="Select Payment Method" />
          <ReusableLabel icn={'mdi:cart'} label="Select Address" />
          <div>
            {AccountDetails && (
              <AccordionCheckout address={AccountDetails.getAccountDetails_id} refetch={AccountRefetch} />
            )}
          </div>
          <div className="SelectedAddress">
            {DefaultAccount?.map((item: any, idx: number) => (
              <div key={idx}>
                <div>Fullname: {item.fullname}</div>
                <div>Contact No: {item.contactNo}</div>
                <div>Shipping Address: {item.Address}</div>
              </div>
            ))}
          </div>
          <div className="CheckOutButton_container">
            <button
              className="PlaceLink"
              disabled={loadingState}
              onClick={(e: any) => HandleSubmit(e)}
            >
              {loadingState ? (
                <>
                  <Icon icon="mdi:place" /> Sending <Icon icon="eos-icons:loading" />
                </>
              ) : (
                <>
                  <Icon icon="mdi:place" /> Place Order
                </>
              )}
            </button>
          </div>
        </>
      )}
      child2={() => <></>}
      child3={() => <></>}
      child4={() => <></>}
    />
  );
};

export default Checkout;
