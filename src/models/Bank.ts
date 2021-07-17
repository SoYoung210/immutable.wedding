interface Bank {
  holderName: string;
  bankName: string;
  accountNumber: string;
  logo: string;
}

export interface BankInfo {
  groom: Bank[];
  bridge: Bank[];
}
