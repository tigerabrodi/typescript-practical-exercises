// Implement debounce function from scratch

// delay is ms
export function debounce<T extends (...args: Array<unknown>) => void>(
  callback: T,
  delay: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastCalled = 0

  return function (...args: Parameters<T>) {
    const now = Date.now()

    const shouldCallNow = immediate && now - lastCalled >= delay // If delay is less than difference between now and lastCalled, it means that the last call was more than delay ms ago

    clearTimeout(timeout as ReturnType<typeof setTimeout>) // We clear the timeout to prevent the callback from being called, this is fine because we'll set a new timeout later after the callback is called

    // We need `callback.apply(this, args)` because we want to preserve the context of the callback. This means that if the callback is a method of an object, the `this` keyword will still refer to the object. If we do not do this, the problem is that the `this` keyword will refer to the global object (window in browser, global in node) because the callback is called by setTimeout, which is a method of the global object.

    if (shouldCallNow) {
      lastCalled = now
      callback.apply(this, args)
    } else {
      timeout = setTimeout(() => {
        callback.apply(this, args)
      }, delay)
    }
  }
}
