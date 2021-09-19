import React, { useState } from 'react';
import { Ui } from '@elrondnetwork/dapp-utils';
import { Pane, Heading, Button, Text, Link } from 'evergreen-ui';
import * as Dapp from '@elrondnetwork/dapp';
import { PiggyBankLS } from '../../types';
import * as transactions from '../../transactions';
import CreatePiggyForm from './CreatePiggyForm';
import AddAmountForm from './AddAmountForm';

interface PiggyTabProps {
  piggy: PiggyBankLS;
}

const PiggyTab: React.FC<PiggyTabProps> = ({ piggy }) => {
  const [createPiggyModal, setCreatePiggyModal] = useState(false);
  const [addAmountModal, setAddAmountModal] = useState(false);
  const sendTransaction = Dapp.useSendTransaction();

  const createPiggyModalOpen = () => () => {
    setCreatePiggyModal(true);
  };

  const addAmountModalOpen = () => () => {
    setAddAmountModal(true);
  };

  const getAmount = () => {
    sendTransaction({
      transaction: transactions.amount(),
      callbackRoute: '/dashboard',
    });
  };

  const getPayout = () => {
    sendTransaction({
      transaction: transactions.payout(),
      callbackRoute: '/dashboard',
    });
  };

  return (
    <div>
      <Pane padding={30} elevation={1} backgroundColor="white">
        <Pane marginBottom={30} textAlign="center">
          {piggy ? (
            <>
              <Heading>
                Your PiggyBank amount is:{' '}
                <Ui.Denominate
                  value={piggy.amount}
                  decimals={2}
                  erdLabel="xEGLD"
                />
              </Heading>
              <Text>
                Lock time:{' '}
                {new Date(parseInt(piggy.lockDate) * 1000).toLocaleString()}
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
            disabled={Boolean(piggy)}
          >
            Create a Piggy
          </Button>
          <Button
            onClick={addAmountModalOpen()}
            marginRight={20}
            disabled={!piggy}
          >
            Add amount
          </Button>
          <Button onClick={getAmount} marginRight={20} disabled={!piggy}>
            Sync amount
          </Button>
          <Button
            onClick={getPayout}
            appearance="primary"
            intent="success"
            disabled={parseInt(piggy?.amount || '0') === 0}
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
