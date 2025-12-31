export type CurrencyType = 'gold' | 'gems';

export interface EconomyBalance {
  ownerId: string;
  gold: number;
  gems: number;
}

export interface EconomyTransaction {
  id: string;
  ownerId: string;
  currency: CurrencyType;
  amount: number;
  reason: string;
  timestamp: number;
}

// Estado en memoria (temporal)
const balances = new Map<string, EconomyBalance>();
const transactions = new Map<string, EconomyTransaction[]>();

function getOrCreateBalance(ownerId: string): EconomyBalance {
  const existing = balances.get(ownerId);
  if (existing) return existing;

  const balance: EconomyBalance = {
    ownerId,
    gold: 0,
    gems: 0
  };

  balances.set(ownerId, balance);
  transactions.set(ownerId, []);

  return balance;
}

export function getBalance(ownerId: string): EconomyBalance {
  return getOrCreateBalance(ownerId);
}

export function grantCurrency(
  ownerId: string,
  currency: CurrencyType,
  amount: number,
  reason: string
): EconomyTransaction {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }

  const balance = getOrCreateBalance(ownerId);
  balance[currency] += amount;

  const tx: EconomyTransaction = {
    id: crypto.randomUUID(),
    ownerId,
    currency,
    amount,
    reason,
    timestamp: Date.now()
  };

  const ownerTxs = transactions.get(ownerId)!;
  ownerTxs.push(tx);

  return tx;
}

export function getTransactions(ownerId: string): EconomyTransaction[] {
  return transactions.get(ownerId) ?? [];
}