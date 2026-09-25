export type Step =
  | 'intro'
  | 'attract'
  | 'tension'
  | 'choice'
  | 'confirm'
  | 'verify'
  | 'pass'
  | 'final'

export interface QuestState {
  step: Step
  answers?: Record<string, any>
}
