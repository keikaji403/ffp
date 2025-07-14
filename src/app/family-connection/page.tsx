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
  image?: string;
  comments: Comment[];
  viewedBy: string[];
  updates: ProjectUpdate[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

interface ProjectUpdate {
  id: string;
  type: 'donation' | 'milestone' | 'photo' | 'message';
  author: string;
  content: string;
  amount?: number;
  timestamp: string;
  image?: string;
}

// サンプルデータ（みてね風に拡張）
const sampleProjects: Project[] = [
  {
    id: '1',
    title: '🎒 小学校入学資金',
    description: 'もうすぐ小学校！みんなでお祝いの準備をしましょう',
    targetAmount: 150000,
    currentAmount: 87000,
    deadline: '2025-03-31',
    status: 'active',
    participants: ['おじいちゃん', 'おばあちゃん', '叔父さん', 'お父さん', 'お母さん'],
    createdBy: 'お母さん',
    createdAt: '2024-12-01',
    image: '🎒',
    viewedBy: ['おじいちゃん', 'おばあちゃん', 'お父さん'],
    comments: [
      {
        id: '1',
        author: 'おじいちゃん',
        content: '孫の入学が楽しみです！ランドセルは赤がいいかな？',
        timestamp: '1時間前'
      },
      {
        id: '2',
        author: 'お母さん',
        content: '本人は水色がいいって言ってます😊',
        timestamp: '30分前'
      }
    ],
    updates: [
      {
        id: '1',
        type: 'donation',
        author: 'おじいちゃん',
        content: '入学お祝い金です',
        amount: 50000,
        timestamp: '2日前'
      },
      {
        id: '2',
        type: 'photo',
        author: 'お母さん',
        content: 'ランドセルを見に行きました',
        timestamp: '1日前',
        image: '📸'
      }
    ]
  },
  {
    id: '2',
    title: '📚 塾費用（1年間）',
    description: '中学受験に向けて、みんなで応援しよう',
    targetAmount: 800000,
    currentAmount: 320000,
    deadline: '2025-02-28',
    status: 'active',
    participants: ['おじいちゃん', 'おばあちゃん', 'お父さん', 'お母さん'],
    createdBy: 'お父さん',
    createdAt: '2024-11-15',
    image: '📚',
    viewedBy: ['おばあちゃん', 'お父さん', 'お母さん'],
    comments: [
      {
        id: '1',
        author: 'おばあちゃん',
        content: '勉強頑張ってね〜！',
        timestamp: '3時間前'
      }
    ],
    updates: [
      {
        id: '1',
        type: 'milestone',
        author: 'お父さん',
        content: '模試の結果が良かったです！',
        timestamp: '1週間前'
      }
    ]
  }
];

// プロジェクト作成フォーム
interface ProjectFormData {
  title: string;
  description: string;
  targetAmount: string;
  deadline: string;
  emoji: string;
}

export default function FamilyConnectionPage() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    targetAmount: '',
    deadline: '',
    emoji: '💰'
  });

  // 金額をフォーマット
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP') + '円';
  };

  // 進捗率を計算
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  // 残り日数を計算
  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // コメント追加
  const addComment = (projectId: string) => {
    if (!newComment.trim()) return;

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newCommentObj: Comment = {
          id: Date.now().toString(),
          author: 'お母さん',
          content: newComment,
          timestamp: 'たった今'
        };
        return {
          ...project,
          comments: [...project.comments, newCommentObj]
        };
      }
      return project;
    }));
    setNewComment('');
  };

  // プロジェクト作成
  const handleCreateProject = () => {
    if (!formData.title || !formData.description || !formData.targetAmount || !formData.deadline) {
      alert('全ての項目を入力してください');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title: `${formData.emoji} ${formData.title}`,
      description: formData.description,
      targetAmount: parseInt(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      status: 'active',
      participants: ['お母さん'],
      createdBy: 'お母さん',
      createdAt: new Date().toISOString().split('T')[0],
      image: formData.emoji,
      comments: [],
      viewedBy: [],
      updates: []
    };

    setProjects([newProject, ...projects]);
    setFormData({ title: '', description: '', targetAmount: '', deadline: '', emoji: '💰' });
    setShowCreateForm(false);
  };

  // 送金リンク生成（モック）
  const generatePaymentLink = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    alert(`💝 送金リンクが生成されました！\n\n${project?.title}への支援\n\n📱 PayPay: https://paypay.ne.jp/send/${projectId}\n💬 LINE Pay: https://line.me/pay/${projectId}\n\n家族にシェアして温かい支援を送りましょう！`);
  };

  const emojiOptions = ['💰', '🎒', '📚', '🏫', '👨‍👩‍👧‍👦', '🎁', '⚽', '🎵', '🍎', '🌸'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - みてね風のあたたかいデザイン */}
      <header className="bg-white shadow-sm border-b-2 border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                ← ホームに戻る
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="text-3xl mr-2">👨‍👩‍👧‍👦</span>
                  ファミリーコネクション
                </h1>
                <p className="text-sm text-gray-600">家族みんなで応援しよう</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3 shadow-lg"
            >
              ＋ 新しい応援
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview - みてね風 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <div className="text-2xl mb-1">💕</div>
            <div className="text-lg font-bold text-gray-900">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <div className="text-xs text-gray-600">応援中</div>
          </Card>

          <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-2xl mb-1">✨</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(projects.reduce((sum, p) => sum + p.currentAmount, 0))}
            </div>
            <div className="text-xs text-gray-600">みんなの想い</div>
          </Card>

          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-2xl mb-1">👪</div>
            <div className="text-lg font-bold text-gray-900">8人</div>
            <div className="text-xs text-gray-600">家族</div>
          </Card>
        </div>

        {/* Create Project Form - より温かみのあるデザイン */}
        {showCreateForm && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                新しい応援プロジェクト
              </h2>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                size="sm"
                className="text-gray-500"
              >
                キャンセル
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  絵文字を選択
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({...formData, emoji})}
                      className={`text-2xl p-2 rounded-lg border-2 ${
                        formData.emoji === emoji 
                          ? 'border-pink-400 bg-pink-100' 
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
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
                    className="border-pink-200 focus:border-pink-400"
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
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージ
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    rows={3}
                    placeholder="家族へのメッセージを書いてください"
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
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleCreateProject}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full"
                >
                  みんなに応援をお願い ✨
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Timeline - みてね風タイムライン */}
        <div className="space-y-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-white border-2 border-gray-100 hover:border-pink-200 transition-all">
              {/* プロジェクトヘッダー */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-3xl">{project.image}</span>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status === 'active' ? '応援中' : 
                         project.status === 'completed' ? '達成' : '期限切れ'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    
                    {/* みたよ機能 */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <span className="mr-1">👀</span>
                        みたよ：
                      </span>
                      {project.viewedBy.map((viewer, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {viewer}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-500 mb-1">
                      あと{getDaysLeft(project.deadline)}日
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.createdBy}が作成
                    </div>
                  </div>
                </div>

                {/* プログレスバー - より温かみのあるデザイン */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 flex items-center">
                      <span className="mr-1">💰</span>
                      達成度
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(project.currentAmount)} / {formatCurrency(project.targetAmount)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{width: `${calculateProgress(project.currentAmount, project.targetAmount)}%`}}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {calculateProgress(project.currentAmount, project.targetAmount).toFixed(1)}% 達成 ✨
                  </p>
                </div>

                {/* 家族メンバー表示 */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <span className="mr-1">👥</span>
                    応援メンバー
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.participants.map((participant, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200">
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* コメントセクション - みてね風 */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="space-y-3 mb-4">
                  {project.comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>

                {/* コメント入力 */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={selectedProject === project.id ? newComment : ''}
                    onChange={(e) => {
                      setSelectedProject(project.id);
                      setNewComment(e.target.value);
                    }}
                    placeholder="応援メッセージを書く..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addComment(project.id);
                      }
                    }}
                  />
                  <Button
                    onClick={() => addComment(project.id)}
                    size="sm"
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4"
                  >
                    送信
                  </Button>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => generatePaymentLink(project.id)}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full flex-1"
                    size="sm"
                  >
                    💝 応援する
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full"
                  >
                    📊 詳細
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    📸 写真
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 空の状態メッセージ */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">まだプロジェクトがありません</h3>
            <p className="text-gray-600 mb-6">家族みんなで応援できるプロジェクトを作成しましょう</p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-3"
            >
              最初のプロジェクトを作成 ✨
            </Button>
          </div>
        )}
      </main>
    </div>
  );
} 