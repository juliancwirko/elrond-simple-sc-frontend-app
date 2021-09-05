import React, { useState } from 'react';
import { Dialog, TextInput, Pane, Text } from 'evergreen-ui';
import { createPiggy } from '../../transactions';
import { useSendTransaction } from '@elrondnetwork/dapp';

interface CreatePiggyFormProps {
  isShown: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePiggyForm: React.FC<CreatePiggyFormProps> = ({
  isShown,
  onClose,
}) => {
  const [date, setDate] = useState<number | undefined>();
  const sendTransaction = useSendTransaction();

  const createPiggyHandler = (lockTimestamp: number) => {
    sendTransaction({
      transaction: createPiggy(lockTimestamp),
      callbackRoute: '/dashboard',
    });
  };

  const handleConfirm = () => {
    if (date) {
      createPiggyHandler(date);
    }
  };

  const handleDateChange = () => (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const date = new Date(e.currentTarget.value);
    setDate(date.getTime() / 1000);
  };

  const clearState = () => () => onClose(false);

  return (
    <Dialog
      isShown={isShown}
      title='Create a Piggy'
      onConfirm={handleConfirm}
      onCloseComplete={clearState()}
      confirmLabel='Submit'
    >
      <Pane marginBottom={10}>
        <Text>Choose lock date and time</Text>
      </Pane>
      <TextInput
        min={new Date().toISOString().split('.')[0]}
        type='datetime-local'
        onChange={handleDateChange()}
        width='100%'
      />
    </Dialog>
  );
};

export default CreatePiggyForm;
