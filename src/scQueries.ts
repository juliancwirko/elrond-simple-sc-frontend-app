import { piggybankScAddress, network } from './config';
import {
  Address,
  ContractFunction,
  SmartContract,
  AddressValue,
  ProxyProvider,
} from '@elrondnetwork/erdjs';

// Check how many egld/xegld you have in your PiggyBank
// SC query
export const getLockedAmount = async (address: string) => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  if (network.gatewayAddress) {
    return contract.runQuery(new ProxyProvider(network.gatewayAddress), {
      func: new ContractFunction('getLockedAmount'),
      args: [new AddressValue(new Address(address))],
    });
  }

  return null;
};

// Check how many egld/xegld you have in your PiggyBank
export const getLockTime = (address: string) => {
  const contract = new SmartContract({
    address: new Address(piggybankScAddress),
  });

  if (network.gatewayAddress) {
    return contract.runQuery(new ProxyProvider(network.gatewayAddress), {
      func: new ContractFunction('getLockTime'),
      args: [new AddressValue(new Address(address))],
    });
  }

  return null;
};
