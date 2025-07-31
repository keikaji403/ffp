'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Camera, Users, PiggyBank, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardData, Memory, Transaction } from '@/lib/types';
import { JAPANESE_TEXT, formatCurrency, formatDate, RISK_LEVELS } from '@/lib/constants';

interface DashboardProps {
  data: DashboardData;
  childName: string;
  onAddMemory: () => void;
  onInviteFamily: () => void;
  onMakeContribution: () => void;
}

// Mock data for demo purposes
const mockPortfolioData = [
  { month: '1月', value: 50000 },
  { month: '2月', value: 52000 },
  { month: '3月', value: 48000 },
  { month: '4月', value: 55000 },
  { month: '5月', value: 58000 },
  { month: '6月', value: 62000 },
];

const mockAllocationData = [
  { name: 'TOPIX ETF', value: 40, color: '#8884d8' },
  { name: 'S&P 500 ETF', value: 30, color: '#82ca9d' },
  { name: 'TOPIX除く金融業', value: 20, color: '#ffc658' },
  { name: 'MSCI KOKUSAI', value: 10, color: '#ff7c7c' },
];

export default function Dashboard({ 
  data, 
  childName, 
  onAddMemory, 
  onInviteFamily, 
  onMakeContribution 
}: DashboardProps) {
  const isPositiveGrowth = data.gainPercentage >= 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {childName}ちゃんの{JAPANESE_TEXT.navigation.dashboard}
        </h1>
        <p className="text-gray-600">{JAPANESE_TEXT.app.tagline}</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {JAPANESE_TEXT.dashboard.totalBalance}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(data.totalBalance)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Gains */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {JAPANESE_TEXT.dashboard.totalGains}
              </p>
              <p className={`text-3xl font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(data.totalGains)}
              </p>
              <p className={`text-sm flex items-center mt-1 ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveGrowth ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {data.gainPercentage.toFixed(2)}%
              </p>
            </div>
            <div className={`p-3 rounded-full ${isPositiveGrowth ? 'bg-green-100' : 'bg-red-100'}`}>
              {isPositiveGrowth ? (
                <TrendingUp className="h-6 w-6 text-green-600" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        {/* Gift Tax Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {JAPANESE_TEXT.dashboard.giftTaxStatus}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(data.giftTaxStatus.remaining)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                残り限度額 ({data.giftTaxStatus.year}年)
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {JAPANESE_TEXT.dashboard.monthlyGrowth}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(data.monthlyGrowth)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Portfolio Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {JAPANESE_TEXT.dashboard.portfolioPerformance}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockPortfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '評価額']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Allocation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ポートフォリオ配分
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAllocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '配分']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button onClick={onMakeContribution} className="h-16 flex items-center justify-center">
          <PiggyBank className="h-5 w-5 mr-2" />
          拠出する
        </Button>
        <Button onClick={onAddMemory} variant="outline" className="h-16 flex items-center justify-center">
          <Camera className="h-5 w-5 mr-2" />
          {JAPANESE_TEXT.memory.addMemory}
        </Button>
        <Button onClick={onInviteFamily} variant="secondary" className="h-16 flex items-center justify-center">
          <Users className="h-5 w-5 mr-2" />
          {JAPANESE_TEXT.family.inviteFamily}
        </Button>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Memories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {JAPANESE_TEXT.dashboard.recentMemories}
          </h3>
          {data.recentMemories.length > 0 ? (
            <div className="space-y-4">
              {data.recentMemories.slice(0, 3).map((memory) => (
                <div key={memory.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Camera className="h-8 w-8 text-gray-400 bg-white p-1.5 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {memory.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {memory.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(memory.uploadedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">まだ思い出がありません</p>
              <Button onClick={onAddMemory} variant="outline" className="mt-4">
                最初の思い出を追加
              </Button>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {JAPANESE_TEXT.dashboard.recentTransactions}
          </h3>
          {data.recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {data.recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'deposit' ? 'bg-green-100' : 
                      transaction.type === 'buy' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <PiggyBank className={`h-4 w-4 ${
                        transaction.type === 'deposit' ? 'text-green-600' : 
                        transaction.type === 'buy' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.executedAt)}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <PiggyBank className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">取引履歴がありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}