import { useState, useEffect } from 'react';
import { isTransactionOk, getTransactionIdHash } from './utils';
import { TransactionStatus } from './types';

export const useTransactionUrlState = () => {
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.UNKNOWN
  );
  useEffect(() => {
    setStatus(isTransactionOk());
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split(/[?#]/)[0]
    );
  }, []);

  return {
    status,
    txHash: getTransactionIdHash(),
  };
};
