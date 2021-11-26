import React, { useState } from 'react';
import { Ui } from '@elrondnetwork/dapp-utils';
import { Pane, Heading, Button, Text, Link } from 'evergreen-ui';
import * as Dapp from '@elrondnetwork/dapp';
import * as transactions from '../../transactions';

import CreatePiggyForm from './CreatePiggyForm';
import AddAmountForm from './AddAmountForm';

interface PiggyTabProps {
  piggyAmount: string | undefined;
  piggyTimeLock: string | undefined;
  getAmount: () => void;
  getTimeLock: () => void;
}

const PiggyTab: React.FC<PiggyTabProps> = ({
  piggyAmount,
  piggyTimeLock,
  getAmount,
  getTimeLock,
}) => {
  const [createPiggyModal, setCreatePiggyModal] = useState(false);
  const [addAmountModal, setAddAmountModal] = useState(false);
  const sendTransaction = Dapp.useSendTransaction();

  const createPiggyModalOpen = () => () => {
    setCreatePiggyModal(true);
  };

  const addAmountModalOpen = () => () => {
    setAddAmountModal(true);
  };

  const getPayout = () => {
    sendTransaction({
      transaction: transactions.payout(),
      callbackRoute: '/dashboard',
    });
  };

  const sync = () => {
    getAmount();
    getTimeLock();
  };

  return (
    <div>
      <Pane padding={30} elevation={1} backgroundColor="white">
        <Pane marginBottom={30} textAlign="center">
          {piggyTimeLock ? (
            <>
              <Heading>
                Your PiggyBank amount is:{' '}
                <Ui.Denominate
                  value={piggyAmount || '0'}
                  decimals={2}
                  erdLabel="xEGLD"
                />
              </Heading>
              <Text>
                Lock time:{' '}
                {new Date(parseInt(piggyTimeLock) * 1000).toLocaleString()}
              </Text>
            </>
          ) : (
            <>
              <Heading>You don't have a Piggy yet. Let's create one!</Heading>
              <Text>
                Remember that you need to have some xEGLD. Get some using the
                faucet <Link href="https://r3d4.fr/elrond/devnet/">here</Link>,
                or the one from the devnet web wallet.
              </Text>
            </>
          )}
        </Pane>
        <Pane display="flex" justifyContent="center">
          <Button
            onClick={createPiggyModalOpen()}
            appearance="primary"
            marginRight={20}
            disabled={Boolean(piggyTimeLock)}
          >
            Create a Piggy
          </Button>
          <Button
            onClick={addAmountModalOpen()}
            marginRight={20}
            disabled={!piggyTimeLock}
          >
            Add amount
          </Button>
          <Button onClick={sync} marginRight={20} disabled={!piggyTimeLock}>
            Sync
          </Button>
          <Button
            onClick={getPayout}
            appearance="primary"
            intent="success"
            disabled={parseInt(piggyAmount || '0') === 0}
          >
            Payout
          </Button>
        </Pane>
      </Pane>
      <CreatePiggyForm
        isShown={createPiggyModal}
        onClose={setCreatePiggyModal}
      />
      <AddAmountForm isShown={addAmountModal} onClose={setAddAmountModal} />
    </div>
  );
};

export default PiggyTab;
