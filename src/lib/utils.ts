import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSのクラスを動的に結合する
 * clsxで条件付きクラスを処理し、tailwind-mergeで重複を除去
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 価格を日本円フォーマットに変換
 */
export function formatJPY(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * 数値を日本語の単位で表示（万円、千万円など）
 */
export function formatJPYShort(amount: number): string {
  if (amount >= 100000000) {
    return `${Math.floor(amount / 10000000)}千万円`;
  } else if (amount >= 10000000) {
    return `${Math.floor(amount / 1000000)}百万円`;
  } else if (amount >= 10000) {
    return `${Math.floor(amount / 10000)}万円`;
  } else {
    return `${amount.toLocaleString()}円`;
  }
}

/**
 * 日付を日本語フォーマットに変換
 */
export function formatDateJP(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * パーセンテージを表示用にフォーマット
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * 年齢から学年を計算
 */
export function calculateGrade(age: number): string {
  if (age < 3) return "未就学";
  if (age < 6) return "幼稚園";
  if (age < 12) return `小学${age - 5}年`;
  if (age < 15) return `中学${age - 11}年`;
  if (age < 18) return `高校${age - 14}年`;
  if (age < 22) return `大学${age - 17}年`;
  return "卒業";
}

/**
 * 投資期間を計算（子供の年齢から大学卒業まで）
 */
export function calculateInvestmentPeriod(childAge: number): number {
  const graduationAge = 22;
  return Math.max(0, graduationAge - childAge);
} 