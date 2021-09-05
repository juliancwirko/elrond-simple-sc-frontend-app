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
  CREATE = 'create_piggy',
  ADD = 'add_amount',
  GET = 'amount',
  PAYOUT = 'pay_out',
}

export interface PiggyBankLS {
  lockDate: string;
  amount: string;
}
