---
title: React input number done right
tags:
  - JavaScript
description: >
     Having an input number working correctly is not that easy, let me share my implementation.
---

Using `type='number'` has few issues: for example you can type the following:

* `-1-2`
* `1.2...`
* `1.2.3.4----`

You may start trying to use `parseFloat` to validate input in the `onChange` handler but then you realize soon that while user is typing we need to accept a string as input, for example the string `-` which is not a number yet but it could become a `-1`.
So we need to do some parsing in the `onChange` handler but do the final validation in the `onBlur` handler.

```javascript
import React, { useState } from 'react'

/**
 * Input with number validation.
 *
 * @typedef {number | null} MaybNumber
 *
 * @typedef {Object} InputNumberProps
 * @prop {string=} decimalSeparator
 * @prop {boolean=} disabled
 * @prop {number=} max
 * @prop {number=} min
 * @prop {string=} placeholder
 * @prop {function} setValue
 * @prop {MaybNumber} value
 *
 * @param {InputNumberProps} props
 */

function InputNumber ({
  decimalSeparator = '.',
  disabled,
  max,
  min,
  placeholder,
  setValue = null,
  value = null
}) {
  const [editing, setEditing] = useState(false)
  const [currentValue, setCurrentValue] = useState(typeof value === 'number' ? String(value) : '')

  return (
    <input
      disabled={disabled}
      onBlur={() => {
        setEditing(false)

        let maybeNumber = parseFloat(currentValue)

        // Do nothing if value is not a number.
        if (isNaN(maybeNumber)) {
          return
        }

        // Apply lower threeshold if min is defined.
        if (typeof min === 'number') {
          maybeNumber = Math.max(min, maybeNumber)
        }

        // Apply upper threeshold if max is defined.
        if (typeof max === 'number') {
          maybeNumber = Math.min(max, maybeNumber)
        }

        if (typeof setValue === 'function') {
          setValue(maybeNumber)
        }
      }}
      onChange={(event) => {
        let maybeNumber = event.target.value

        // Force decimal separator.
        maybeNumber = maybeNumber.replace(',', decimalSeparator)

        // Avoid writing minus sign twice.
        maybeNumber = maybeNumber.replace('--', '-')

        // First character could me minus: keep it and remove all other minus signs.
        if (maybeNumber.length > 2) {
          maybeNumber = maybeNumber.charAt(0) + maybeNumber.substring(1).replace('-', '')
        }

        // If min is defined and positive, get rid off all minus signs.
        if (typeof min === 'number' && min >= 0) {
          maybeNumber = maybeNumber.replace('-', '')
        }

        // Avoid writing decimal separator twice.
        maybeNumber = maybeNumber.replace(`${decimalSeparator}${decimalSeparator}`, decimalSeparator)

        // Avoid duplicated decimal separator character.
        // If there is more then one decimal separator, keep only the first two parts.
        maybeNumber = maybeNumber.split(decimalSeparator).slice(0, 2).join(decimalSeparator)

        // Remove all characters except minus, decimal separator and numbers.
        maybeNumber = maybeNumber.replace(new RegExp(`[^-${decimalSeparator}\\d]`), '')

        setCurrentValue(maybeNumber)
      }}
      onFocus={() => { setEditing(true) }}
      placeholder={placeholder}
      type='text'
      value={editing ? currentValue : (value === null ? '' : value)}
    />
  )
}

```
