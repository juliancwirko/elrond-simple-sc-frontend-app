export enum TransactionType {
  ISSUANCE,
  ROLES,
  CREATE,
  TRANSFER,
  ERROR,
}

export enum ChainID {
  TESTNET = 'T',
  DEVNET = 'D',
  MAINNET = 1,
}

export enum TransactionStatus {
  SUCCESS,
  FAIL,
  UNKNOWN,
}

export enum PiggyBankTxType {
  CREATE = 'createPiggy',
  ADD = 'addAmount',
  PAYOUT = 'payOut',
}

export interface PiggyBankLS {
  lockDate: string;
  amount: string;
}
