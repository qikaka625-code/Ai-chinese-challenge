
import React, { useState } from 'react';
import { WordItem } from '../types';
import { generateSpeech } from '../services/geminiService';
import { decodeBase64, decodeAudioData, getAudioContext } from '../utils/audioUtils';

interface WordCardProps {
  word: WordItem;
  index: number;
}

const WordCard: React.FC<WordCardProps> = ({ word, index }) => {
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState<'word' | 'sentence' | null>(null);
  const [audioError, setAudioError] = useState<'word' | 'sentence' | null>(null);

  const playAudio = async (text: string, type: 'word' | 'sentence') => {
    const setPlaying = type === 'word' ? setIsPlayingWord : setIsPlayingSentence;
    
    if (isPlayingWord || isPlayingSentence || loadingAudio) return; // Prevent overlapping

    setAudioError(null); 
    setLoadingAudio(type);

    try {
      // Fetch from API (internally checks cache first and handles prefetching)
      const base64 = await generateSpeech(text);
      
      setLoadingAudio(null);

      if (base64) {
        // === Play Gemini Audio ===
        setPlaying(true);
        const audioCtx = getAudioContext();
        
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }

        const audioBytes = decodeBase64(base64);
        const audioBuffer = await decodeAudioData(audioBytes, audioCtx);

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        
        // Play single words slightly faster
        if (type === 'word') {
            source.playbackRate.value = 1.15;
        }

        source.onended = () => {
          setPlaying(false);
        };

        source.start();
      } else {
        throw new Error("No audio data returned");
      }

    } catch (err) {
      console.error("Audio failed", err);
      setPlaying(false);
      setLoadingAudio(null);
      setAudioError(type);
    }
  };

  const renderPlayButton = (type: 'word' | 'sentence', text: string, isPlaying: boolean) => {
    const isLoading = loadingAudio === type;
    const isError = audioError === type;

    return (
      <button
        onClick={(e) => {
            e.stopPropagation();
            playAudio(text, type);
        }}
        disabled={isPlaying || isLoading}
        className={`flex-shrink-0 transition-all flex items-center justify-center rounded-full
          ${type === 'word' ? 'p-2' : 'mt-1 p-2'}
          ${isError 
            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 ring-1 ring-red-500/50 cursor-pointer' 
            : isPlaying 
              ? 'bg-blue-500 text-white animate-pulse' 
              : isLoading
                ? 'bg-[#2d2f31] text-blue-300 cursor-wait'
                : 'bg-[#2d2f31] text-blue-300 hover:bg-[#3c4043] hover:text-white'
          }
        `}
        title={isError ? "Lỗi kết nối. Nhấn để thử lại." : "Phát âm (AI)"}
      >
        {isLoading ? (
          <div className={`${type === 'word' ? 'w-5 h-5' : 'w-4 h-4'} border-2 border-current border-t-transparent rounded-full animate-spin`}></div>
        ) : isError ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={type === 'word' ? "w-5 h-5" : "w-4 h-4"}>
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={type === 'word' ? "w-5 h-5" : "w-4 h-4"}>
            {type === 'word' ? (
              <>
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </>
            ) : (
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            )}
          </svg>
        )}
      </button>
    );
  };

  return (
    <div className="bg-[#1e1f20] border border-[#444746] rounded-xl p-6 mb-4 shadow-sm hover:border-blue-400 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Word Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-2 py-1 rounded">
              #{index + 1}
            </span>
            <h3 className="text-3xl font-chinese font-bold text-white">{word.hanzi}</h3>
            {renderPlayButton('word', word.hanzi, isPlayingWord)}
          </div>
          <div className="text-lg text-blue-200 mb-1">{word.pinyin}</div>
          <div className="text-gray-400 font-medium">{word.meaning_vietnamese}</div>
        </div>

        {/* Sentence Section */}
        <div className="flex-1 w-full md:border-l border-[#444746] md:pl-6 md:mt-0 mt-4">
          <div className="flex items-start gap-2 mb-2">
             {renderPlayButton('sentence', word.example_sentence, isPlayingSentence)}
            <div>
               <p className="text-xl font-chinese text-white leading-relaxed">{word.example_sentence}</p>
               <p className="text-sm text-gray-400 mt-1 italic">{word.sentence_pinyin}</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm ml-8">{word.sentence_meaning_vietnamese}</p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
