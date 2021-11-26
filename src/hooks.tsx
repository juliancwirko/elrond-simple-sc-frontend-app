import { useState, useEffect } from 'react';
import { isTransactionOk } from './utils';
import { TransactionStatus } from './types';
import { useLocation } from 'react-router-dom';

export const useTransactionUrlState = () => {
  const location = useLocation();
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.UNKNOWN
  );
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status');
    const hash = urlParams.get('txHash');

    const transactionState = isTransactionOk(status);

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
