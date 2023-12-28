import { expect, it } from 'vitest'

import { flatten } from './flatten'

it('primitives do not change', () => {
  expect(flatten(5)).toEqual(5)
  expect(flatten('hello')).toEqual('hello')
  expect(flatten(true)).toEqual(true)
  expect(flatten(null)).toEqual(null)
  expect(flatten(undefined)).toEqual(undefined)
})

it('empty arrays do not change', () => {
  expect(flatten([])).toEqual([])
})

it('nested empty arrays are removed', () => {
  expect(flatten([[], [[]], []])).toEqual([])
})

it('nested arrays', () => {
  expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
})

it('empty objects do not change', () => {
  expect(flatten({})).toEqual({})
})

it('nested empty objects are removed', () => {
  expect(flatten({ a: {}, b: { c: {} } })).toEqual({})
})

it('nested arrays and objects together', () => {
  expect(flatten({ a: 1, b: [2, { c: 3, d: [4, 5] }] })).toEqual({
    a: 1,
    b: [2, { c: 3, d: [4, 5] }],
  })
})

it('nested objects', () => {
  expect(
    flatten({
      a: 1,
      b: { c: 2, d: 3 },
    })
  ).toEqual({
    a: 1,
    c: 2,
    d: 3,
  })

  const flattened = flatten({
    a: 1,
    b: {
      c: 2,
      d: {
        e: null,
        f: { g: undefined, h: true },
        i: false,
      },
    },
  })

  console.log('flattened', flattened)

  expect(flattened).toEqual({
    a: 1,
    c: 2,
    e: null,
    g: undefined,
    h: true,
    i: false,
  })
})

it('nested arrays and objects together', () => {
  expect(
    flatten({
      a: 123,
      b: [1, 2, 3],
      c: {
        d: 'kldsklf',
        e: [4, 5, 6, [7, 8, 9]],
      },
    })
  ).toEqual({
    a: 123,
    b: [1, 2, 3],
    d: 'kldsklf',
    e: [4, 5, 6, 7, 8, 9],
  })
})
