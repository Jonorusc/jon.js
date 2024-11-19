/*
  This file will contain the implementation of the `encodeToSetAttribute` and `decodeSetAttribute` functions.
  The first one will encrypt the data to be stored in the DOM, and the second one will decrypt it.
*/

export const encodeToSetAttribute = (data: string, el: HTMLElement) => {
  el.setAttribute("data-reactive", encryptUsingKey(data))
}

const encryptUsingKey = (data: string) => {
  // TODO: Implement encryption logic
  const encodedData = btoa(data)
  return encodedData
}

const decryptUsingKey = (data: string) => {
  const decodedData = atob(data)
  return decodedData
}

export const decodeSetAttribute = (el: HTMLElement) => {
  return decryptUsingKey(el.getAttribute("data-reactive") || "")
}
