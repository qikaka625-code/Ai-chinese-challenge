
import { GoogleGenAI, Type, Modality, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { GeminiLessonResponse } from "../types";
import { audioCache } from "../utils/audioUtils";
import { STATIC_LESSONS } from "../data/staticLessons";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const CURRICULUM_TOPICS: Record<number, string> = {
  1: "Greetings & Self Introduction (Xin chào & Giới thiệu)",
  2: "Numbers 0-20 & Counting (Số đếm cơ bản)",
  3: "Family Members (Thành viên gia đình)",
  4: "Colors & Shapes (Màu sắc & Hình khối)",
  5: "Common Daily Objects (Đồ vật hàng ngày)",
  6: "Days of the Week & Time (Thứ ngày & Thời gian)",
  7: "Basic Verbs: Eat, Drink, Sleep (Động từ cơ bản)",
  8: "Basic Verbs: Go, Come, Buy (Đi lại & Mua sắm)",
  9: "Adjectives: Big, Small, Good, Bad (Tính từ cơ bản)",
  10: "Review: Forming Simple Sentences (Ôn tập & Câu đơn)",
  11: "Morning Routine (Thói quen buổi sáng)",
  12: "Meals & Food (Bữa ăn & Đồ ăn)",
  13: "Drinks & Ordering (Đồ uống & Gọi món)",
  14: "Fruits & Vegetables (Hoa quả & Rau củ)",
  15: "At the Supermarket (Tại siêu thị)",
  16: "Money & Prices (Tiền tệ & Giá cả)",
  17: "Asking Directions (Hỏi đường)",
  18: "Transportation: Bus, Taxi (Giao thông)",
  19: "House & Furniture (Nhà cửa & Nội thất)",
  20: "Kitchen & Cooking (Nhà bếp & Nấu ăn)",
  // ... Truncated for brevity, but logic assumes up to 100
  100: "Graduation & Celebration (Tốt nghiệp & Ăn mừng)"
};

async function callGeminiWithRetry<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  operationName: string = "API Call",
  initialRetries: number = retries
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    let isRetryable = false;
    const status = error.status || error.code;
    if ([429, 500, 502, 503, 504].includes(status)) isRetryable = true;
    if (error.error) {
      const nestedCode = error.error.code || error.error.status;
      if ([429, 500, 502, 503, 504, 'INTERNAL', 'UNAVAILABLE', 'RESOURCE_EXHAUSTED'].includes(nestedCode)) isRetryable = true;
    }
    if (error.message && typeof error.message === 'string') {
      const msg = error.message.toLowerCase();
      if (msg.includes('internal error') || msg.includes('500') || msg.includes('503') || msg.includes('overloaded') || msg.includes('capacity') || msg.includes('unavailable') || msg.includes('fetch failed') || msg.includes('quota') || msg.includes('429')) {
        isRetryable = true;
      }
    }

    if (retries > 0 && isRetryable) {
      const attempt = initialRetries - retries + 1;
      const baseDelay = 300 * Math.pow(2, attempt - 1);
      const jitter = Math.random() * 200;
      const backoffTime = Math.min(baseDelay + jitter, 8000);
      console.warn(`[${operationName}] Failed (Attempt ${attempt}/${initialRetries}). Retrying in ${Math.round(backoffTime)}ms... Error: ${error.message || 'Unknown'}`);
      await delay(backoffTime);
      return callGeminiWithRetry(operation, retries - 1, operationName, initialRetries);
    }
    console.error(`[${operationName}] Fatal error after ${initialRetries} attempts:`, error);
    throw error;
  }
}

// Key for LocalStorage
const getLessonStorageKey = (day: number) => `chinese_app_lesson_v2_${day}`;

