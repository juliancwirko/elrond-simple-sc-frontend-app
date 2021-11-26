import { piggybankScAddress } from './config';
import {
  Address,
  ContractFunction,
  GasLimit,
  U32Value,
  Balance,
  SmartContract,
} from '@elrondnetwork/erdjs';

// Create first piggy bank, you can have only one for now
// Pass unix timestamp in the future, this is the lock time
export const createPiggy = (timestamp: number) => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('createPiggy'),
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
    func: new ContractFunction('addAmount'),
    value: Balance.fromString(amount),
    gasLimit: new GasLimit(5000000),
  });
};

// Payout after lock date passed
export const payout = () => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  return contract.call({
    func: new ContractFunction('payOut'),
    gasLimit: new GasLimit(5000000),
  });
};
