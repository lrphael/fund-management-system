export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  wallet: Wallet;
}

export interface Wallet {
  currentBalance: number;
  totalInvestedBalance: number;
  investedFunds: number[];
}