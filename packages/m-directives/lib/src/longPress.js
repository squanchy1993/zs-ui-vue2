const LONG_PRESS_START = 'longPressStart'
const LONG_PRESS_END = 'longPressEnd'
const LONG_PRESS_INTERVAL = 'longPressInterval'

export default class LongPress {
  delay = 400;
  interval = 50;
  constructor({ delay = null, interval = null }) {
    delay && (this.delay = delay)
    interval && (this.interval = interval)
  }

  bind = (el, binding, vNode) => {
    const funDelay = binding?.value?.delay || this.delay;
    const funInterval = binding?.value?.interval || this.interval;
    let pressTimer = null
    let pressInterval = null

    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          if (funInterval && funInterval > 0) {
            pressInterval = setInterval(() => {
              this.emitEvent(vNode, LONG_PRESS_INTERVAL, e)
            }, funInterval)
          }
          this.emitEvent(vNode, LONG_PRESS_INTERVAL, e)
          this.emitEvent(vNode, LONG_PRESS_START, e)
        }, funDelay)
      }
    }

    // Cancel Timeout
    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
      if (pressInterval) {
        clearInterval(pressInterval)
        pressInterval = null
        this.emitEvent(vNode, LONG_PRESS_END, e)
      }
    }

    ['mousedown', 'touchstart'].forEach(e => {
      el.addEventListener(e, start, { passive: true })
    });
    ['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => {
      el.addEventListener(e, cancel, { passive: true })
    })
  }

  emitEvent(vNode, eventName, e) {
    if (vNode.componentInstance) {
      vNode.componentInstance.$emit(eventName, { detail: e }); // use {detail:} to be uniform
    } else {
      vNode.elm.dispatchEvent(new CustomEvent(eventName, { detail: e }));
    }
  }
}