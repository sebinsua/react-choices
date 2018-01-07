export const KEYCODE = {
  NUMPAD_2: 98,
  NUMPAD_4: 100,
  NUMPAD_6: 102,
  NUMPAD_8: 104,

  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,

  ESC: 27
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export const whenDifferent = (connectableProps = []) => (props, nextProps) =>
  connectableProps.some(prop => props[prop] !== nextProps[prop])
