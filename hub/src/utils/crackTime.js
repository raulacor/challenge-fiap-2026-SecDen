// Brute-force crack-time estimator used by the "What Is Bruteforce?" challenge.
// Assumes an offline attack against a fast, unsalted hash — a common
// "worst case" benchmark used in password-strength education.

export const GUESSES_PER_SECOND = 1e9 // 1 billion guesses/sec — a modern GPU rig on a fast hash

const CHAR_SETS = [
  { re: /[a-z]/, size: 26 },
  { re: /[A-Z]/, size: 26 },
  { re: /[0-9]/, size: 10 },
  { re: /[^a-zA-Z0-9]/, size: 33 }, // common keyboard symbols
]

const YEAR = 31557600 // seconds in a Julian year
const AGE_OF_UNIVERSE = 4.35e17 // seconds, ~13.8 billion years

const TIERS = [
  { id: 'instant',     max: 1,             label: 'QUEBRADA INSTANTANEAMENTE', color: '#FF1A1A', pct: 4  },
  { id: 'critical',    max: 60,            label: 'QUEBRADA EM SEGUNDOS',      color: '#FF1A1A', pct: 12 },
  { id: 'weak',        max: 3600,          label: 'FRACA',                     color: '#FF4500', pct: 24 },
  { id: 'poor',        max: 2629800 * 12,  label: 'RUIM',                      color: '#FFA500', pct: 38 },
  { id: 'fair',        max: YEAR * 10,     label: 'RAZOÁVEL',                  color: '#FFD700', pct: 55 },
  { id: 'good',        max: YEAR * 1000,   label: 'BOA',                       color: '#00EEFF', pct: 72 },
  { id: 'strong',      max: YEAR * 1e6,    label: 'FORTE',                     color: '#00FF88', pct: 88 },
  { id: 'unbreakable', max: Infinity,      label: 'PRATICAMENTE INQUEBRÁVEL',  color: '#9B59B6', pct: 100 },
]

function tierFor(seconds) {
  return TIERS.find(t => seconds < t.max) || TIERS[TIERS.length - 1]
}

function formatCombinations(charsetSize, length) {
  if (length === 0) return '0'
  const log10 = length * Math.log10(charsetSize)
  if (log10 > 18) {
    const exp = Math.floor(log10)
    const mantissa = Math.pow(10, log10 - exp)
    return `${mantissa.toFixed(2)} × 10^${exp}`
  }
  return Math.round(Math.pow(charsetSize, length)).toLocaleString()
}

function crackSeconds(charsetSize, length) {
  if (length === 0) return 0
  const log10Combinations = length * Math.log10(charsetSize)
  const log10Seconds = log10Combinations - Math.log10(2) - Math.log10(GUESSES_PER_SECOND)
  if (log10Seconds > 300) return Infinity
  if (log10Seconds < -300) return 0
  return Math.pow(10, log10Seconds)
}

export function analyzePassword(password) {
  const length = password.length
  let charsetSize = 0
  CHAR_SETS.forEach(({ re, size }) => { if (re.test(password)) charsetSize += size })
  if (length > 0 && charsetSize === 0) charsetSize = 1

  const entropyBits = length > 0 ? length * Math.log2(charsetSize) : 0
  const seconds = crackSeconds(charsetSize, length)
  const combinationsDisplay = formatCombinations(charsetSize, length)
  const tier = tierFor(length > 0 ? seconds : 0)

  return { length, charsetSize, entropyBits, seconds, combinationsDisplay, tier }
}

export function formatDuration(seconds) {
  if (seconds <= 0) return '0 segundos'
  if (!isFinite(seconds)) return 'mais tempo do que o universo existe — muitas vezes'
  if (seconds < 1) return 'instantaneamente'

  if (seconds > AGE_OF_UNIVERSE) {
    const multiple = seconds / AGE_OF_UNIVERSE
    const formatted = multiple >= 1000 ? multiple.toExponential(1) : multiple.toFixed(1)
    return `${formatted}× a idade do universo`
  }

  const units = [
    { singular: 'segundo',  plural: 'segundos',  s: 1 },
    { singular: 'minuto',   plural: 'minutos',   s: 60 },
    { singular: 'hora',     plural: 'horas',     s: 3600 },
    { singular: 'dia',      plural: 'dias',      s: 86400 },
    { singular: 'mês',      plural: 'meses',     s: 2629800 },
    { singular: 'ano',      plural: 'anos',      s: YEAR },
    { singular: 'século',   plural: 'séculos',   s: YEAR * 100 },
    { singular: 'milênio',  plural: 'milênios',  s: YEAR * 1000 },
  ]

  for (let i = units.length - 1; i >= 0; i--) {
    if (seconds >= units[i].s) {
      const val = seconds / units[i].s
      const display = val >= 1000 ? Math.round(val).toLocaleString('pt-BR') : val.toFixed(val < 10 ? 1 : 0)
      return `${display} ${val >= 2 ? units[i].plural : units[i].singular}`
    }
  }
  return `${seconds.toFixed(1)} segundos`
}

export function formatRate(n) {
  if (n >= 1e9) {
    const val = n / 1e9
    return `${val} ${val === 1 ? 'bilhão' : 'bilhões'} de tentativas/seg`
  }
  if (n >= 1e6) {
    const val = n / 1e6
    return `${val} ${val === 1 ? 'milhão' : 'milhões'} de tentativas/seg`
  }
  return `${n.toLocaleString('pt-BR')} tentativas/seg`
}
