import { ETFPortfolio } from './types';

// Tax and regulatory constants
export const GIFT_TAX_ANNUAL_LIMIT = 1_100_000; // ¥1.1M per year per child
export const MIN_CONTRIBUTION_AMOUNT = 500; // ¥500 minimum
export const MAX_CONTRIBUTION_AMOUNT = 100_000; // ¥100K maximum monthly
export const MAX_FAMILY_CONTRIBUTORS = 5;

// File upload limits
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_CAPTION_LENGTH = 500; // 500 characters for captions
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/mov'];

// Pre-built ETF portfolios suitable for Japanese minor investment accounts
export const ETF_PORTFOLIOS: ETFPortfolio[] = [
  {
    id: 'conservative',
    name: 'Conservative Growth',
    nameJa: '安定成長型',
    description: 'Low-risk portfolio focused on stable Japanese and global markets',
    descriptionJa: '日本と世界の安定した市場に焦点を当てた低リスクポートフォリオ',
    riskLevel: 'low',
    expectedReturn: 4.5,
    minimumInvestment: 500,
    positions: [
      {
        symbol: '1306',
        name: 'TOPIX ETF',
        nameJa: 'TOPIX連動型上場投資信託',
        allocation: 40,
        expense_ratio: 0.06
      },
      {
        symbol: '1557',
        name: 'SPDR S&P 500 ETF',
        nameJa: 'SPDR S&P500 ETF',
        allocation: 30,
        expense_ratio: 0.09
      },
      {
        symbol: '2510',
        name: 'TOPIX ex-Financials ETF',
        nameJa: 'TOPIX除く金融業ETF',
        allocation: 20,
        expense_ratio: 0.25
      },
      {
        symbol: '1364',
        name: 'iShares Core MSCI KOKUSAI Index ETF',
        nameJa: 'iシェアーズ MSCI コクサイ インデックス ETF',
        allocation: 10,
        expense_ratio: 0.20
      }
    ]
  },
  {
    id: 'balanced',
    name: 'Balanced Growth',
    nameJa: 'バランス成長型',
    description: 'Moderate-risk portfolio balancing Japanese and international exposure',
    descriptionJa: '日本と海外への投資バランスを取った中リスクポートフォリオ',
    riskLevel: 'medium',
    expectedReturn: 6.2,
    minimumInvestment: 500,
    positions: [
      {
        symbol: '1306',
        name: 'TOPIX ETF',
        nameJa: 'TOPIX連動型上場投資信託',
        allocation: 25,
        expense_ratio: 0.06
      },
      {
        symbol: '1557',
        name: 'SPDR S&P 500 ETF',
        nameJa: 'SPDR S&P500 ETF',
        allocation: 35,
        expense_ratio: 0.09
      },
      {
        symbol: '1364',
        name: 'iShares Core MSCI KOKUSAI Index ETF',
        nameJa: 'iシェアーズ MSCI コクサイ インデックス ETF',
        allocation: 25,
        expense_ratio: 0.20
      },
      {
        symbol: '1582',
        name: 'iShares Core MSCI EM IMI Index ETF',
        nameJa: 'iシェアーズ MSCI エマージング・マーケット ETF',
        allocation: 15,
        expense_ratio: 0.65
      }
    ]
  },
  {
    id: 'growth',
    name: 'Growth Focused',
    nameJa: '成長重視型',
    description: 'Higher-risk portfolio emphasizing growth potential',
    descriptionJa: '成長の可能性を重視した高リスクポートフォリオ',
    riskLevel: 'high',
    expectedReturn: 8.1,
    minimumInvestment: 500,
    positions: [
      {
        symbol: '1557',
        name: 'SPDR S&P 500 ETF',
        nameJa: 'SPDR S&P500 ETF',
        allocation: 40,
        expense_ratio: 0.09
      },
      {
        symbol: '1364',
        name: 'iShares Core MSCI KOKUSAI Index ETF',
        nameJa: 'iシェアーズ MSCI コクサイ インデックス ETF',
        allocation: 30,
        expense_ratio: 0.20
      },
      {
        symbol: '1582',
        name: 'iShares Core MSCI EM IMI Index ETF',
        nameJa: 'iシェアーズ MSCI エマージング・マーケット ETF',
        allocation: 20,
        expense_ratio: 0.65
      },
      {
        symbol: '1306',
        name: 'TOPIX ETF',
        nameJa: 'TOPIX連動型上場投資信託',
        allocation: 10,
        expense_ratio: 0.06
      }
    ]
  }
];

