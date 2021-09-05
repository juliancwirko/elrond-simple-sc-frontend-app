import { piggybankScAddress } from './config';
import {
  SmartContract,
  Address,
  ContractFunction,
  GasLimit,
  U32Value,
  Balance,
} from '@elrondnetwork/erdjs';

// Create first piggy bank, you can have only one for now
// Pass unix timestamp in the future, this is the lock time
export const createPiggy = (timestamp: number) => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('create_piggy'),
    args: [new U32Value(timestamp)],
    gasLimit: new GasLimit(5000000),
  });
};

// Add amount to your PiggyBank
export const addAmount = (amount: string) => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('add_amount'),
    value: Balance.fromString(amount),
    gasLimit: new GasLimit(5000000),
  });
};

// Check how many egld/xegld you have in your PiggyBank
export const amount = () => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('amount'),
    gasLimit: new GasLimit(5000000),
  });
};

// Payout after lock date passed
export const payout = () => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('pay_out'),
    gasLimit: new GasLimit(5000000),
  });
};
