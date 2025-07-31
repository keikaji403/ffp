'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/layout/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import FamilyContribution from '@/components/family/FamilyContribution';
import MemoryCapsule from '@/components/memory/MemoryCapsule';
import { 
  DashboardData, 
  Contributor, 
  Memory, 
  ContributionFormData, 
  MemoryFormData 
} from '@/lib/types';

// Mock data for demonstration
const mockDashboardData: DashboardData = {
  totalBalance: 678450,
  totalGains: 28450,
  gainPercentage: 4.37,
  monthlyGrowth: 5200,
  recentMemories: [
    {
      id: '1',
      childId: '1',
      title: 'はじめての笑顔',
      description: '今日、えみちゃんがはじめてにっこり笑ってくれました！',
      mediaUrl: '/api/placeholder/400/300',
      mediaType: 'photo',
      milestone: 'firstSmile',
      uploadedBy: '田中愛子',
      uploadedAt: new Date('2024-01-15'),
      tags: ['笑顔', '成長', '嬉しい'],
      isVisible: true
    },
    {
      id: '2',
      childId: '1',
      title: '公園デビュー',
      description: '近所の公園で遊びました。ブランコが大好きです。',
      mediaUrl: '/api/placeholder/400/300',
      mediaType: 'photo',
      milestone: 'other',
      uploadedBy: '田中愛子',
      uploadedAt: new Date('2024-01-10'),
      tags: ['公園', '外遊び', 'ブランコ'],
      isVisible: true
    }
  ],
  recentTransactions: [
    {
      id: '1',
      accountId: '1',
      type: 'deposit',
      amount: 10000,
      description: '月次自動拠出',
      executedAt: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      accountId: '1',
      type: 'buy',
      amount: 9500,
      symbol: '1306',
      shares: 4,
      price: 2375,
      description: 'TOPIX ETF 購入',
      executedAt: new Date('2024-01-02'),
      createdAt: new Date('2024-01-02')
    },
    {
      id: '3',
      accountId: '1',
      type: 'deposit',
      amount: 5000,
      contributorId: '2',
      description: 'おじいちゃんからの拠出',
      executedAt: new Date('2023-12-25'),
      createdAt: new Date('2023-12-25')
    }
  ],
  giftTaxStatus: {
    used: 85000,
    remaining: 1015000,
    year: 2024
  },
  portfolioPerformance: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    values: [50000, 52000, 48000, 55000, 58000, 62000]
  }
};

const mockContributors: Contributor[] = [
  {
    id: '1',
    childId: '1',
    name: '田中太郎',
    email: 'taro@tanaka.com',
    relationship: 'grandfather',
    totalContributed: 50000,
    isActive: true,
    invitedAt: new Date('2023-12-01'),
    lastContributionAt: new Date('2023-12-25')
  },
  {
    id: '2',
    childId: '1',
    name: '田中花子',
    email: 'hanako@tanaka.com',
    relationship: 'grandmother',
    totalContributed: 25000,
    isActive: true,
    invitedAt: new Date('2023-12-01'),
    lastContributionAt: new Date('2023-12-20')
  },
  {
    id: '3',
    childId: '1',
    name: '田中次郎',
    email: 'jiro@tanaka.com',
    relationship: 'uncle',
    totalContributed: 10000,
    isActive: false,
    invitedAt: new Date('2024-01-05')
  }
];

