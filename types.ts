export interface WordItem {
  hanzi: string;
  pinyin: string;
  meaning_vietnamese: string;
  example_sentence: string;
  sentence_pinyin: string;
  sentence_meaning_vietnamese: string;
}

export interface DailyLesson {
  day: number;
  topic_vietnamese: string;
  words: WordItem[];
}

// Helper type for the JSON response structure from Gemini
export interface GeminiLessonResponse {
  topic_vietnamese: string;
  words: WordItem[];
}
