/* 
  A simple reactive function is implemented here.
  This function accepts an object and returns a Proxy object that allows tracking changes to the object's properties.
*/

import { decodeSetAttribute, encodeToSetAttribute } from "./encode"

// Match {{ value }} pattern
const placeholderRegex = /{{\s*([\w.]+)\s*}}/g // Capture the value inside {{ }}

export type Reactive<T> = T & { [K in keyof T]: T[K] } & { [key: string]: any; [key: symbol]: any }

/**
 * The `reactiveData` function is designed to make the passed object reactive by returning a Proxy.
 *
 * @param data The object that will be made reactive. This must be an object.
 *
 * @returns A Proxy that wraps the input object, allowing access to its properties
 * and enabling automatic DOM updates when properties change.
 */
export function reactiveData<T extends object>(data: T): Reactive<T> {
  // Runtime validation: Ensure the passed data is actually an object and not null.
  if (typeof data !== "object" || data === null) {
    throw new Error("reactiveData must be called with an object.") // Throw an error if the data is invalid.
  }

  initializeBindings(data)

  // Return a Proxy that wraps the data, enabling reactivity.
  return new Proxy(data, {
    // `get` trap: Intercepts the property access on the object.
    // If the property exists, return its value; otherwise, return null.
    get(target, prop: string | symbol) {
      // If the property exists in the target object, return its value.
      // Otherwise, return null.
      return prop in target ? target[prop as keyof T] : null
    },

    // `set` trap: Intercepts property assignments.
    // When a property is changed, it updates the target object and reflects the change in the DOM.
    set(target: { [key: string]: any; [key: symbol]: any }, prop: string | symbol, value: T[keyof T]) {
      // Update the value of the property on the target object.
      target[prop] = value
      // Find all elements in the DOM that are bound to this property using the `bind-value`
      const bindValue = document.querySelectorAll<HTMLElement>(`[data-reactive]`)
      // For each element bound to the property, update its text content to reflect the new value.
      bindValue.forEach((el) => {
        const placeHolder = decodeSetAttribute(el) // Decode the value from the attribute
        // replace the placeholder with the new value
        replacePlaceholders(el, target, placeHolder)
      })

      // Return true to indicate that the operation was successful.
      return true
    },
  })
}

export function initializeBindings(state: Record<string, any>) {
  // Get all elements that may contain bindings within their text content
  const allElements = document.querySelectorAll<HTMLElement>("*")

  // Filter elements that contain a placeholder like {{ value }} and have no child elements
  const matchingElements = Array.from(allElements).filter((el) => {
    return el.children.length === 0 && placeholderRegex.test(el.textContent?.trim() || "")
  })

  // Iterate over matching elements and replace placeholders with corresponding state values
  matchingElements.forEach((el) => {
    let updatedText = el.textContent?.trim() || ""
    encodeToSetAttribute(updatedText, el)

    replacePlaceholders(el, state, updatedText)
  })
}

const replacePlaceholders = (el: HTMLElement, state: Record<string, any>, placeHolder: string) => {
  // Replace all {{ value }} patterns with the corresponding state value
  const updatedText = placeHolder.replace(placeholderRegex, (_, key) => {
    // Access the value from state using the captured key
    return state[key] !== undefined ? state[key] : "" // Fallback to empty string if not found
  })

  // Update the textContent of the element
  el.textContent = updatedText || ""
}