const mockMemories: Memory[] = [
  {
    id: '1',
    childId: '1',
    title: 'はじめての笑顔',
    description: '今日、えみちゃんがはじめてにっこり笑ってくれました！とても嬉しい瞬間でした。',
    mediaUrl: '/api/placeholder/400/300',
    mediaType: 'photo',
    milestone: 'firstSmile',
    uploadedBy: '田中愛子',
    uploadedAt: new Date('2024-01-15'),
    tags: ['笑顔', '成長', '嬉しい'],
    isVisible: true
  },
  {
    id: '2',
    childId: '1',
    title: '公園デビュー',
    description: '近所の公園で遊びました。ブランコが大好きです。お天気も良くて最高の日でした。',
    mediaUrl: '/api/placeholder/400/300',
    mediaType: 'photo',
    milestone: 'other',
    uploadedBy: '田中愛子',
    uploadedAt: new Date('2024-01-10'),
    tags: ['公園', '外遊び', 'ブランコ'],
    isVisible: true
  },
  {
    id: '3',
    childId: '1',
    title: 'お食い初め',
    description: '生後100日のお食い初めをしました。家族みんなでお祝いできて良かったです。',
    mediaUrl: '/api/placeholder/400/300',
    mediaType: 'photo',
    milestone: 'other',
    uploadedBy: '田中愛子',
    uploadedAt: new Date('2023-12-15'),
    tags: ['お食い初め', '家族', 'お祝い'],
    isVisible: true
  }
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState<DashboardData>(mockDashboardData);
  const [contributors, setContributors] = useState<Contributor[]>(mockContributors);
  const [memories, setMemories] = useState<Memory[]>(mockMemories);

  const childName = 'えみ';

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleAddMemory = (data: MemoryFormData) => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      childId: '1',
      title: data.title,
      description: data.description,
      mediaUrl: data.media ? URL.createObjectURL(data.media) : undefined,
      mediaType: data.media?.type.startsWith('image/') ? 'photo' : 'video',
      milestone: data.milestone,
      uploadedBy: '田中愛子',
      uploadedAt: new Date(),
      tags: data.tags,
      isVisible: true
    };

    setMemories(prev => [newMemory, ...prev]);
    
    // Update dashboard with new memory
    setDashboardData(prev => ({
      ...prev,
      recentMemories: [newMemory, ...prev.recentMemories].slice(0, 3)
    }));
  };

  const handleToggleMemoryVisibility = (memoryId: string) => {
    setMemories(prev => 
      prev.map(memory => 
        memory.id === memoryId 
          ? { ...memory, isVisible: !memory.isVisible }
          : memory
      )
    );
  };

  const handleInviteContributor = (email: string, name: string, relationship: string) => {
    const newContributor: Contributor = {
      id: Date.now().toString(),
      childId: '1',
      name,
      email,
      relationship,
      totalContributed: 0,
      isActive: false,
      invitedAt: new Date()
    };

    setContributors(prev => [...prev, newContributor]);
  };

  const handleMakeContribution = (contributorId: string, data: ContributionFormData) => {
    // Update contributor
    setContributors(prev => 
      prev.map(contributor => 
        contributor.id === contributorId
          ? {
              ...contributor,
              totalContributed: contributor.totalContributed + data.amount,
              lastContributionAt: new Date(),
              isActive: true
            }
          : contributor
      )
    );

    // Update dashboard data
    setDashboardData(prev => ({
      ...prev,
      totalBalance: prev.totalBalance + data.amount,
      giftTaxStatus: {
        ...prev.giftTaxStatus,
        used: prev.giftTaxStatus.used + data.amount,
        remaining: prev.giftTaxStatus.remaining - data.amount
      },
      recentTransactions: [
        {
          id: Date.now().toString(),
          accountId: '1',
          type: 'deposit',
          amount: data.amount,
          contributorId: contributorId,
          description: `${contributors.find(c => c.id === contributorId)?.name}からの拠出`,
          executedAt: new Date(),
          createdAt: new Date()
        },
        ...prev.recentTransactions
      ].slice(0, 5)
    }));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            data={dashboardData}
            childName={childName}
            onAddMemory={() => setCurrentPage('memories')}
            onInviteFamily={() => setCurrentPage('family')}
            onMakeContribution={() => setCurrentPage('family')}
          />
        );
      case 'family':
        return (
          <FamilyContribution
            childName={childName}
            contributors={contributors}
            giftTaxUsed={dashboardData.giftTaxStatus.used}
            taxYear={dashboardData.giftTaxStatus.year}
            onInviteContributor={handleInviteContributor}
            onMakeContribution={handleMakeContribution}
          />
        );
      case 'memories':
        return (
          <MemoryCapsule
            childName={childName}
            memories={memories}
            onAddMemory={handleAddMemory}
            onToggleVisibility={handleToggleMemoryVisibility}
          />
        );
      case 'investments':
        return (
          <div className="min-h-screen bg-gray-50 p-4 pt-20 pb-20 md:pt-20 md:pb-4">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">投資管理</h1>
              <p className="text-gray-600">投資ポートフォリオと取引履歴の詳細ページ（開発中）</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gray-50 p-4 pt-20 pb-20 md:pt-20 md:pb-4">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">設定</h1>
              <p className="text-gray-600">アプリの設定とアカウント管理（開発中）</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        childName={childName}
      />
      
      <main className="pt-16 pb-16 md:pt-16 md:pb-0">
        {renderCurrentPage()}
      </main>

      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
} 