import React, { useEffect, useState } from 'react';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import * as Dapp from '@elrondnetwork/dapp';
import MainLayout from '../MainLayout';
import AccountTab from './AccountTab';
import PiggyTab from './PiggyTab';
import AlertTxInfo from './AlertTxInfo';
import * as scQueries from '../../scQueries';
import { getTransactionByHash } from '../../apiEndpoints';
import { PiggyBankTxType } from '../../types';
import { base64ToHex, parseResponseFromSC, ls } from '../../utils';
import { useTransactionUrlState } from '../../hooks';

const tabs = ['Piggy', 'Account'];

const Dashboard: React.FC = () => {
  const { address } = Dapp.useContext();
  const [selectedIndex, setTabSelectedIndex] = useState(0);
  const [syncedAmount, setSyncedAmount] = useState<string | undefined>(
    ls.get(`piggybank_${address}`)?.amount
  );
  const [syncedTimeLock, setSyncedTimeLock] = useState<string | undefined>(
    ls.get(`piggybank_${address}`)?.lockDate
  );
  const { status, txHash } = useTransactionUrlState();
  const [pending, setPending] = useState(false);
  const [transactionData, setTransactionData] =
    useState<{ type: string; data: string; errorMessage?: string }>();

  const getAmount = async () => {
    const result = await scQueries.getLockedAmount(address);
    const base64Val = result?.returnData?.[0];
    const hexValue = base64Val ? base64ToHex(base64Val) : null;
    if (hexValue) {
      ls.add(`piggybank_${address}`, {
        ...ls.get(`piggybank_${address}`),
        amount: parseInt(hexValue, 16).toString(),
      });
      setSyncedAmount(parseInt(hexValue, 16).toString());
    }
  };

  const getTimeLock = async () => {
    const result = await scQueries.getLockTime(address);
    const base64Val = result?.returnData?.[0];
    const hexValue = base64Val ? base64ToHex(base64Val) : null;
    if (hexValue) {
      ls.add(`piggybank_${address}`, {
        ...ls.get(`piggybank_${address}`),
        lockDate: parseInt(hexValue, 16).toString(),
      });
      setSyncedTimeLock(parseInt(hexValue, 16).toString());
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!txHash) return;
      setPending(true);
      const response = await fetch(getTransactionByHash(txHash));
      const data = await response.json();
      if (data) {
        const txDataSplit = atob(data.data).split('@');
        const txSCData = data.results?.[0]?.data;
        if (
          data.status !== 'fail' &&
          txDataSplit[0] === PiggyBankTxType.PAYOUT
        ) {
          // Reset piggy bank when payout
          ls.remove(`piggybank_${address}`);
          setSyncedAmount(undefined);
          setSyncedTimeLock(undefined);
        }
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
        setPending(false);
      }
    };

    const syncData = async () => {
      setPending(true);
      await Promise.all([getAmount(), getTimeLock()]);
      setPending(false);
    };

    if (!pending) {
      fetchTransactions();
      syncData();
    }
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
          {selectedIndex === 0 && !pending && (
            <PiggyTab
              piggyAmount={syncedAmount}
              piggyTimeLock={syncedTimeLock}
              getAmount={getAmount}
              getTimeLock={getTimeLock}
            />
          )}
        </Pane>
        <Pane flex="1">{selectedIndex === 1 && <AccountTab />}</Pane>
      </Pane>
    </MainLayout>
  );
};

export default Dashboard;
