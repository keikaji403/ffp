'use client';

import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  Camera, 
  Users, 
  Settings, 
  Menu, 
  X, 
  PiggyBank,
  Gift
} from 'lucide-react';
import { JAPANESE_TEXT } from '@/lib/constants';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  childName: string;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: JAPANESE_TEXT.navigation.dashboard,
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'investments',
    label: JAPANESE_TEXT.navigation.investments,
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 'memories',
    label: JAPANESE_TEXT.navigation.memories,
    icon: Camera,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'family',
    label: JAPANESE_TEXT.navigation.family,
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    id: 'settings',
    label: JAPANESE_TEXT.navigation.settings,
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
];

export default function Navigation({ currentPage, onNavigate, childName }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16">
            {/* Logo and App Name */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <PiggyBank className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {JAPANESE_TEXT.app.name}
                  </h1>
                  <p className="text-xs text-gray-600">{childName}ちゃんの未来</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? `${item.bgColor} ${item.color}` 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {childName.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  {childName}ちゃんの保護者
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex justify-between items-center px-4 h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <PiggyBank className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">
              {JAPANESE_TEXT.app.name}
            </span>
          </div>

          {/* Child Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {childName.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-700">{childName}ちゃん</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? `${item.bgColor} ${item.color}` 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center justify-center px-1 py-2 transition-colors ${
                  isActive 
                    ? item.color 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium leading-none">{item.label}</span>
                {isActive && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ${item.color.replace('text-', 'bg-')}`} />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}