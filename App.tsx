
import React, { useState, useEffect, useRef } from 'react';
import DayNavigator from './components/DayNavigator';
import WordCard from './components/WordCard';
import PinyinGuide from './components/PinyinGuide';
import { generateLessonForDay, generateSpeech } from './services/geminiService';
import { DailyLesson } from './types';
import { audioCache } from './utils/audioUtils';

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'daily' | 'pinyin'>('daily');
  const [lessonData, setLessonData] = useState<DailyLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Cache lessons in memory to avoid re-fetching when switching back and forth
  const [lessonCache, setLessonCache] = useState<Record<number, DailyLesson>>({});

  // Main Effect: Fetch current day
  useEffect(() => {
    if (viewMode === 'pinyin') return;

    const fetchLesson = async () => {
      // Use memory cache if available (fastest)
      if (lessonCache[currentDay]) {
        setLessonData(lessonCache[currentDay]);
        return;
      }

      setLoading(true);
      setError(null);
      setLessonData(null);

      try {
        const data = await generateLessonForDay(currentDay);
        const newLesson: DailyLesson = {
          day: currentDay,
          topic_vietnamese: data.topic_vietnamese,
          words: data.words
        };
        
        setLessonData(newLesson);
        setLessonCache(prev => ({ ...prev, [currentDay]: newLesson }));
      } catch (err: any) {
        console.error(err);
        
        let userMsg = "Không thể kết nối với AI. Vui lòng thử lại.";
        if (err.message) {
            if (err.message.includes('500') || err.message.includes('Internal')) {
                userMsg = "Hệ thống AI đang bận (Lỗi 500). Vui lòng thử lại sau giây lát.";
            } else if (err.message.includes('503')) {
                userMsg = "Dịch vụ đang quá tải. Vui lòng thử lại.";
            } else {
                userMsg = `Lỗi: ${err.message}`;
            }
        }
        
        setError(userMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [currentDay, viewMode]); 

  // Prefetch Effect: Fetch next day silently
  useEffect(() => {
    if (viewMode === 'pinyin') return;

    const nextDay = currentDay + 1;
    if (!loading && lessonData && nextDay <= 100 && !lessonCache[nextDay]) {
      const timer = setTimeout(() => {
        // This will check static/local storage first, so it's efficient
        generateLessonForDay(nextDay)
          .then((data) => {
            setLessonCache(prev => ({ 
              ...prev, 
              [nextDay]: { 
                day: nextDay, 
                topic_vietnamese: data.topic_vietnamese, 
                words: data.words 
              } 
            }));
          })
          .catch(err => console.log("Prefetch failed (silent):", err));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentDay, loading, lessonData, lessonCache, viewMode]);

  // PERSISTENT AUDIO PREFETCH LOOP (CONCURRENT)
  useEffect(() => {
    if (!lessonData) return;

    let isMounted = true;
    const CONCURRENCY = 3; // Number of simultaneous downloads

    const runPrefetchLoop = async () => {
      const words = lessonData.words.map(w => w.hanzi);
      const sentences = lessonData.words.map(w => w.example_sentence);
      // Prioritize words first, then sentences
      const queue = [...words, ...sentences];
      
      console.log(`[Audio Prefetch] Starting persistent loop for ${queue.length} items (Concurrency: ${CONCURRENCY})...`);

      const processItem = async () => {
        while (queue.length > 0 && isMounted) {
            // Pick next item safely
            const text = queue.shift(); 
            if (!text) break;

            if (audioCache.has(text)) {
                continue; // Skip if already cached
            }

            try {
                await generateSpeech(text);
                // Small delay between successful requests to respect rate limits gently
                await new Promise(r => setTimeout(r, 600)); 
            } catch (e: any) {
                if (!isMounted) break;
                // If failed, push back to end of queue to retry later
                queue.push(text);
                // Backoff significantly on error
                const backoffTime = 5000;
                await new Promise(r => setTimeout(r, backoffTime));
            }
        }
      };

      // Launch multiple workers
      const workers = [];
      for (let i = 0; i < CONCURRENCY; i++) {
          workers.push(processItem());
      }
      
      await Promise.all(workers);
    };

    const timer = setTimeout(() => {
        runPrefetchLoop();
    }, 1000);

    return () => {
        isMounted = false;
        clearTimeout(timer);
    };
  }, [lessonData]);

  const leftColumnWords = lessonData?.words.slice(0, 5) || [];
  const rightColumnWords = lessonData?.words.slice(5, 10) || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#131314] text-[#e3e3e3]">
      <header className="bg-[#1e1f20] border-b border-[#444746] py-6 sticky top-0 z-40">
         <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-blue-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>
                <div className="cursor-pointer" onClick={() => setViewMode('daily')}>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                        100 Ngày Học Tiếng Trung
                    </h1>
                    <p className="text-xs text-gray-400">Thử thách mỗi ngày cùng AI</p>
                </div>
             </div>

             {/* Debug/Reset Button */}
             <button 
                onClick={() => {
                   if(window.confirm("Bạn có chắc muốn xóa toàn bộ dữ liệu bài học đã lưu không?")) {
                       localStorage.clear();
                       window.location.reload();
                   }
                }}
                className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                title="Xóa bộ nhớ đệm"
             >
                Reset Cache
             </button>
         </div>
      </header>

      {/* Conditionally Render Navigation */}
      {viewMode === 'daily' && (
        <DayNavigator 
          currentDay={currentDay} 
          onSelectDay={setCurrentDay} 
          onOpenPinyin={() => setViewMode('pinyin')}
        />
      )}

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-8">
        
        {viewMode === 'pinyin' ? (
          <PinyinGuide onBack={() => setViewMode('daily')} />
        ) : (
          <>
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-blue-300 font-medium">Đang tải nội dung Ngày {currentDay}...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-center max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-400">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-red-300 font-bold text-lg">Lỗi Kết Nối</h3>
                </div>
                <p className="text-red-200/80 my-4 text-sm font-medium px-4">{error}</p>
                <button 
                  onClick={() => setCurrentDay(d => d)} 
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-red-900/20"
                >
                  Thử Lại Ngay
                </button>
              </div>
            )}

            {!loading && !error && lessonData && (
              <div className="animate-fade-in-up">
                <div className="mb-8 text-center bg-[#1e1f20] p-6 rounded-2xl border border-[#444746] shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium border border-blue-500/20 mb-3">
                    Ngày {currentDay} / 100
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{lessonData.topic_vietnamese}</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Hãy học thuộc 10 từ vựng bên dưới và nghe phát âm để ghi nhớ lâu hơn.
                  </p>
                </div>

                {/* Two Column Layout for Desktop */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                    {/* Left Column (Items 1-5) */}
                    <div className="space-y-4">
                        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-widest pl-2 mb-2">Phần 1</h3>
                        {leftColumnWords.map((word, idx) => (
                            <WordCard key={idx} word={word} index={idx} />
                        ))}
                    </div>

                    {/* Right Column (Items 6-10) */}
                    <div className="space-y-4">
                        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-widest pl-2 mb-2">Phần 2</h3>
                        {rightColumnWords.map((word, idx) => (
                            <WordCard key={idx + 5} word={word} index={idx + 5} />
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex justify-between items-center border-t border-[#444746] pt-8 pb-10">
                    <button
                        disabled={currentDay === 1}
                        onClick={() => setCurrentDay(d => Math.max(1, d - 1))}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#2d2f31] text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>
                        <span>Ngày trước</span>
                    </button>

                    <button
                        disabled={currentDay === 100}
                        onClick={() => setCurrentDay(d => Math.min(100, d + 1))}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 font-medium"
                    >
                        <span>Học bài ngày mai</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
