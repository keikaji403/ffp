# 家族の未来プランナー (Japanese Family Investment App)

A mobile-first web application designed for Japanese families to save and invest for their children's future through custodial minor investment accounts, facilitate family contributions, and capture emotional milestones in a digital memory capsule.

## 🌟 Features

### 📊 Investment Dashboard
- **Portfolio Tracking**: Real-time investment performance with Japanese ETF portfolios
- **Tax-Efficient Investing**: Custodial minor investment accounts (未成年口座) support
- **Goal Visualization**: Track progress toward children's education and future funding

### 👨‍👩‍👧‍👦 Family Contribution System
- **Gift Tax Management**: Automatic tracking of Japan's ¥1.1M annual gift tax exemption
- **Family Invitations**: Invite up to 5 family members (grandparents, relatives, friends)
- **Collaborative Saving**: One-time and recurring contributions with personalized messages
- **Cultural Thank-You System**: Automated Japanese thank-you message templates

### 📸 Memory Capsule
- **Timeline View**: Organize memories by year with milestone categorization
- **Milestone Tracking**: Pre-defined Japanese milestones (はじめての笑顔, 入学, etc.)
- **Media Support**: Photo and video uploads (up to 50MB)
- **Privacy Controls**: Family-only sharing with visibility toggles
- **Tagging System**: Organize memories with custom tags

### 🎌 Japanese-First Design
- **Mobile-First UI**: Optimized for Japanese smartphone usage patterns
- **Cultural Considerations**: Family-oriented messaging and relationship hierarchies
- **Localized Content**: Full Japanese interface with cultural nuances
- **Regulatory Compliance**: Built for Japanese financial regulations (FIEA, PIPA)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with Japanese-friendly responsive design
- **Charts**: Recharts for investment visualization
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React hooks with local state
- **Forms**: React Hook Form with Zod validation

## 📱 MVP Features Implemented

✅ **Investment Dashboard**
- Portfolio performance charts
- Key metrics cards (balance, gains, gift tax status)
- Recent transactions and memories feed

✅ **Family Contribution System**
- Contributor management with Japanese relationship types
- Gift tax limit tracking and warnings
- Contribution forms with recurring payment options

✅ **Memory Capsule**
- Photo/video upload with preview
- Timeline organization by year
- Milestone categorization
- Tag management system

✅ **Japanese UI/UX**
- Mobile-first responsive navigation
- Japanese text throughout
- Cultural design patterns
- Family-oriented user experience

## 🎯 Target User Persona: Aiko Tanaka

- **Age**: 34-year-old mother in Tokyo
- **Income**: ¥8M household income
- **Goal**: Build ¥5-10M fund for daughter's university/wedding/home
- **Pain Points**: Busy with work/childcare, intimidated by investment complexity
- **Preferences**: Mobile-first, Japanese interface, family collaboration

## 💰 Investment Portfolio Options

### 安定成長型 (Conservative Growth)
- TOPIX ETF (40%), S&P 500 ETF (30%), TOPIX ex-Financials (20%), MSCI KOKUSAI (10%)
- Expected Return: 4.5%
- Risk Level: Low

### バランス成長型 (Balanced Growth)
- TOPIX ETF (25%), S&P 500 ETF (35%), MSCI KOKUSAI (25%), Emerging Markets (15%)
- Expected Return: 6.2%
- Risk Level: Medium

### 成長重視型 (Growth Focused)
- S&P 500 ETF (40%), MSCI KOKUSAI (30%), Emerging Markets (20%), TOPIX ETF (10%)
- Expected Return: 8.1%
- Risk Level: High

## 🏛️ Regulatory Considerations

- **FIEA Compliance**: Partners with licensed brokers (Rakuten/SBI Securities)
- **Gift Tax Tracking**: Automatic monitoring of ¥1.1M annual exemption
- **PIPA Compliance**: Privacy-first data handling
- **Tax Disclaimers**: Built-in warnings and advisor recommendations

## 🔜 Future Enhancements

- Backend API integration (FastAPI + SQLite)
- 2FA authentication via SMS
- Real broker API connections
- Advanced portfolio customization
- Premium features and subscription model
- Social sharing capabilities

## 📄 License

Private project - All rights reserved.

---

*Built with ❤️ for Japanese families planning their children's bright future*
