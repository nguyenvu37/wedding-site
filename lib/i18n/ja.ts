import type { Translations } from "./vi";

const ja: Translations = {
  nav: {
    home: "ホーム",
    couple: "カップル",
    loveStory: "ラブストーリー",
    album: "ウェディングアルバム",
    bridesmaids: "ブライズメイド＆グルームズマン",
    events: "ウェディングイベント",
    guestbook: "ゲストブック",
    weddingGift: "ご祝儀",
  },
  hero: {
    wereGettingMarried: "結婚します！",
    heart: "♡",
  },
  // Names
  names: {
    groom: "Anh Vu",
    bride: "Cam Ha",
    groomFull: "Anh Vu Nguyen",
    brideFull: "Hoang Cam Ha Nguyen",
    groomFather: "Van Hoa Nguyen",
    groomMother: "Bich Lien Nguyen",
    brideFather: "Van Ngot Nguyen",
    brideMother: "Thi Cam Nguyen",
    groomBank: "Techcombank",
    brideBank: "Techcombank",
    groomAccountNumber: "1903 9186 7190 12",
    brideAccountNumber: "1903 5824 1930 11",
  },
  countdown: {
    days: "日",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
  },
  couple: {
    groom: "新郎",
    bride: "新婦",
    fatherOf: "父：",
    uncleOf: "伯父：",
    motherOf: "母：",
    groomBio:
      "ホーチミン市１区の歯科クリニックで勤務する歯科医師。穏やかで口数の少ない性格。常に愛情と家族を大切にしています。",
    brideBio:
      "夢のようなフエの街から来た女の子。現在サイゴンで生活し、働いています。笑顔が素敵で内面が豊か、読書、植物、自然を愛しています。",
  },
  actions: {
    sendWish: "お祝いメッセージ",
    confirmAttendance: "出欠確認",
    weddingGift: "ご祝儀",
  },
  guestbook: {
    title: "ゲストブック",
    namePlaceholder: "お名前*",
    emailPlaceholder: "メールアドレス",
    wishPlaceholder: "お祝いのメッセージ*",
    submitButton: "メッセージを送る",
    successMessage: "メッセージありがとうございます！💕",
    errorMessage: "エラーが発生しました。もう一度お試しください。",
    emptyState: "最初のメッセージを送りましょう！💌",
  },
  rsvp: {
    title: "出欠確認",
    namePlaceholder: "お名前*",
    phonePlaceholder: "電話番号",
    attending: "出席します",
    notAttending: "残念ながら欠席します",
    guestsCount: "同伴者の人数",
    notePlaceholder: "備考（任意）",
    submitButton: "確認する",
    successMessage: "ご確認ありがとうございます！🎉",
    errorMessage: "エラーが発生しました。もう一度お試しください。",
    close: "閉じる",
  },
  loveStory: {
    title: "ラブストーリー",
    items: [
      {
        title: "初めての出会い",
        description:
          "１区の小さなカフェで初めて出会いました。偶然の出会いが二人の人生を変えました。",
      },
      {
        title: "交際",
        description:
          "何度も話し合った後、正式に交際を始めました。サイゴン川沿いの散歩、ロマンティックなディナー。",
      },
      {
        title: "プロポーズ",
        description:
          "ダラットへの旅行中、松林の下でひざまずいてプロポーズし、彼女は『はい』と答えました！",
      },
      {
        title: "結婚式",
        description:
          "そして今、私たちは正式に夫婦になります。この特別な日を一緒にお祝いしましょう！",
      },
    ],
  },
  album: {
    title: "ウェディングアルバム",
  },
  weddingGift: {
    title: "ご祝儀",
    description: "ご出席いただけることが最高の贈り物です。",
    bankTransfer: "銀行振込",
    qrScan: "QRコードスキャン",
    close: "閉じる",
  },
  footer: {
    coupleNames: "Anh Vũ & Cẩm Hà",
    madeWith: "作成",
    forOurWedding: "特別な日のために",
    copyright: "© 2026 Wedding Website",
  },
  language: {
    vi: "Tiếng Việt",
    en: "English",
    ja: "日本語",
  },
  validation: {
    nameRequired: "お名前を入力してください",
    nameTooLong: "名前は100文字以内にしてください",
    wishRequired: "メッセージを入力してください",
    wishTooLong: "メッセージは1000文字以内にしてください",
    phoneInvalid: "電話番号が無効です",
    attendanceRequired: "出欠を選択してください",
    noteTooLong: "備考は500文字以内で入力してください",
  },
  // messages
  messages: {
    loadingWishes: "メッセージを読み込んでいます...",
  },
  // API Errors
  api: {
    invalidData: "無効なデータ",
    cannotLoadWishes: "メッセージの読み込みに失敗しました",
    cannotCreateWish: "メッセージの作成に失敗しました",
    cannotCreateRSVP: "出欠確認の送信に失敗しました",
    notFound: "見つかりません",
    serverError: "エラーが発生しました。もう一度お試しください",
  },
};

export default ja;
