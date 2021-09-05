import React from 'react';
import { Text, Link } from 'evergreen-ui';
import { network } from '../../config';
import { TransactionStatus } from '../../types';
import { Alert } from 'evergreen-ui';

interface CustomInfoBoxProps {
  txHash: string;
}

const CustomInfoBox: React.FC<CustomInfoBoxProps> = ({ txHash }) => (
  <>
    <Text>You can check the status in the blockchain explorer</Text>{' '}
    <Link
      href={`${network.explorerAddress}transactions/${txHash}`}
      target='_blank'
      rel='noreferrer'
    >
      here
    </Link>
  </>
);

interface AlertTxInfoProps {
  txHash: string | null;
  status: TransactionStatus;
  errorMsg?: string;
}

const AlertTxInfo: React.FC<AlertTxInfoProps> = ({
  status,
  txHash,
  errorMsg,
}) => {
  return (
    <>
      {status === TransactionStatus.SUCCESS && (
        <Alert intent='success' title='Transaction successful!'>
          {txHash && <CustomInfoBox txHash={txHash} />}
        </Alert>
      )}
      {status === TransactionStatus.FAIL && (
        <Alert
          intent='danger'
          title={errorMsg || 'Ooops! Something went wrong!'}
        >
          {txHash && <CustomInfoBox txHash={txHash} />}
        </Alert>
      )}
    </>
  );
};

export default AlertTxInfo;