// Japanese localization constants
export const JAPANESE_TEXT = {
  app: {
    name: '家族の未来プランナー',
    tagline: 'お子様の未来のための投資と思い出作り'
  },
  navigation: {
    dashboard: 'ダッシュボード',
    investments: '投資',
    memories: '思い出',
    family: '家族',
    settings: '設定'
  },
  dashboard: {
    totalBalance: '総残高',
    totalGains: '総利益',
    monthlyGrowth: '月次成長',
    recentMemories: '最近の思い出',
    recentTransactions: '最近の取引',
    giftTaxStatus: '贈与税状況',
    portfolioPerformance: 'ポートフォリオ実績'
  },
  investment: {
    account: '投資口座',
    portfolio: 'ポートフォリオ',
    contribution: '拠出',
    monthlyContribution: '月次拠出',
    oneTimeContribution: '一時拠出',
    riskLevel: 'リスクレベル',
    expectedReturn: '予想リターン',
    minimumInvestment: '最小投資額'
  },
  memory: {
    title: 'タイトル',
    description: '説明',
    milestone: 'マイルストーン',
    uploadPhoto: '写真をアップロード',
    uploadVideo: '動画をアップロード',
    addMemory: '思い出を追加',
    viewMemories: '思い出を見る'
  },
  family: {
    contributors: '貢献者',
    inviteFamily: '家族を招待',
    relationship: '続柄',
    totalContributed: '総拠出額',
    lastContribution: '最後の拠出',
    sendInvite: '招待を送る'
  },
  forms: {
    name: '名前',
    email: 'メールアドレス',
    phoneNumber: '電話番号',
    childName: 'お子様の名前',
    birthDate: '生年月日',
    amount: '金額',
    message: 'メッセージ',
    recurring: '定期拠出',
    submit: '送信',
    cancel: 'キャンセル',
    save: '保存'
  },
  messages: {
    success: '成功',
    error: 'エラー',
    loading: '読み込み中...',
    noData: 'データがありません',
    confirmDelete: '削除してもよろしいですか？',
    thankYouMessage: '{{childName}}からありがとうございます',
    giftTaxWarning: '年間贈与税限度額（110万円）にご注意ください'
  },
  relationships: {
    grandfather: '祖父',
    grandmother: '祖母',
    uncle: '叔父',
    aunt: '叔母',
    brother: '兄弟',
    sister: '姉妹',
    friend: '友人',
    other: 'その他'
  },
  milestones: {
    birth: '誕生',
    firstSmile: 'はじめての笑顔',
    firstWords: 'はじめての言葉',
    firstSteps: 'はじめての歩行',
    firstBirthday: '1歳の誕生日',
    schoolEntry: '入学',
    graduation: '卒業',
    other: 'その他'
  }
} as const;

// Risk level colors and icons
export const RISK_LEVELS = {
  low: {
    color: '#10B981', // Green
    colorJa: '緑',
    icon: '🛡️',
    description: '低リスク・安定',
    descriptionEn: 'Low Risk - Stable'
  },
  medium: {
    color: '#F59E0B', // Amber
    colorJa: '黄',
    icon: '⚖️',
    description: '中リスク・バランス',
    descriptionEn: 'Medium Risk - Balanced'
  },
  high: {
    color: '#EF4444', // Red
    colorJa: '赤',
    icon: '🚀',
    description: '高リスク・成長',
    descriptionEn: 'High Risk - Growth'
  }
} as const;

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Date formatting for Japanese locale
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};