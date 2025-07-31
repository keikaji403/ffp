export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  children: Child[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Child {
  id: string;
  name: string;
  birthDate: Date;
  parentId: string;
  investmentAccount?: InvestmentAccount;
  memoryCapsule: Memory[];
  contributors: Contributor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentAccount {
  id: string;
  childId: string;
  brokerAccountId: string;
  totalBalance: number;
  totalContributions: number;
  totalGains: number;
  monthlyContribution: number;
  portfolio: PortfolioPosition[];
  transactions: Transaction[];
  taxYear: number;
  giftTaxUsed: number; // Amount used in current tax year (¥1.1M limit)
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioPosition {
  id: string;
  accountId: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number; // Percentage of portfolio
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'dividend';
  amount: number;
  symbol?: string;
  shares?: number;
  price?: number;
  contributorId?: string;
  description: string;
  executedAt: Date;
  createdAt: Date;
}

export interface Contributor {
  id: string;
  childId: string;
  name: string;
  email: string;
  relationship: string; // e.g., "祖父", "祖母", "叔父", etc.
  totalContributed: number;
  isActive: boolean;
  invitedAt: Date;
  lastContributionAt?: Date;
}

export interface Memory {
  id: string;
  childId: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video';
  milestone?: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  isVisible: boolean;
}

export interface GiftContribution {
  id: string;
  contributorId: string;
  childId: string;
  amount: number;
  message: string;
  isRecurring: boolean;
  recurringAmount?: number;
  nextContributionDate?: Date;
  giftTaxYear: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
}

export interface DashboardData {
  totalBalance: number;
  totalGains: number;
  gainPercentage: number;
  monthlyGrowth: number;
  recentMemories: Memory[];
  recentTransactions: Transaction[];
  giftTaxStatus: {
    used: number;
    remaining: number;
    year: number;
  };
  portfolioPerformance: {
    labels: string[];
    values: number[];
  };
}

export interface ETFPortfolio {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  positions: {
    symbol: string;
    name: string;
    nameJa: string;
    allocation: number;
    expense_ratio: number;
  }[];
  minimumInvestment: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  childName: string;
  childBirthDate: string;
}

export interface ContributionFormData {
  amount: number;
  message: string;
  isRecurring: boolean;
  recurringAmount?: number;
}

export interface MemoryFormData {
  title: string;
  description: string;
  milestone?: string;
  media?: File;
  tags: string[];
}