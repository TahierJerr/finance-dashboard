import { describe, it, expect } from 'vitest'
import { formatDateToDDMMYYYY, parseDateFromDDMMYYYY } from '../lib/date-utils'

describe('formatDateToDDMMYYYY', () => {
  it('formats a valid date', () => {
    const date = new Date(2023, 11, 25)
    expect(formatDateToDDMMYYYY(date)).toBe('25-12-2023')
  })
})

describe('parseDateFromDDMMYYYY', () => {
  it('parses valid hyphenated date', () => {
    const result = parseDateFromDDMMYYYY('25-12-2023')
    expect(result).toEqual(new Date(2023, 11, 25))
  })

  it('parses valid slash date', () => {
    const result = parseDateFromDDMMYYYY('01/01/2023')
    expect(result).toEqual(new Date(2023, 0, 1))
  })

  it('returns undefined for invalid date', () => {
    expect(parseDateFromDDMMYYYY('32-01-2023')).toBeUndefined()
  })

  it('returns undefined for malformed input', () => {
    expect(parseDateFromDDMMYYYY('invalid')).toBeUndefined()
    expect(parseDateFromDDMMYYYY('12-2023')).toBeUndefined()
    expect(parseDateFromDDMMYYYY('')).toBeUndefined()
  })
})
