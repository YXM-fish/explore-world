import { forEach as _forEach } from 'lodash'

const DATE_FORMATS = {
  yyyy: dateGetter('FullYear', 4, 0, false, true),
  yy: dateGetter('FullYear', 2, 0, true, true),
  MM: dateGetter('Month', 2, 1),
  M: dateGetter('Month', 1, 1),
  dd: dateGetter('Date', 2),
  d: dateGetter('Date', 1),
  HH: dateGetter('Hours', 2),
  H: dateGetter('Hours', 1),
  hh: dateGetter('Hours', 2, -12),
  h: dateGetter('Hours', 1, -12),
  mm: dateGetter('Minutes', 2),
  m: dateGetter('Minutes', 1),
  ss: dateGetter('Seconds', 2),
  s: dateGetter('Seconds', 1)
}

function padNumber (num, digits, trim, negWrap) {
  let neg = ''
  if (num < 0 || (negWrap && num <= 0)) {
    if (negWrap) {
      num = -num + 1
    } else {
      num = -num
      neg = '-'
    }
  }
  num = '' + num
  while (num.length < digits) num = '0' + num
  if (trim) {
    num = num.substr(num.length - digits)
  }
  return neg + num
}

function dateGetter (name, size, offset, trim, negWrap) {
  offset = offset || 0
  return function (date) {
    let value = date['get' + name]()
    if (offset > 0 || value > -offset) {
      value += offset
    }
    if (value === 0 && offset === -12) value = 12
    return padNumber(value, size, trim, negWrap)
  }
}

export function date (val, format) {
  let DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/
  let text = ''
  let parts = []
  let fn
  let match
  let date = val
  if (typeof val === 'string') {
    date = parseInt(val, 10)
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  while (format) {
    match = DATE_FORMATS_SPLIT.exec(format)
    if (match) {
      parts = parts.concat([].slice.call(match, 1))
      format = parts.pop()
    } else {
      parts.push(format)
      format = null
    }
  }
  _forEach(parts, function (value) {
    fn = DATE_FORMATS[value]
    if (fn) {
      text += fn(date)
    } else {
      text += value === '\'\'' ? '\'' : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'')
    }
  })
  return text
}

// element-日期组件使用
export function getNowDate (type) {
  const date = new Date()
  switch (type) {
    case 'start-ymd':
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      break
    case 'end-ymd':
      date.setHours(23)
      date.setMinutes(59)
      date.setSeconds(59)
      break
  }

  return date
}

export function getDatePickerOptions (type = 'daterange') {
  const shortcutClick = function (shortcutType) {
    return function (picker) {
      let start = null
      let end = getNowDate('end-ymd')
      let datevalue = null
      let nowDateTime = getNowDate('start-ymd').getTime()
      switch (shortcutType) {
        case 'today':
          start = getNowDate('start-ymd')
          break
        case 'yesterday':
          end = new Date(end - 3600 * 1000 * 24 * 1)
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 1)
          break
        case '3d':
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 3)
          break
        case '7d':
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 7)
          break
        case '15d':
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 15)
          break
        case '30d':
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 30)
          break
        case '90d':
          start = new Date(nowDateTime - 3600 * 1000 * 24 * 90)
          break
      }

      switch (type) {
        case 'daterange':
          datevalue = [start, end]
          break
        case 'date':
          datevalue = start
          break
      }
      picker.$emit('pick', datevalue)
    }
  }

  const datePickerOptions = {
    shortcuts: [
      {
        text: '今天',
        onClick: shortcutClick('today')
      },
      {
        text: '昨天',
        onClick: shortcutClick('yesterday')
      },
      {
        text: '最近3天',
        onClick: shortcutClick('3d')
      },
      {
        text: '最近1周',
        onClick: shortcutClick('7d')
      },
      {
        text: '最近15天',
        onClick: shortcutClick('15d')
      },
      {
        text: '最近30天',
        onClick: shortcutClick('30d')
      },
      {
        text: '最近90天',
        onClick: shortcutClick('90d')
      }
    ]
  }

  return datePickerOptions
}
