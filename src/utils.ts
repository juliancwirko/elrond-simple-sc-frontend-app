import { TransactionStatus, PiggyBankTxType } from './types';

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

export const shortenWalletAddress = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};

export const chainIdMap: { [key: string]: string } = {
  devnet: 'D',
  testnet: 'T',
  mainnet: '1',
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

export const isTransactionOk = (urlString: string | null) => {
  const currentUrlString = urlString || window?.location?.href;
  if (!currentUrlString) return TransactionStatus.UNKNOWN;
  const currentUrl = new URL(currentUrlString);
  if (!currentUrl.searchParams.has('status')) return TransactionStatus.UNKNOWN;
  const isSuccess = currentUrl.searchParams.get('status') === 'success';
  if (isSuccess) return TransactionStatus.SUCCESS;
  return TransactionStatus.FAIL;
};

export const getTransactionIdHash = (urlString: string | null) => {
  const currentUrlString = urlString || window?.location?.href;
  if (!currentUrlString) return null;
  const currentUrl = new URL(currentUrlString);
  if (!currentUrl.searchParams.has('txHash')) return null;
  return currentUrl.searchParams.get('txHash');
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

// Manage local storage when triggering SC functions
// TODO: improve SC to return required values
export const manageLocalStorage = (
  txDataSplit: string[],
  address: string,
  value = '0',
  txSCDataSplit: string[]
) => {
  const lsKey = `piggybank_${address}`;
  const currentLSState = ls.get(lsKey);
  if (txDataSplit[0] === PiggyBankTxType.CREATE && txDataSplit[1]) {
    ls.add(lsKey, {
      amount: '0',
      lockDate: BigInt('0x' + txDataSplit[1]).toString(),
    });
  }
  if (txDataSplit[0] === PiggyBankTxType.ADD) {
    ls.add(lsKey, {
      ...currentLSState,
      amount: BigInt(BigInt(currentLSState.amount) + BigInt(value)).toString(),
    });
  }
  if (txDataSplit[0] === PiggyBankTxType.GET && txSCDataSplit?.[2]) {
    ls.add(lsKey, {
      ...currentLSState,
      amount: BigInt('0x' + txSCDataSplit[2]).toString(),
    });
  }
  if (txDataSplit[0] === PiggyBankTxType.PAYOUT) {
    ls.remove(lsKey);
  }
};
