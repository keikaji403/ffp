'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Input from '@/components/ui/Input';

// プロジェクトの型定義
interface Project {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'active' | 'completed' | 'expired';
  participants: string[];
  createdBy: string;
  createdAt: string;
}

// サンプルデータ
const sampleProjects: Project[] = [
  {
    id: '1',
    title: '小学校入学資金',
    description: '来年春の小学校入学に向けた準備資金です。ランドセル、学用品、制服代などを含みます。',
    targetAmount: 150000,
    currentAmount: 87000,
    deadline: '2025-03-31',
    status: 'active',
    participants: ['おじいちゃん', 'おばあちゃん', '叔父さん', 'お父さん'],
    createdBy: 'お母さん',
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    title: '塾費用（1年間）',
    description: '中学受験に向けた塾の年間費用です。月謝、教材費、模試代を含みます。',
    targetAmount: 800000,
    currentAmount: 320000,
    deadline: '2025-02-28',
    status: 'active',
    participants: ['おじいちゃん', 'おばあちゃん', 'お父さん', 'お母さん'],
    createdBy: 'お父さん',
    createdAt: '2024-11-15'
  },
  {
    id: '3',
    title: '制服代',
    description: '中学校入学用の制服一式です。夏服・冬服・体操服・カバン等を含みます。',
    targetAmount: 80000,
    currentAmount: 80000,
    deadline: '2024-12-31',
    status: 'completed',
    participants: ['おじいちゃん', 'おばあちゃん', 'お父さん'],
    createdBy: 'お母さん',
    createdAt: '2024-10-01'
  }
];

// プロジェクト作成フォーム
interface ProjectFormData {
  title: string;
  description: string;
  targetAmount: string;
  deadline: string;
}

export default function FamilyConnectionPage() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    targetAmount: '',
    deadline: ''
  });

  // 金額をフォーマット
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP') + '円';
  };

  // 進捗率を計算
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  // プロジェクト作成
  const handleCreateProject = () => {
    if (!formData.title || !formData.description || !formData.targetAmount || !formData.deadline) {
      alert('全ての項目を入力してください');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetAmount: parseInt(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      status: 'active',
      participants: ['お母さん'],
      createdBy: 'お母さん',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects([newProject, ...projects]);
    setFormData({ title: '', description: '', targetAmount: '', deadline: '' });
    setShowCreateForm(false);
  };

  // 送金リンク生成（モック）
  const generatePaymentLink = (projectId: string) => {
    alert(`送金リンクが生成されました！\n\nPayPay: https://paypay.ne.jp/send/${projectId}\nLINE Pay: https://line.me/pay/${projectId}\n\n家族にシェアしてください！`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-500 hover:text-gray-700">
                ← 戻る
              </a>
              <h1 className="text-2xl font-bold text-gray-900">
                ファミリーコネクション
              </h1>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              新規プロジェクト作成
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">進行中プロジェクト</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'active').length}件
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">総支援額</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(projects.reduce((sum, p) => sum + p.currentAmount, 0))}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">参加者</p>
                <p className="text-2xl font-bold text-gray-900">8人</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">新規プロジェクト作成</h2>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                size="sm"
              >
                キャンセル
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  プロジェクト名
                </label>
                <Input
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})}
                  placeholder="例：小学校入学資金"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  目標金額
                </label>
                <Input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, targetAmount: e.target.value})}
                  placeholder="150000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="プロジェクトの詳細を入力してください"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  期限
                </label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleCreateProject}
                className="bg-purple-600 hover:bg-purple-700"
              >
                プロジェクトを作成
              </Button>
            </div>
          </Card>
        )}

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">プロジェクト一覧</h2>
          
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'active' ? '進行中' : 
                       project.status === 'completed' ? '完了' : '期限切れ'}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">期限: {project.deadline}</p>
                  <p className="text-sm text-gray-500">作成者: {project.createdBy}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">進捗</span>
                  <span className="text-sm text-gray-900">
                    {formatCurrency(project.currentAmount)} / {formatCurrency(project.targetAmount)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{width: `${calculateProgress(project.currentAmount, project.targetAmount)}%`}}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {calculateProgress(project.currentAmount, project.targetAmount).toFixed(1)}% 達成
                </p>
              </div>

              {/* Participants */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">参加者</p>
                <div className="flex flex-wrap gap-2">
                  {project.participants.map((participant, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {participant}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => generatePaymentLink(project.id)}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  送金リンク作成
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  詳細を見る
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  メッセージ
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
} 