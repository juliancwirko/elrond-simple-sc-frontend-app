import { piggybankScAddress, network } from './config';
import {
  Address,
  ContractFunction,
  GasLimit,
  U32Value,
  TransactionPayload,
  Transaction,
  Balance,
  ChainID,
} from '@elrondnetwork/erdjs';
import { chainIdMap } from './utils';

// Create first piggy bank, you can have only one for now
// Pass unix timestamp in the future, this is the lock time
export const createPiggy = (timestamp: number) => {
  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction('create_piggy'))
    .setArgs([new U32Value(timestamp)])
    .build();

  const transaction = new Transaction({
    receiver: new Address(piggybankScAddress),
    gasLimit: new GasLimit(5000000),
    data: payload,
    chainID: new ChainID(chainIdMap[network.id]),
  });

  return transaction;
};

// Add amount to your PiggyBank
export const addAmount = (amount: string) => {
  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction('add_amount'))
    .build();

  const transaction = new Transaction({
    receiver: new Address(piggybankScAddress),
    gasLimit: new GasLimit(5000000),
    value: Balance.fromString(amount),
    data: payload,
    chainID: new ChainID(chainIdMap[network.id]),
  });

  return transaction;
};

// Check how many egld/xegld you have in your PiggyBank
export const amount = () => {
  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction('amount'))
    .build();

  const transaction = new Transaction({
    receiver: new Address(piggybankScAddress),
    gasLimit: new GasLimit(5000000),
    data: payload,
    chainID: new ChainID(chainIdMap[network.id]),
  });

  return transaction;
};

// Payout after lock date passed
export const payout = () => {
  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction('pay_out'))
    .build();

  const transaction = new Transaction({
    receiver: new Address(piggybankScAddress),
    gasLimit: new GasLimit(5000000),
    data: payload,
    chainID: new ChainID(chainIdMap[network.id]),
  });

  return transaction;
};
