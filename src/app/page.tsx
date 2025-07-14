export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                FamilyFuture Planner
              </h1>
            </div>
            <nav className="flex space-x-4">
              <a href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                ログイン
              </a>
              <a href="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                新規登録
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            家族の未来を一緒に計画しよう
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            子育てにかかる費用を可視化し、学校選びから投資プランまで、家族みんなで協力して未来を築いていきましょう。
          </p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 投資プランニング */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-600 flex items-center mb-4">
                <span className="text-2xl mr-2">💰</span>
                投資プランニング
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">目標金額</span>
                  <span className="text-lg font-semibold text-gray-900">2,500万円</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">現在の進捗</span>
                  <span className="text-lg font-semibold text-green-600">12.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: '12.5%' }}></div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  プランを見る
                </button>
              </div>
            </div>
          </div>

          {/* スクールコスト */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-600 flex items-center mb-4">
                <span className="text-2xl mr-2">🏫</span>
                スクールコスト
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">登録校数</span>
                  <span className="text-lg font-semibold text-gray-900">1,234校</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">比較可能</span>
                  <span className="text-lg font-semibold text-blue-600">利用可能</span>
                </div>
                <div className="text-xs text-gray-500">
                  東京23区の幼稚園〜大学の学費データを網羅
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200">
                  学校を探す
                </button>
              </div>
            </div>
          </div>

          {/* ファミリーコネクション */}
          <a href="/family-connection" className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow cursor-pointer block">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center mb-4">
                <span className="text-2xl mr-2">👨‍👩‍👧‍👦</span>
                ファミリーコネクション
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">進行中プロジェクト</span>
                  <span className="text-lg font-semibold text-gray-900">3件</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">家族メンバー</span>
                  <span className="text-lg font-semibold text-purple-600">8人</span>
                </div>
                <div className="text-xs text-gray-500">
                  小学校入学資金、塾費用、制服代など
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50">
                  プロジェクト管理
                </button>
              </div>
            </div>
          </a>
        </div>

        {/* 最近の活動 */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">最近の活動</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">💰</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">投資プランが更新されました</p>
                  <p className="text-xs text-gray-500">月額積立額を15万円に調整</p>
                </div>
                <span className="text-xs text-gray-400">2分前</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🏫</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">新しい学校が追加されました</p>
                  <p className="text-xs text-gray-500">〇〇小学校の学費データを更新</p>
                </div>
                <span className="text-xs text-gray-400">1時間前</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">👨‍👩‍👧‍👦</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">おじいちゃんから送金がありました</p>
                  <p className="text-xs text-gray-500">小学校入学資金プロジェクト +50,000円</p>
                </div>
                <span className="text-xs text-gray-400">3時間前</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 