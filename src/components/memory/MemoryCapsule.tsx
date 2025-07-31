'use client';

import React, { useState, useRef } from 'react';
import { Camera, Video, Upload, Calendar, Tag, Heart, Eye, Plus, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Memory, MemoryFormData } from '@/lib/types';
import { 
  JAPANESE_TEXT, 
  formatDate, 
  MAX_FILE_SIZE, 
  MAX_CAPTION_LENGTH,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES 
} from '@/lib/constants';

interface MemoryCapsuleProps {
  childName: string;
  memories: Memory[];
  onAddMemory: (data: MemoryFormData) => void;
  onToggleVisibility: (memoryId: string) => void;
}

export default function MemoryCapsule({
  childName,
  memories,
  onAddMemory,
  onToggleVisibility
}: MemoryCapsuleProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string>('');
  const [formData, setFormData] = useState<MemoryFormData>({
    title: '',
    description: '',
    milestone: '',
    media: undefined,
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filterMilestone, setFilterMilestone] = useState<string>('all');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`ファイルサイズが大きすぎます。最大サイズ: ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`);
      return;
    }

    // Check file type
    const isImage = SUPPORTED_IMAGE_TYPES.includes(file.type);
    const isVideo = SUPPORTED_VIDEO_TYPES.includes(file.type);
    
    if (!isImage && !isVideo) {
      alert('サポートされていないファイル形式です。');
      return;
    }

    setFormData(prev => ({ ...prev, media: file }));
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onAddMemory({
        ...formData,
        milestone: selectedMilestone || undefined
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        milestone: '',
        media: undefined,
        tags: []
      });
      setSelectedMilestone('');
      setPreviewUrl('');
      setShowAddForm(false);
    }
  };

  const filteredMemories = memories.filter(memory => 
    filterMilestone === 'all' || memory.milestone === filterMilestone
  );

  const groupedMemories = filteredMemories.reduce((groups, memory) => {
    const year = new Date(memory.uploadedAt).getFullYear();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(memory);
    return groups;
  }, {} as Record<number, Memory[]>);

  const milestoneOptions = Object.entries(JAPANESE_TEXT.milestones);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {childName}ちゃんの{JAPANESE_TEXT.memory.viewMemories}
        </h1>
        <p className="text-gray-600">大切な瞬間を残して、成長の記録を作りましょう</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {JAPANESE_TEXT.memory.addMemory}
        </Button>
        
        {/* Filter by Milestone */}
        <select
          value={filterMilestone}
          onChange={(e) => setFilterMilestone(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">すべての思い出</option>
          {milestoneOptions.map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Add Memory Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">新しい思い出を追加</h2>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setShowAddForm(false);
                  setPreviewUrl('');
                  setFormData({
                    title: '',
                    description: '',
                    milestone: '',
                    media: undefined,
                    tags: []
                  });
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {JAPANESE_TEXT.memory.title} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例: はじめての笑顔"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {JAPANESE_TEXT.memory.description} *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  maxLength={MAX_CAPTION_LENGTH}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="この瞬間について詳しく書いてください..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/{MAX_CAPTION_LENGTH}文字
                </p>
              </div>

              {/* Milestone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {JAPANESE_TEXT.memory.milestone}
                </label>
                <select
                  value={selectedMilestone}
                  onChange={(e) => setSelectedMilestone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">マイルストーンを選択（任意）</option>
                  {milestoneOptions.map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  写真・動画
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      {formData.media?.type.startsWith('image/') ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="max-w-full h-48 object-cover mx-auto rounded-lg"
                        />
                      ) : (
                        <video 
                          src={previewUrl} 
                          controls 
                          className="max-w-full h-48 mx-auto rounded-lg"
                        />
                      )}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setPreviewUrl('');
                          setFormData(prev => ({ ...prev, media: undefined }));
                        }}
                      >
                        ファイルを削除
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-4">
                        <Camera className="h-12 w-12 text-gray-400" />
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-600 mb-2">写真や動画をアップロード</p>
                        <p className="text-xs text-gray-500">
                          最大{Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB、
                          JPEG/PNG/WebP、MP4/WebM/MOV
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        ファイルを選択
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={[...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES].join(',')}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タグ
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="タグを追加（例: 笑顔、公園、初体験）"
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    追加
                  </Button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  思い出を保存
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Memories Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedMemories)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([year, yearMemories]) => (
            <div key={year} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  {year}年の思い出 ({yearMemories.length}個)
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearMemories
                    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
                    .map((memory) => (
                      <div key={memory.id} className="bg-gray-50 rounded-lg overflow-hidden">
                        {/* Media Preview */}
                        {memory.mediaUrl && (
                          <div className="relative h-48 bg-gray-200">
                            {memory.mediaType === 'photo' ? (
                              <img 
                                src={memory.mediaUrl} 
                                alt={memory.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <Play className="h-12 w-12 text-white" />
                                <video 
                                  src={memory.mediaUrl}
                                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                                  poster=""
                                />
                              </div>
                            )}
                            <button
                              onClick={() => onToggleVisibility(memory.id)}
                              className={`absolute top-2 right-2 p-2 rounded-full ${
                                memory.isVisible 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {memory.title}
                            </h3>
                            {memory.milestone && (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                {JAPANESE_TEXT.milestones[memory.milestone as keyof typeof JAPANESE_TEXT.milestones]}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {memory.description}
                          </p>
                          
                          {memory.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {memory.tags.slice(0, 3).map((tag, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600"
                                >
                                  <Tag className="h-2 w-2 mr-1" />
                                  {tag}
                                </span>
                              ))}
                              {memory.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{memory.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{formatDate(memory.uploadedAt)}</span>
                            <span>by {memory.uploadedBy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}

        {memories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <Camera className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              まだ思い出がありません
            </h3>
            <p className="text-gray-600 mb-8">
              {childName}ちゃんの最初の思い出を記録しましょう
            </p>
            <Button onClick={() => setShowAddForm(true)} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              最初の思い出を追加
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}