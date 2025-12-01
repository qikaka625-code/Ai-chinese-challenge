
import { GeminiLessonResponse } from "../types";

// This file contains hardcoded lessons to ensure 100% consistency and instant loading.
// You can expand this object to cover all 100 days.

export const STATIC_LESSONS: Record<number, GeminiLessonResponse> = {
  1: {
    topic_vietnamese: "Day 1: Chào hỏi & Giới thiệu bản thân",
    words: [
      {
        hanzi: "你好",
        pinyin: "nǐ hǎo",
        meaning_vietnamese: "Xin chào",
        example_sentence: "你好，很高兴见到你。",
        sentence_pinyin: "Nǐ hǎo, hěn gāoxìng jiàn dào nǐ.",
        sentence_meaning_vietnamese: "Xin chào, rất vui được gặp bạn."
      },
      {
        hanzi: "我",
        pinyin: "wǒ",
        meaning_vietnamese: "Tôi, tớ, mình",
        example_sentence: "我是越南人。",
        sentence_pinyin: "Wǒ shì Yuènán rén.",
        sentence_meaning_vietnamese: "Tôi là người Việt Nam."
      },
      {
        hanzi: "叫",
        pinyin: "jiào",
        meaning_vietnamese: "Tên là, gọi là",
        example_sentence: "你叫什么名字？",
        sentence_pinyin: "Nǐ jiào shénme míngzi?",
        sentence_meaning_vietnamese: "Bạn tên là gì?"
      },
      {
        hanzi: "是",
        pinyin: "shì",
        meaning_vietnamese: "Là",
        example_sentence: "他是我的老师。",
        sentence_pinyin: "Tā shì wǒ de lǎoshī.",
        sentence_meaning_vietnamese: "Ông ấy là giáo viên của tôi."
      },
      {
        hanzi: "很",
        pinyin: "hěn",
        meaning_vietnamese: "Rất",
        example_sentence: "今天天气很好。",
        sentence_pinyin: "Jīntiān tiānqì hěn hǎo.",
        sentence_meaning_vietnamese: "Hôm nay thời tiết rất tốt."
      },
      {
        hanzi: "高兴",
        pinyin: "gāoxìng",
        meaning_vietnamese: "Vui vẻ, cao hứng",
        example_sentence: "认识你很高兴。",
        sentence_pinyin: "Rènshì nǐ hěn gāoxìng.",
        sentence_meaning_vietnamese: "Rất vui được quen biết bạn."
      },
      {
        hanzi: "谢谢",
        pinyin: "xièxie",
        meaning_vietnamese: "Cảm ơn",
        example_sentence: "谢谢你的帮助。",
        sentence_pinyin: "Xièxie nǐ de bāngzhù.",
        sentence_meaning_vietnamese: "Cảm ơn sự giúp đỡ của bạn."
      },
      {
        hanzi: "不客气",
        pinyin: "bú kèqi",
        meaning_vietnamese: "Đừng khách sáo (Không có chi)",
        example_sentence: "A: 谢谢！ B: 不客气。",
        sentence_pinyin: "A: Xièxie! B: Bú kèqi.",
        sentence_meaning_vietnamese: "A: Cảm ơn! B: Không có chi."
      },
      {
        hanzi: "再见",
        pinyin: "zàijiàn",
        meaning_vietnamese: "Tạm biệt",
        example_sentence: "明天见，再见！",
        sentence_pinyin: "Míngtiān jiàn, zàijiàn!",
        sentence_meaning_vietnamese: "Ngày mai gặp, tạm biệt!"
      },
      {
        hanzi: "老师",
        pinyin: "lǎoshī",
        meaning_vietnamese: "Giáo viên, thầy/cô giáo",
        example_sentence: "王老师，你好！",
        sentence_pinyin: "Wáng lǎoshī, nǐ hǎo!",
        sentence_meaning_vietnamese: "Chào thầy Vương!"
      }
    ]
  },
  2: {
    topic_vietnamese: "Day 2: Số đếm cơ bản (0-10)",
    words: [
      {
        hanzi: "零",
        pinyin: "líng",
        meaning_vietnamese: "Số 0",
        example_sentence: "今天是零下五度。",
        sentence_pinyin: "Jīntiān shì língxià wǔ dù.",
        sentence_meaning_vietnamese: "Hôm nay là âm 5 độ."
      },
      {
        hanzi: "一",
        pinyin: "yī",
        meaning_vietnamese: "Số 1",
        example_sentence: "我有一个苹果。",
        sentence_pinyin: "Wǒ yǒu yí gè píngguǒ.",
        sentence_meaning_vietnamese: "Tôi có một quả táo."
      },
      {
        hanzi: "二",
        pinyin: "èr",
        meaning_vietnamese: "Số 2",
        example_sentence: "现在是两点。",
        sentence_pinyin: "Xiànzài shì liǎng diǎn.",
        sentence_meaning_vietnamese: "Bây giờ là 2 giờ."
      },
      {
        hanzi: "三",
        pinyin: "sān",
        meaning_vietnamese: "Số 3",
        example_sentence: "即使再试三次也不多。",
        sentence_pinyin: "Jíshǐ zài shì sān cì yě bù duō.",
        sentence_meaning_vietnamese: "Thử lại 3 lần nữa cũng không nhiều."
      },
      {
        hanzi: "四",
        pinyin: "sì",
        meaning_vietnamese: "Số 4",
        example_sentence: "这里有四个人。",
        sentence_pinyin: "Zhèlǐ yǒu sì gè rén.",
        sentence_meaning_vietnamese: "Ở đây có 4 người."
      },
      {
        hanzi: "五",
        pinyin: "wǔ",
        meaning_vietnamese: "Số 5",
        example_sentence: "我们要等五分钟。",
        sentence_pinyin: "Wǒmen yào děng wǔ fēnzhōng.",
        sentence_meaning_vietnamese: "Chúng ta cần đợi 5 phút."
      },
      {
        hanzi: "六",
        pinyin: "liù",
        meaning_vietnamese: "Số 6",
        example_sentence: "今天是六号。",
        sentence_pinyin: "Jīntiān shì liù hào.",
        sentence_meaning_vietnamese: "Hôm nay là ngày mùng 6."
      },
      {
        hanzi: "七",
        pinyin: "qī",
        meaning_vietnamese: "Số 7",
        example_sentence: "一周有七天。",
        sentence_pinyin: "Yī zhōu yǒu qī tiān.",
        sentence_meaning_vietnamese: "Một tuần có 7 ngày."
      },
      {
        hanzi: "八",
        pinyin: "bā",
        meaning_vietnamese: "Số 8",
        example_sentence: "我想买八个杯子。",
        sentence_pinyin: "Wǒ xiǎng mǎi bā gè bēizi.",
        sentence_meaning_vietnamese: "Tôi muốn mua 8 cái cốc."
      },
      {
        hanzi: "九",
        pinyin: "jiǔ",
        meaning_vietnamese: "Số 9",
        example_sentence: "这件衣服九十块。",
        sentence_pinyin: "Zhè jiàn yīfu jiǔshí kuài.",
        sentence_meaning_vietnamese: "Bộ quần áo này 90 tệ."
      }
    ]
  },
  3: {
    topic_vietnamese: "Day 3: Thành viên gia đình",
    words: [
      {
        hanzi: "家",
        pinyin: "jiā",
        meaning_vietnamese: "Nhà, gia đình",
        example_sentence: "我想回家。",
        sentence_pinyin: "Wǒ xiǎng huí jiā.",
        sentence_meaning_vietnamese: "Tôi muốn về nhà."
      },
      {
        hanzi: "爸爸",
        pinyin: "bàba",
        meaning_vietnamese: "Bố",
        example_sentence: "我爸爸是医生。",
        sentence_pinyin: "Wǒ bàba shì yīshēng.",
        sentence_meaning_vietnamese: "Bố tôi là bác sĩ."
      },
      {
        hanzi: "妈妈",
        pinyin: "māma",
        meaning_vietnamese: "Mẹ",
        example_sentence: "妈妈做的菜很好吃。",
        sentence_pinyin: "Māma zuò de cài hěn hǎochī.",
        sentence_meaning_vietnamese: "Món ăn mẹ nấu rất ngon."
      },
      {
        hanzi: "哥哥",
        pinyin: "gēge",
        meaning_vietnamese: "Anh trai",
        example_sentence: "我有一个哥哥。",
        sentence_pinyin: "Wǒ yǒu yí gè gēge.",
        sentence_meaning_vietnamese: "Tôi có một anh trai."
      },
      {
        hanzi: "姐姐",
        pinyin: "jiějie",
        meaning_vietnamese: "Chị gái",
        example_sentence: "姐姐比我大两岁。",
        sentence_pinyin: "Jiějie bǐ wǒ dà liǎng suì.",
        sentence_meaning_vietnamese: "Chị gái lớn hơn tôi 2 tuổi."
      },
      {
        hanzi: "弟弟",
        pinyin: "dìdi",
        meaning_vietnamese: "Em trai",
        example_sentence: "弟弟在学校。",
        sentence_pinyin: "Dìdi zài xuéxiào.",
        sentence_meaning_vietnamese: "Em trai đang ở trường."
      },
      {
        hanzi: "妹妹",
        pinyin: "mèimei",
        meaning_vietnamese: "Em gái",
        example_sentence: "妹妹喜欢唱歌。",
        sentence_pinyin: "Mèimei xǐhuan chànggē.",
        sentence_meaning_vietnamese: "Em gái thích hát."
      },
      {
        hanzi: "爱",
        pinyin: "ài",
        meaning_vietnamese: "Yêu",
        example_sentence: "我爱我的家。",
        sentence_pinyin: "Wǒ ài wǒ de jiā.",
        sentence_meaning_vietnamese: "Tôi yêu gia đình tôi."
      },
      {
        hanzi: "谁",
        pinyin: "shéi",
        meaning_vietnamese: "Ai",
        example_sentence: "他是谁？",
        sentence_pinyin: "Tā shì shéi?",
        sentence_meaning_vietnamese: "Anh ấy là ai?"
      },
      {
        hanzi: "这",
        pinyin: "zhè",
        meaning_vietnamese: "Đây, cái này",
        example_sentence: "这是我的一家人。",
        sentence_pinyin: "Zhè shì wǒ de yì jiā rén.",
        sentence_meaning_vietnamese: "Đây là cả gia đình tôi."
      }
    ]
  },
  4: {
    topic_vietnamese: "Day 4: Màu sắc & Hình khối",
    words: [
      {
        hanzi: "颜色",
        pinyin: "yánsè",
        meaning_vietnamese: "Màu sắc",
        example_sentence: "你喜欢什么颜色？",
        sentence_pinyin: "Nǐ xǐhuan shénme yánsè?",
        sentence_meaning_vietnamese: "Bạn thích màu gì?"
      },
      {
        hanzi: "红",
        pinyin: "hóng",
        meaning_vietnamese: "Đỏ",
        example_sentence: "红色的苹果很甜。",
        sentence_pinyin: "Hóngsè de píngguǒ hěn tián.",
        sentence_meaning_vietnamese: "Táo đỏ rất ngọt."
      },
      {
        hanzi: "白",
        pinyin: "bái",
        meaning_vietnamese: "Trắng",
        example_sentence: "天上有白云。",
        sentence_pinyin: "Tiān shàng yǒu bái yún.",
        sentence_meaning_vietnamese: "Trên trời có mây trắng."
      },
      {
        hanzi: "黑",
        pinyin: "hēi",
        meaning_vietnamese: "Đen",
        example_sentence: "这只猫是黑色的。",
        sentence_pinyin: "Zhè zhī māo shì hēisè de.",
        sentence_meaning_vietnamese: "Con mèo này màu đen."
      },
      {
        hanzi: "蓝",
        pinyin: "lán",
        meaning_vietnamese: "Xanh lam (Blue)",
        example_sentence: "大海是蓝色的。",
        sentence_pinyin: "Dàhǎi shì lánsè de.",
        sentence_meaning_vietnamese: "Biển cả màu xanh lam."
      },
      {
        hanzi: "绿",
        pinyin: "lǜ",
        meaning_vietnamese: "Xanh lá (Green)",
        example_sentence: "草是绿色的。",
        sentence_pinyin: "Cǎo shì lǜsè de.",
        sentence_meaning_vietnamese: "Cỏ màu xanh lá."
      },
      {
        hanzi: "圆",
        pinyin: "yuán",
        meaning_vietnamese: "Tròn",
        example_sentence: "月亮是圆的。",
        sentence_pinyin: "Yuèliang shì yuán de.",
        sentence_meaning_vietnamese: "Mặt trăng hình tròn."
      },
      {
        hanzi: "方",
        pinyin: "fāng",
        meaning_vietnamese: "Vuông",
        example_sentence: "这张桌子是方形的。",
        sentence_pinyin: "Zhè zhāng zhuōzi shì fāngxíng de.",
        sentence_meaning_vietnamese: "Cái bàn này hình vuông."
      },
      {
        hanzi: "长",
        pinyin: "cháng",
        meaning_vietnamese: "Dài",
        example_sentence: "这条路很长。",
        sentence_pinyin: "Zhè tiáo lù hěn cháng.",
        sentence_meaning_vietnamese: "Con đường này rất dài."
      },
      {
        hanzi: "看",
        pinyin: "kàn",
        meaning_vietnamese: "Nhìn, xem",
        example_sentence: "你看那个红色的花。",
        sentence_pinyin: "Nǐ kàn nàge hóngsè de huā.",
        sentence_meaning_vietnamese: "Bạn nhìn bông hoa màu đỏ kia kìa."
      }
    ]
  },
  5: {
    topic_vietnamese: "Day 5: Đồ vật hàng ngày",
    words: [
      {
        hanzi: "书",
        pinyin: "shū",
        meaning_vietnamese: "Sách",
        example_sentence: "我喜欢看书。",
        sentence_pinyin: "Wǒ xǐhuan kàn shū.",
        sentence_meaning_vietnamese: "Tôi thích đọc sách."
      },
      {
        hanzi: "水",
        pinyin: "shuǐ",
        meaning_vietnamese: "Nước",
        example_sentence: "请给我一杯水。",
        sentence_pinyin: "Qǐng gěi wǒ yì bēi shuǐ.",
        sentence_meaning_vietnamese: "Làm ơn cho tôi một cốc nước."
      },
      {
        hanzi: "杯子",
        pinyin: "bēizi",
        meaning_vietnamese: "Cái cốc, ly",
        example_sentence: "这个杯子很漂亮。",
        sentence_pinyin: "Zhège bēizi hěn piàoliang.",
        sentence_meaning_vietnamese: "Cái cốc này rất đẹp."
      },
      {
        hanzi: "手机",
        pinyin: "shǒujī",
        meaning_vietnamese: "Điện thoại di động",
        example_sentence: "你的手机在哪里？",
        sentence_pinyin: "Nǐ de shǒujī zài nǎlǐ?",
        sentence_meaning_vietnamese: "Điện thoại của bạn ở đâu?"
      },
      {
        hanzi: "电脑",
        pinyin: "diànnǎo",
        meaning_vietnamese: "Máy tính",
        example_sentence: "我用电脑工作。",
        sentence_pinyin: "Wǒ yòng diànnǎo gōngzuò.",
        sentence_meaning_vietnamese: "Tôi dùng máy tính để làm việc."
      },
      {
        hanzi: "桌子",
        pinyin: "zhuōzi",
        meaning_vietnamese: "Cái bàn",
        example_sentence: "书在桌子上。",
        sentence_pinyin: "Shū zài zhuōzi shàng.",
        sentence_meaning_vietnamese: "Sách ở trên bàn."
      },
      {
        hanzi: "椅子",
        pinyin: "yǐzi",
        meaning_vietnamese: "Cái ghế",
        example_sentence: "这里有一把椅子。",
        sentence_pinyin: "Zhèlǐ yǒu yì bǎ yǐzi.",
        sentence_meaning_vietnamese: "Ở đây có một cái ghế."
      },
      {
        hanzi: "笔",
        pinyin: "bǐ",
        meaning_vietnamese: "Cái bút",
        example_sentence: "你有笔吗？",
        sentence_pinyin: "Nǐ yǒu bǐ ma?",
        sentence_meaning_vietnamese: "Bạn có bút không?"
      },
      {
        hanzi: "电视",
        pinyin: "diànshì",
        meaning_vietnamese: "Ti vi",
        example_sentence: "我们在看电视。",
        sentence_pinyin: "Wǒmen zài kàn diànshì.",
        sentence_meaning_vietnamese: "Chúng tôi đang xem ti vi."
      },
      {
        hanzi: "门",
        pinyin: "mén",
        meaning_vietnamese: "Cửa",
        example_sentence: "请关门。",
        sentence_pinyin: "Qǐng guān mén.",
        sentence_meaning_vietnamese: "Làm ơn đóng cửa lại."
      }
    ]
  }
};
