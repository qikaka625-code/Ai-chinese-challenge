import React, { useRef, useEffect, useState } from 'react';

interface DayNavigatorProps {
  currentDay: number;
  onSelectDay: (day: number) => void;
  onOpenPinyin: () => void;
}

const DayNavigator: React.FC<DayNavigatorProps> = ({ currentDay, onSelectDay, onOpenPinyin }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showJumpInput, setShowJumpInput] = useState(false);
  const [jumpValue, setJumpValue] = useState('');

  // Auto-center on load and when currentDay changes
  useEffect(() => {
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.children[currentDay - 1] as HTMLElement;
      if (selectedButton) {
        const container = scrollRef.current;
        // Center the button
        container.scrollTo({
          left: selectedButton.offsetLeft - container.clientWidth / 2 + selectedButton.clientWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentDay]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Scroll by 80% of the visible width (page-like scroll)
      const scrollAmount = container.clientWidth * 0.8; 
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const day = parseInt(jumpValue);
    if (day >= 1 && day <= 100) {
      onSelectDay(day);
      setShowJumpInput(false);
      setJumpValue('');
    } else {
      alert("Vui lòng nhập ngày từ 1 đến 100");
    }
  };

  return (
    <div className="w-full bg-[#131314] sticky top-0 z-50 border-b border-[#444746] py-3 shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        {/* Controls Row */}
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
                {/* NEW: Pinyin Button */}
                <button
                    onClick={onOpenPinyin}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/40 hover:text-white transition-all text-sm font-medium mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg>
                    Bảng Pinyin
                </button>

               <div className="flex items-center gap-2 border-l border-[#444746] pl-4">
                 <button 
                    onClick={() => onSelectDay(Math.max(1, currentDay - 1))}
                    disabled={currentDay === 1}
                    className="p-1 rounded hover:bg-[#2d2f31] text-gray-400 disabled:opacity-30"
                    title="Ngày trước"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                       <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                 </button>
                 <span className="text-white font-mono font-bold min-w-[3rem] text-center">{currentDay} / 100</span>
                 <button 
                    onClick={() => onSelectDay(Math.min(100, currentDay + 1))}
                    disabled={currentDay === 100}
                    className="p-1 rounded hover:bg-[#2d2f31] text-gray-400 disabled:opacity-30"
                    title="Ngày sau"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                       <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                 </button>
               </div>
            </div>

            {/* Jump To Date */}
            <div className="flex items-center">
              {showJumpInput ? (
                <form onSubmit={handleJumpSubmit} className="flex items-center gap-2 animate-fade-in">
                  <input 
                    type="number" 
                    min="1" 
                    max="100" 
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value)}
                    className="w-16 bg-[#2d2f31] border border-[#444746] rounded px-2 py-1 text-sm text-white focus:border-blue-500 outline-none"
                    placeholder="#"
                    autoFocus
                  />
                  <button type="submit" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">Đi</button>
                  <button type="button" onClick={() => setShowJumpInput(false)} className="p-1 text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setShowJumpInput(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2d2f31] hover:bg-[#3c4043] text-blue-300 text-sm transition-colors border border-[#444746]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                  <span>Đi đến ngày...</span>
                </button>
              )}
            </div>
        </div>
        
        {/* Scrollable List with Large Scroll Buttons */}
        <div className="flex items-center gap-2">
            <button 
                onClick={() => scroll('left')}
                className="flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-[#2d2f31] text-gray-400 hover:bg-[#3c4043] hover:text-white transition-all active:scale-95 border border-[#444746]"
                title="Quay lại"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
            </button>

            <div 
            ref={scrollRef}
            className="flex-1 flex overflow-x-auto space-x-2 pb-2 scrollbar-hide snap-x relative"
            >
            {Array.from({ length: 100 }, (_, i) => i + 1).map((day) => (
                <button
                key={day}
                onClick={() => onSelectDay(day)}
                className={`
                    flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all snap-center
                    ${currentDay === day 
                    ? 'bg-blue-600 text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.5)] border-2 border-transparent' 
                    : 'bg-[#2d2f31] text-gray-400 hover:bg-[#3c4043] border border-[#444746] hover:border-gray-500'}
                `}
                >
                {day}
                </button>
            ))}
            </div>

            <button 
                onClick={() => scroll('right')}
                className="flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-[#2d2f31] text-gray-400 hover:bg-[#3c4043] hover:text-white transition-all active:scale-95 border border-[#444746]"
                title="Xem thêm ngày"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DayNavigator;