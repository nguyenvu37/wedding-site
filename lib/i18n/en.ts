import type { Translations } from "./vi";

const en: Translations = {
  nav: {
    home: "Home",
    couple: "Couple",
    loveStory: "Love Story",
    album: "Wedding Album",
    bridesmaids: "Bridesmaids & Groomsmen",
    events: "Wedding Events",
    guestbook: "Guestbook",
    weddingGift: "Wedding Gift",
  },
  hero: {
    wereGettingMarried: "We're Getting Married!",
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
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  couple: {
    groom: "Groom",
    bride: "Bride",
    fatherOf: "Mr.",
    uncleOf: "Mr.",
    motherOf: "And Mrs.",
    groomBio:
      "A dentist currently working at a dental clinic in District 1, Ho Chi Minh City. A gentle and quiet person who always values love and family.",
    brideBio:
      "A girl from the dreamy city of Hue, now living and working in Saigon. Always smiling with a rich inner world, who loves reading, gardening, and nature.",
  },
  actions: {
    sendWish: "SEND WISHES",
    confirmAttendance: "CONFIRM ATTENDANCE",
    weddingGift: "WEDDING GIFT",
  },
  guestbook: {
    title: "Guestbook",
    namePlaceholder: "Your full name*",
    emailPlaceholder: "Your email",
    wishPlaceholder: "Write your wishes*",
    submitButton: "Send Wishes",
    successMessage: "Thank you for your wishes! 💕",
    errorMessage: "Something went wrong, please try again.",
    emptyState: "Be the first to send your wishes! 💌",
  },
  rsvp: {
    title: "RSVP",
    namePlaceholder: "Your full name*",
    phonePlaceholder: "Phone number",
    attending: "I will attend",
    notAttending: "Sorry, I can't make it",
    guestsCount: "Number of guests",
    notePlaceholder: "Notes (optional)",
    submitButton: "Confirm",
    successMessage: "Thank you for confirming! 🎉",
    errorMessage: "Something went wrong, please try again.",
    close: "Close",
  },
  loveStory: {
    title: "Our Love Story",
    items: [
      {
        title: "First Meeting",
        description:
          "We met for the first time at a small café in District 1. A chance encounter that changed both our lives.",
      },
      {
        title: "Dating",
        description:
          "After many conversations, we officially started dating. Walking along the Saigon River, romantic dinners together.",
      },
      {
        title: "Proposal",
        description:
          "During a trip to Da Lat, he knelt down and proposed under the pine forest, and she said 'Yes'!",
      },
      {
        title: "Wedding",
        description:
          "And now, we are officially becoming husband and wife. We invite you to celebrate this special day with us!",
      },
    ],
  },
  album: {
    title: "Wedding Album",
  },
  weddingGift: {
    title: "Wedding Gift",
    description: "Your presence is the greatest gift for us.",
    bankTransfer: "Bank Transfer",
    qrScan: "Scan QR Code",
    close: "Close",
  },
  footer: {
    coupleNames: "Anh Vũ & Cẩm Hà",
    madeWith: "Made with",
    forOurWedding: "for our special day",
    copyright: "© 2026 Wedding Website",
  },
  language: {
    vi: "Tiếng Việt",
    en: "English",
    ja: "日本語",
  },
  validation: {
    nameRequired: "Please enter your name",
    nameTooLong: "Name must be less than 100 characters",
    wishRequired: "Please enter your wishes",
    wishTooLong: "Wishes must be less than 1000 characters",
    phoneInvalid: "Invalid phone number",
    attendanceRequired: "Please confirm your attendance",
    noteTooLong: "Note cannot exceed 500 characters",
  },
  // messages
  messages: {
    loadingWishes: "Loading wishes...",
  },
  // API Errors
  api: {
    invalidData: "Invalid data",
    cannotLoadWishes: "Cannot load wishes list",
    cannotCreateWish: "Cannot create wish",
    cannotCreateRSVP: "Cannot send RSVP confirmation",
    notFound: "Not found",
    serverError: "Something went wrong, please try again",
  },
};

export default en;
