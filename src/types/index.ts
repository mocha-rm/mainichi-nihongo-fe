export interface JapaneseWord {
  japanese: string
  pronunciation: string
  meaning: string
  example?: string
}

export interface ConversationItem {
  situation: string
  japanese: string
  pronunciation: string
  korean: string
}

export interface CultureContent {
  title: string
  content: string
}

export interface DialectItem {
  region: string
  dialect: string
  standard: string
  meaning: string
}

export interface LearningContent {
  date: string
  level: string
  topic: string
  words: JapaneseWord[]
  conversations: ConversationItem[]
  culture: CultureContent
  dialects: DialectItem[]
}

export interface SubscriptionFormData {
  email: string
}

export interface AlertMessage {
  type: 'success' | 'error'
  message: string
}
