export let mountedCallbacks: Array<() => void> = []

export function onMounted(callback: () => void) {
  if (typeof callback !== "function") {
    window.$console("onMounted expects a function as its argument.", "error")
  }
  mountedCallbacks.push(callback)
}

export function clearCallBacks() {
  mountedCallbacks = []
}
