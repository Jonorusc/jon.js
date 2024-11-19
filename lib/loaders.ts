import Console from "./console"
import { clearCallBacks, mountedCallbacks, onMounted } from "./on-mounted"
import { initializeBindings, reactiveData } from "./reactive"

export function loadScript(src: string, callback: () => void): void {
  const script = document.createElement("script")
  script.src = src
  script.type = "module"
  script.onload = callback
  script.onerror = () => {
    window.$console("Failed to load script", "error")
  }
  document.head.appendChild(script) // Append to the head or body
}

export async function render(component: { template: string; style: string; setup: () => void }, mountPoint: HTMLElement) {
  // Ensure the component has the required properties
  if (!component.template) {
    throw new Error('Component must have a "template" property.')
  }

  // Inject the template into the mount point
  mountPoint.innerHTML = component.template

  // Apply styles, if present
  if (component.style) {
    const style = document.createElement("style")
    style.textContent = component.style
    document.head.appendChild(style)
  }
  
  // Execute the setup function, if provided
  if (typeof component.setup === "function") {
    component.setup()
  }

  // Dispatch the `mounted`
  mountedCallbacks.forEach((callback) => callback())
  // clear the callbacks to prevent memory leaks and ensure they are only called once
  clearCallBacks()
}

export function loadGlobalVariables() {
  // Assign the `reactiveData` function to the global `window` object for easy access across scripts.
  window.$reactive = reactiveData
  window.$console = Console
  window.$onMounted = onMounted
  window.$initializeBindings = initializeBindings
}
