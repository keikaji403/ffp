'use client';

import React, { useState } from 'react';
import { Users, Mail, Plus, Gift, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Contributor, ContributionFormData } from '@/lib/types';
import { 
  JAPANESE_TEXT, 
  formatCurrency, 
  formatDate, 
  GIFT_TAX_ANNUAL_LIMIT,
  MIN_CONTRIBUTION_AMOUNT,
  MAX_CONTRIBUTION_AMOUNT,
  MAX_FAMILY_CONTRIBUTORS 
} from '@/lib/constants';

interface FamilyContributionProps {
  childName: string;
  contributors: Contributor[];
  giftTaxUsed: number;
  taxYear: number;
  onInviteContributor: (email: string, name: string, relationship: string) => void;
  onMakeContribution: (contributorId: string, data: ContributionFormData) => void;
}

export default function FamilyContribution({
  childName,
  contributors,
  giftTaxUsed,
  taxYear,
  onInviteContributor,
  onMakeContribution
}: FamilyContributionProps) {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showContributionForm, setShowContributionForm] = useState<string | null>(null);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    relationship: ''
  });
  const [contributionForm, setContributionForm] = useState<ContributionFormData>({
    amount: MIN_CONTRIBUTION_AMOUNT,
    message: '',
    isRecurring: false,
    recurringAmount: undefined
  });

  const remainingGiftTax = GIFT_TAX_ANNUAL_LIMIT - giftTaxUsed;
  const canInviteMore = contributors.length < MAX_FAMILY_CONTRIBUTORS;

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteForm.name && inviteForm.email && inviteForm.relationship) {
      onInviteContributor(inviteForm.email, inviteForm.name, inviteForm.relationship);
      setInviteForm({ name: '', email: '', relationship: '' });
      setShowInviteForm(false);
    }
  };

  const handleContributionSubmit = (contributorId: string) => {
    if (contributionForm.amount >= MIN_CONTRIBUTION_AMOUNT) {
      onMakeContribution(contributorId, contributionForm);
      setContributionForm({
        amount: MIN_CONTRIBUTION_AMOUNT,
        message: '',
        isRecurring: false,
        recurringAmount: undefined
      });
      setShowContributionForm(null);
    }
  };

  const getThankYouMessage = () => {
    const messages = [
      `${childName}ちゃんからありがとうございます`,
      `${childName}ちゃんの未来のために、心より感謝いたします`,
      `${childName}ちゃんが大きくなったら、きっと感謝の気持ちでいっぱいになるでしょう`,
      `温かいお気持ちをありがとうございます`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {childName}ちゃんの{JAPANESE_TEXT.family.contributors}
        </h1>
        <p className="text-gray-600">家族みんなで{childName}ちゃんの未来を応援しましょう</p>
      </div>

      {/* Gift Tax Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">贈与税状況 ({taxYear}年)</h2>
          <Gift className="h-6 w-6 text-purple-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">使用済み</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(giftTaxUsed)}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">残り限度額</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(remainingGiftTax)}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">年間限度額</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(GIFT_TAX_ANNUAL_LIMIT)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>贈与税使用状況</span>
            <span>{((giftTaxUsed / GIFT_TAX_ANNUAL_LIMIT) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((giftTaxUsed / GIFT_TAX_ANNUAL_LIMIT) * 100, 100)}%` }}
            />
          </div>
        </div>

        {remainingGiftTax < 100000 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">贈与税限度額にご注意ください</p>
              <p className="text-xs text-amber-700 mt-1">
                残り{formatCurrency(remainingGiftTax)}です。限度額を超えると贈与税が発生する可能性があります。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Invite New Contributor */}
      {canInviteMore && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{JAPANESE_TEXT.family.inviteFamily}</h2>
            <Button 
              onClick={() => setShowInviteForm(!showInviteForm)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              家族を招待
            </Button>
          </div>

          {showInviteForm && (
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {JAPANESE_TEXT.forms.name}
                  </label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="田中太郎"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {JAPANESE_TEXT.forms.email}
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tanaka@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {JAPANESE_TEXT.family.relationship}
                </label>
                <select
                  value={inviteForm.relationship}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, relationship: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">続柄を選択してください</option>
                  <option value="grandfather">{JAPANESE_TEXT.relationships.grandfather}</option>
                  <option value="grandmother">{JAPANESE_TEXT.relationships.grandmother}</option>
                  <option value="uncle">{JAPANESE_TEXT.relationships.uncle}</option>
                  <option value="aunt">{JAPANESE_TEXT.relationships.aunt}</option>
                  <option value="brother">{JAPANESE_TEXT.relationships.brother}</option>
                  <option value="sister">{JAPANESE_TEXT.relationships.sister}</option>
                  <option value="friend">{JAPANESE_TEXT.relationships.friend}</option>
                  <option value="other">{JAPANESE_TEXT.relationships.other}</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {JAPANESE_TEXT.family.sendInvite}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowInviteForm(false)}
                  className="flex-1"
                >
                  {JAPANESE_TEXT.forms.cancel}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Contributors List */}
      <div className="space-y-6">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{contributor.name}</h3>
                  <p className="text-sm text-gray-600">
                    {JAPANESE_TEXT.relationships[contributor.relationship as keyof typeof JAPANESE_TEXT.relationships] || contributor.relationship}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(contributor.totalContributed)}
                </p>
                <p className="text-sm text-gray-600">{JAPANESE_TEXT.family.totalContributed}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">招待日</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(contributor.invitedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{JAPANESE_TEXT.family.lastContribution}</span>
                <span className="text-sm font-medium text-gray-900">
                  {contributor.lastContributionAt 
                    ? formatDate(contributor.lastContributionAt) 
                    : 'まだなし'
                  }
                </span>
              </div>
            </div>

            {contributor.isActive && (
              <>
                <Button
                  onClick={() => setShowContributionForm(
                    showContributionForm === contributor.id ? null : contributor.id
                  )}
                  className="w-full mb-4"
                  variant="outline"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  拠出する
                </Button>

                {showContributionForm === contributor.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {JAPANESE_TEXT.forms.amount} (¥)
                        </label>
                        <input
                          type="number"
                          min={MIN_CONTRIBUTION_AMOUNT}
                          max={Math.min(MAX_CONTRIBUTION_AMOUNT, remainingGiftTax)}
                          value={contributionForm.amount}
                          onChange={(e) => setContributionForm(prev => ({ 
                            ...prev, 
                            amount: parseInt(e.target.value) || MIN_CONTRIBUTION_AMOUNT 
                          }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          最小: {formatCurrency(MIN_CONTRIBUTION_AMOUNT)}, 
                          最大: {formatCurrency(Math.min(MAX_CONTRIBUTION_AMOUNT, remainingGiftTax))}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          定期拠出設定
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={contributionForm.isRecurring}
                            onChange={(e) => setContributionForm(prev => ({ 
                              ...prev, 
                              isRecurring: e.target.checked 
                            }))}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">毎月定期拠出</span>
                        </div>
                        {contributionForm.isRecurring && (
                          <input
                            type="number"
                            min={MIN_CONTRIBUTION_AMOUNT}
                            max={MAX_CONTRIBUTION_AMOUNT}
                            value={contributionForm.recurringAmount || MIN_CONTRIBUTION_AMOUNT}
                            onChange={(e) => setContributionForm(prev => ({ 
                              ...prev, 
                              recurringAmount: parseInt(e.target.value) || MIN_CONTRIBUTION_AMOUNT 
                            }))}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="月次拠出額"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {JAPANESE_TEXT.forms.message}
                      </label>
                      <textarea
                        value={contributionForm.message}
                        onChange={(e) => setContributionForm(prev => ({ 
                          ...prev, 
                          message: e.target.value 
                        }))}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={getThankYouMessage()}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleContributionSubmit(contributor.id)}
                        className="flex-1"
                        disabled={contributionForm.amount > remainingGiftTax}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        拠出を実行
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowContributionForm(null)}
                        className="flex-1"
                      >
                        {JAPANESE_TEXT.forms.cancel}
                      </Button>
                    </div>

                    {contributionForm.amount > remainingGiftTax && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          拠出額が贈与税の残り限度額を超えています。
                          限度額: {formatCurrency(remainingGiftTax)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {!contributor.isActive && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  招待を送信済みです。{contributor.name}さんからの返答をお待ちください。
                </p>
              </div>
            )}
          </div>
        ))}

        {contributors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              まだ家族が招待されていません
            </h3>
            <p className="text-gray-600 mb-6">
              {childName}ちゃんの未来のために、家族や友人を招待しましょう
            </p>
            <Button onClick={() => setShowInviteForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              最初の家族を招待
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}