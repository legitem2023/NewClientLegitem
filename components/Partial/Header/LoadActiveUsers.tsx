import { useMutation } from '@apollo/client';
import { SET_ACTIVE_USERS } from 'graphql/mutation';
import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';

const LoadActiveUsers: React.FC = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);

  const [insertMessage] = useMutation(SET_ACTIVE_USERS, {
    onCompleted: (data) => {
      if (!data) return;
      const distinctData = Array.from(new Set(data?.setActiveUsers?.map((item: any) => item.accountEmail)))
        .map((email: any) => {
          return data?.setActiveUsers.find((item: any) => item.accountEmail === email);
        });
      let storage: any = distinctData?.map((item: any) => {
        return { "accountEmail": item.accountEmail }
      });
    },
  });

  // Memoize fetchActiveUsers to avoid unnecessary re-renders
  const fetchActiveUsers = useCallback(() => {
    if (cookie.emailAddress) {
      insertMessage({ variables: { emailAddress: cookie.emailAddress } });
    }
  }, [cookie.emailAddress, insertMessage]); // Add insertMessage to dependencies to ensure stability

  useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]); // Dependency array with memoized fetchActiveUsers

  return null;
}

export default LoadActiveUsers;