export const generateLessonForDay = async (day: number): Promise<GeminiLessonResponse> => {
  // 1. CHECK STATIC FILE (Instant, "Written Dead")
  if (STATIC_LESSONS[day]) {
    console.log(`[Lesson Day ${day}] Using STATIC content.`);
    return STATIC_LESSONS[day];
  }

  // 2. CHECK LOCAL STORAGE (Persistent User Cache)
  const storageKey = getLessonStorageKey(day);
  const cached = localStorage.getItem(storageKey);
  if (cached) {
    try {
      console.log(`[Lesson Day ${day}] Using LOCAL STORAGE cache.`);
      return JSON.parse(cached) as GeminiLessonResponse;
    } catch (e) {
      console.warn("Corrupt local storage data, regenerating...");
    }
  }

  // 3. GENERATE VIA AI (Fallback for days > 5)
  const specificTopic = CURRICULUM_TOPICS[day] || `Topic for Day ${day}`;
  console.log(`[Lesson Day ${day}] Generating new content via AI...`);

  const prompt = `
    You are an expert Chinese teacher creating a curriculum for Vietnamese students.
    Create a lesson plan for Day ${day} of a 100-day challenge.
    
    STRICT TOPIC FOR TODAY: "${specificTopic}"
    
    Total Goal: 1000 words in 100 days (10 words/day).
    
    Requirements:
    1. Select exactly 10 DISTINCT vocabulary words strictly related to the topic: "${specificTopic}".
    2. IMPORTANT: Do NOT repeat words from previous days (Numbers, Family, Colors).
    3. Provide Pinyin and Vietnamese meaning.
    4. Provide ONE simple example sentence in Chinese (Hanzi), with Pinyin and Vietnamese translation.
    5. Ensure 'hanzi' and 'example_sentence' contain ONLY Chinese characters (no Pinyin or Vietnamese).
    
    Output strictly in JSON.
  `;

  const data = await callGeminiWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic_vietnamese: { type: Type.STRING, description: "Theme of the day in Vietnamese" },
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hanzi: { type: Type.STRING },
                  pinyin: { type: Type.STRING },
                  meaning_vietnamese: { type: Type.STRING },
                  example_sentence: { type: Type.STRING },
                  sentence_pinyin: { type: Type.STRING },
                  sentence_meaning_vietnamese: { type: Type.STRING },
                },
                required: ["hanzi", "pinyin", "meaning_vietnamese", "example_sentence", "sentence_pinyin", "sentence_meaning_vietnamese"]
              }
            }
          },
          required: ["topic_vietnamese", "words"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeminiLessonResponse;
  }, 3, `Lesson Gen (Day ${day})`);

  // 4. SAVE TO LOCAL STORAGE (Write dead for future)
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage (quota exceeded?)", e);
  }

  return data;
};

// Switch default voice to Kore (often more robust for short words)
const TTS_VOICES = ['Kore', 'Aoede', 'Puck', 'Charon', 'Fenrir'];
const inFlightRequests = new Map<string, Promise<string | undefined>>();

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  let cleanText = text.trim();
  if (!cleanText) return undefined;

  // Check cache first (original key)
  if (audioCache.has(cleanText)) return audioCache.get(cleanText);

  // === REPETITION TRICK FOR SHORT WORDS ===
  // If text is short (<= 4 chars) and no spaces (likely single word), 
  // repeat it: "Word. Word." 
  // This forces the model to generate audio instead of returning silence.
  let promptText = cleanText;
  if (cleanText.length <= 4 && !cleanText.includes(' ') && !cleanText.includes('。')) {
      promptText = `${cleanText}。 ${cleanText}`;
  } else {
      // Ensure sentences end with a period
      if (!/[.!?。！？]$/.test(promptText)) promptText += "。";
  }

  // Deduplicate in-flight requests
  if (inFlightRequests.has(cleanText)) return inFlightRequests.get(cleanText);

  const requestPromise = (async () => {
    let lastError: any;

    for (const voiceName of TTS_VOICES) {
      try {
        const resultBase64 = await callGeminiWithRetry(async () => {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: promptText }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName } },
              },
              safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
              ],
            },
          });

          if (response.candidates?.[0]?.finishReason === 'SAFETY') {
              throw new Error(`TTS Blocked by Safety Filters (Voice: ${voiceName})`);
          }

          const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (!base64Audio) throw new Error(`No audio data in response (Voice: ${voiceName})`);
          
          return base64Audio;
        }, 1, `TTS (${voiceName})`); 

        // Cache using the ORIGINAL text key, not the prompted (doubled) text
        audioCache.set(cleanText, resultBase64);
        return resultBase64;

      } catch (err: any) {
        lastError = err;
        const status = err.status || err.code || (err.error ? err.error.code : 0);
        // If Rate Limit, abort rotation immediately to save quota
        if (status === 429 || status === 'RESOURCE_EXHAUSTED' || (err.message && err.message.includes('429'))) {
          console.warn(`Hit Rate Limit (429). Aborting voice rotation.`);
          throw err; 
        }
        // For other errors (500, Safety), try next voice
        console.warn(`TTS Voice '${voiceName}' failed. Switching...`);
        await delay(300); // Small delay before switching voice
      }
    }
    throw lastError;
  })();

  inFlightRequests.set(cleanText, requestPromise);
  try {
    return await requestPromise;
  } finally {
    inFlightRequests.delete(cleanText);
  }
};
