// src/lib/calculations/index.ts — barrel export
export { calcAge, calcGeneration, InvalidDateError } from './calcAge'
export { calcYearOfService, InvalidEventError } from './calcYearOfService'
export { calcYearsInJob, calcYearsInCorpTitle, calcYearsInPosition, calcYearsInBU, calcYearsInJobGrade } from './calcYearsInX'
export type { YearMonth, LifecycleEvent, LifecycleEventType, GenerationCode } from './types'
