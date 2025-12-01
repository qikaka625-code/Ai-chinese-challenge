
import React, { useState } from 'react';

interface PinyinItem {
  display: string;
  hanzi: string;     // The homophone character displayed to user
  description: string;
}

const INITIALS: PinyinItem[] = [
  { display: 'b', hanzi: '波', description: 'Giống "b" trong "bò" (bō)' },
  { display: 'p', hanzi: '坡', description: 'Giống "p" bật hơi (pō)' },
  { display: 'm', hanzi: '摸', description: 'Giống "m" trong "mẹ" (mō)' },
  { display: 'f', hanzi: '佛', description: 'Giống "ph" trong "phở" (fó)' },
  { display: 'd', hanzi: '得', description: 'Giống "t" trong "tôi" (dé)' },
  { display: 't', hanzi: '特', description: 'Giống "th" trong "thỏ" (tè)' },
  { display: 'n', hanzi: '讷', description: 'Giống "n" trong "nơ" (nè)' },
  { display: 'l', hanzi: '勒', description: 'Giống "l" trong "lo" (lè)' },
  { display: 'g', hanzi: '哥', description: 'Giống "c" trong "ca" (gē)' },
  { display: 'k', hanzi: '科', description: 'Giống "kh" nhẹ (kē)' },
  { display: 'h', hanzi: '喝', description: 'Giống "h" trong "hà" (hē)' },
  { display: 'j', hanzi: '机', description: 'Giống "chi" lưỡi thẳng (jī)' },
  { display: 'q', hanzi: '期', description: 'Giống "chi" bật hơi (qī)' },
  { display: 'x', hanzi: '希', description: 'Giống "xi" nhẹ (xī)' },
  { display: 'zh', hanzi: '知', description: 'Giống "tr" uốn lưỡi (zhī)' },
  { display: 'ch', hanzi: '吃', description: 'Giống "tr" bật hơi (chī)' },
  { display: 'sh', hanzi: '诗', description: 'Giống "s" uốn lưỡi (shī)' },
  { display: 'r', hanzi: '日', description: 'Giống "r" uốn lưỡi (rì)' },
  { display: 'z', hanzi: '资', description: 'Giống "ch" lưỡi thẳng (zī)' },
  { display: 'c', hanzi: '雌', description: 'Giống "ch" bật hơi (cí)' },
  { display: 's', hanzi: '思', description: 'Giống "x" nhẹ (sī)' },
  { display: 'y', hanzi: '衣', description: 'Đọc là "i" (yī)' },
  { display: 'w', hanzi: '屋', description: 'Đọc là "u" (wū)' },
];

const FINALS: PinyinItem[] = [
  { display: 'a', hanzi: '啊', description: 'A (ā)' },
  { display: 'o', hanzi: '喔', description: 'Ô (ō)' },
  { display: 'e', hanzi: '鹅', description: 'Ơ (é)' },
  { display: 'i', hanzi: '衣', description: 'I (yī)' },
  { display: 'u', hanzi: '乌', description: 'U (wū)' },
  { display: 'ü', hanzi: '迂', description: 'Uy (yū)' },
  { display: 'ai', hanzi: '爱', description: 'Ai (ài)' },
  { display: 'ei', hanzi: '诶', description: 'Ây (ēi)' },
  { display: 'ui', hanzi: '威', description: 'Uây (wēi)' },
  { display: 'ao', hanzi: '熬', description: 'Ao (áo)' },
  { display: 'ou', hanzi: '欧', description: 'Âu (ōu)' },
  { display: 'iu', hanzi: '优', description: 'Yêu (yōu)' },
  { display: 'ie', hanzi: '耶', description: 'Iê (yē)' },
  { display: 'üe', hanzi: '约', description: 'Uê (yuē)' },
  { display: 'er', hanzi: '耳', description: 'Ơ uốn lưỡi (ěr)' },
  { display: 'an', hanzi: '安', description: 'An (ān)' },
  { display: 'en', hanzi: '恩', description: 'Ân (ēn)' },
  { display: 'in', hanzi: '音', description: 'In (yīn)' },
  { display: 'un', hanzi: '温', description: 'Uân (wēn)' },
  { display: 'ün', hanzi: '晕', description: 'Uyn (yūn)' },
  { display: 'ang', hanzi: '昂', description: 'Ang (áng)' },
  { display: 'eng', hanzi: '鞥', description: 'Âng (ēng)' },
  { display: 'ing', hanzi: '英', description: 'Ing (yīng)' },
  { display: 'ong', hanzi: '嗡', description: 'Ung (wēng)' },
];

const TONES: PinyinItem[] = [
  { display: 'mā', hanzi: '妈', description: 'Thanh 1: Cao, bằng' },
  { display: 'má', hanzi: '麻', description: 'Thanh 2: Lên giọng' },
  { display: 'mǎ', hanzi: '马', description: 'Thanh 3: Xuống rồi lên' },
  { display: 'mà', hanzi: '骂', description: 'Thanh 4: Xuống mạnh' },
];

interface PinyinGuideProps {
  onBack: () => void;
}

const PinyinGuide: React.FC<PinyinGuideProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'initials' | 'finals' | 'tones'>('initials');

  const renderGrid = (items: PinyinItem[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => {
        return (
          <div
            key={item.display}
            className="relative p-4 rounded-xl border flex flex-col items-center justify-center h-32 bg-[#1e1f20] border-[#444746] hover:bg-[#2d2f31] transition-colors"
          >
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">
                    {item.display}
                </span>
                <span className="text-xl text-blue-300 font-chinese font-medium">
                    ({item.hanzi})
                </span>
            </div>
            
            <span className="text-xs text-gray-400 text-center px-1">
                {item.description}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 bg-[#1e1f20] p-4 rounded-xl border border-[#444746]">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-[#3c4043] rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-gray-300">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Bảng Chữ Cái Pinyin (Bính Âm)</h2>
          <p className="text-gray-400 text-sm">Bảng tra cứu tham khảo Thanh Mẫu, Vận Mẫu và Thanh Điệu</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {[
            { id: 'initials', label: 'Thanh Mẫu (Initials)' },
            { id: 'finals', label: 'Vận Mẫu (Finals)' },
            { id: 'tones', label: 'Thanh Điệu (Tones)' }
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                    px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all
                    ${activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                        : 'bg-[#2d2f31] text-gray-400 hover:text-white hover:bg-[#3c4043]'
                    }
                `}
            >
                {tab.label}
            </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'initials' && renderGrid(INITIALS)}
        {activeTab === 'finals' && renderGrid(FINALS)}
        {activeTab === 'tones' && (
            <div>
                <p className="mb-4 text-gray-400 text-sm italic border-l-4 border-blue-500 pl-3">
                    Tiếng Trung có 4 thanh điệu chính. Thanh điệu thay đổi ý nghĩa của từ.
                </p>
                {renderGrid(TONES)}
            </div>
        )}
      </div>
    </div>
  );
};

export default PinyinGuide;
