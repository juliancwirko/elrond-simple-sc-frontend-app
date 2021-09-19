import React, { useRef, useEffect, useState } from 'react';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import * as Dapp from '@elrondnetwork/dapp';
import MainLayout from '../MainLayout';
import AccountTab from './AccountTab';
import PiggyTab from './PiggyTab';
import AlertTxInfo from './AlertTxInfo';
import { getTransactionByHash } from '../../apiEndpoints';
import { parseResponseFromSC, manageLocalStorage, ls } from '../../utils';
import { useTransactionUrlState } from '../../hooks';

const tabs = ['Piggy', 'Account'];

const Dashboard: React.FC = () => {
  const [selectedIndex, setTabSelectedIndex] = useState(0);

  const { status, txHash } = useTransactionUrlState();
  const [pending, setPending] = useState(false);
  const { address } = Dapp.useContext();
  const [transactionData, setTransactionData] =
    useState<{ type: string; data: string; errorMessage?: string }>();

  const mounted = useRef(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!txHash) return;
      setPending(true);
      const response = await fetch(getTransactionByHash(txHash));
      const data = await response.json();
      if (data) {
        const txDataSplit = atob(data.data).split('@');
        const txSCData = data.results?.[0]?.data;
        const txSCDataSplit = txSCData ? atob(txSCData).split('@') : [];
        data.status !== 'fail' &&
          manageLocalStorage(txDataSplit, address, data.value, txSCDataSplit);
        setTransactionData({
          type: txDataSplit[0],
          data: txSCData
            ? parseResponseFromSC(
                atob(txSCData),
                data.results?.[0]?.returnMessage
              )
            : '',
          errorMessage: data.results?.[0]?.returnMessage,
        });
      }
      if (mounted.current) {
        setPending(false);
      }
    };
    if (txHash && !pending) {
      fetchTransactions();
    }
    return () => {
      mounted.current = false;
    };
  }, [txHash]);

  return (
    <MainLayout>
      <AlertTxInfo
        status={status}
        txHash={txHash}
        errorMsg={transactionData?.errorMessage}
      />
      <Pane>
        <Tablist marginBottom={20} marginTop={50}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              appearance="primary"
              onSelect={() => setTabSelectedIndex(index)}
              isSelected={index === selectedIndex}
              className="no-focus"
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        <Pane flex="1">
          {selectedIndex === 0 && (
            <PiggyTab piggy={ls.get(`piggybank_${address}`)} />
          )}
        </Pane>
        <Pane flex="1">{selectedIndex === 1 && <AccountTab />}</Pane>
      </Pane>
    </MainLayout>
  );
};

export default Dashboard;
