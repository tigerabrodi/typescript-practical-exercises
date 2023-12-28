// Event Target

export class EventTarget {
  // Listeners is a map of event names to a list of callbacks.
  // For example, { "click": [callback1, callback2] }
  // If there are no listeners for dispatched event, do nothing.
  // If multiple listeners are registered for the same event, they should be called in order.
  listeners: Map<string, Array<() => void>> = new Map()

  addEventListener(name: string, callback: () => void) {
    const existingListeners = this.listeners.get(name) || []

    this.listeners.set(name, [...existingListeners, callback])
  }

  removeEventListener(name: string, callback: () => void) {
    const existingListeners = this.listeners.get(name) || []

    this.listeners.set(
      name,
      existingListeners.filter((listener) => listener !== callback)
    ) // The reason `listener !== callback` works is because we are using the same function reference. How function references work: They are the same if they are the same function. If they are different functions, they are not the same.
  }

  dispatchEvent(name: string) {
    this.listeners.get(name)?.forEach((listener) => listener())
  }
}
