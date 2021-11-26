import { TransactionStatus } from './types';

export const stringToHex = (str: string) => {
  if (str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
  return '';
};

export const hexToString = (strVal: string) => {
  if (strVal) {
    const hex = strVal.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
  return '';
};

export const base64ToHex = (str: string) => {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toUpperCase();
};

export const shortenWalletAddress = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};

export const providerIdMap: { [key: string]: string } = {
  local: 'local-testnet',
  testnet: 'elrond-testnet',
  devnet: 'elrond-devnet',
  mainnet: 'elrond-mainnet',
};

// Localstorage - simple storage for latest state of the PiggyBank
export const ls = {
  add(key: string, value: unknown) {
    if (!key) return null;
    return localStorage?.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    if (!key) return null;
    const item = localStorage?.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },
  remove(key: string) {
    if (!key) return null;
    return localStorage?.removeItem(key);
  },
};

// Transaction url parsers

export const isTransactionOk = (status: string | null) => {
  if (!status) return TransactionStatus.UNKNOWN;
  const isSuccess = status === 'success';
  if (isSuccess) return TransactionStatus.SUCCESS;
  return TransactionStatus.FAIL;
};

// Transaction data parsers
export const parseResponseFromSC = (data: string, errorMessage?: string) => {
  const splitted = data.split('@');
  if (splitted[1] === stringToHex('ok') && splitted[2]) {
    const val = Buffer.from(splitted[2], 'hex').toString();
    return val;
  }
  return errorMessage || 'ok';
};
