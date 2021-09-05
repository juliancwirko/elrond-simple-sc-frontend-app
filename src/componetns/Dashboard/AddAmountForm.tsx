import React, { useState } from 'react';
import { Dialog, TextInput, Pane, Text } from 'evergreen-ui';
import { operations } from '@elrondnetwork/dapp-utils';
import { addAmount } from '../../transactions';
import { useSendTransaction } from '@elrondnetwork/dapp';

interface AddAmountFormProps {
  isShown: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAmountForm: React.FC<AddAmountFormProps> = ({ isShown, onClose }) => {
  const [amount, setAmount] = useState<string>('0');
  const sendTransaction = useSendTransaction();

  const addAmountHandler = (amount: string) => {
    sendTransaction({
      transaction: addAmount(amount),
      callbackRoute: '/dashboard',
    });
  };

  const handleConfirm = () => {
    if (amount && parseInt(amount) > 0) {
      addAmountHandler(operations.nominate(amount));
    }
  };

  const handleAmountChange = () => (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setAmount(parseInt(value) >= 0 || value === '' ? value : '0');
  };

  const clearState = () => () => onClose(false);

  return (
    <Dialog
      isShown={isShown}
      title='Add amount'
      onConfirm={handleConfirm}
      onCloseComplete={clearState()}
      confirmLabel='Submit'
    >
      <Pane marginBottom={10}>
        <Text>
          Choose how much xEGLD you want to lock in your PiggyBank Smart
          Contract
        </Text>
      </Pane>
      <TextInput
        min='0'
        type='number'
        onChange={handleAmountChange()}
        width='100%'
        value={amount}
      />
    </Dialog>
  );
};

export default AddAmountForm;
