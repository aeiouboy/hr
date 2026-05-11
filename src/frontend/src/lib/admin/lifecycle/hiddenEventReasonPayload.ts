import type { EmployeeActionKey } from './actionRequirements'
import { ACTION_FIELD_CONTRACTS, getLifecycleActionField } from './actionFieldContracts'
import { classifyRehireReason } from '@/lib/admin/utils/classifyRehireReason'

type HiddenEventReasonActionKey = Extract<EmployeeActionKey, 'acting' | 'change_type' | 'probation' | 'rehire'>
type ProbationOutcome = 'pass' | 'extend' | 'no_pass' | null | undefined

interface HiddenEventReasonContext {
  outcome?: ProbationOutcome
  newHireDate?: string | null
  lastTerminationDate?: string | null
  preservedEventReason?: string | null
}

const SYSTEM_EVENT_REASON_NOTE = /^\[sfEventReason:[A-Z0-9_]+\]$/m

function eventReasonCodesFor(actionKey: HiddenEventReasonActionKey): readonly string[] {
  return ACTION_FIELD_CONTRACTS[actionKey].fields.eventReason.sfMapping?.eventReasons ?? []
}

function defaultEventReasonFor(actionKey: HiddenEventReasonActionKey): string {
  const field = getLifecycleActionField(actionKey, 'eventReason')
  return String(field.defaultValue ?? field.sfMapping?.eventReasons?.[0] ?? '')
}

function isContractEventReason(actionKey: HiddenEventReasonActionKey, value: string): boolean {
  return eventReasonCodesFor(actionKey).includes(value)
}

export function deriveHiddenLifecycleEventReason(
  actionKey: HiddenEventReasonActionKey,
  context: HiddenEventReasonContext = {},
): string {
  if (context.preservedEventReason && isContractEventReason(actionKey, context.preservedEventReason)) {
    return context.preservedEventReason
  }

  if (actionKey === 'probation') {
    const [passReason = '', extendReason = '', noPassReason = ''] = eventReasonCodesFor('probation')
    if (context.outcome === 'pass') return passReason
    if (context.outcome === 'extend') return extendReason
    if (context.outcome === 'no_pass') return noPassReason
    return ''
  }

  if (actionKey === 'rehire') {
    if (context.lastTerminationDate && context.newHireDate) {
      return classifyRehireReason(context.lastTerminationDate, context.newHireDate)
    }
    return defaultEventReasonFor('rehire')
  }

  return defaultEventReasonFor(actionKey)
}

export function withSystemEventReasonNote(notes: string | undefined, eventReason: string): string | undefined {
  const trimmedNotes = notes?.trim() ?? ''
  if (!eventReason) return trimmedNotes || undefined

  const userNotes = trimmedNotes.replace(SYSTEM_EVENT_REASON_NOTE, '').trim()
  const systemNote = `[sfEventReason:${eventReason}]`

  return userNotes ? `${systemNote}\n${userNotes}` : systemNote
}
