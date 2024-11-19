import { reactiveData, initializeBindings } from "@@/lib/reactive"
import Console from "@@/lib/console"

declare global {
  interface Window {
    $reactive: typeof reactiveData
    $console: typeof Console
    $onMounted: (callback: () => void) => void
    $initializeBindings: typeof initializeBindings
  }
}

export {}
