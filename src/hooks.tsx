import { useState, useEffect } from 'react';
import { isTransactionOk, getTransactionIdHash } from './utils';
import { TransactionStatus } from './types';
import { useLocation } from 'react-router-dom';

export const useTransactionUrlState = () => {
  const location = useLocation();
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.UNKNOWN
  );
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    const href = window?.location?.href;
    const transactionState = isTransactionOk(href);
    const hash = getTransactionIdHash(href);

    setStatus(transactionState);
    setTxHash(hash);
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split(/[?#]/)[0]
    );
  }, [location]);

  return {
    status,
    txHash,
  };
};
