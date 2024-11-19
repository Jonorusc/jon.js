/*
  This file is a simple implementation of an event emitter.
  It is used to dispatch events across the application.
  The `EventEmitter` class has three methods:
  - `on`: Adds an event listener to the specified event.
  - `off`: Removes an event listener from the specified event.
  - `emit`: Dispatches an event with the specified data.

  Usage:
  ```javascript
  import emitter from "./events"

  // Add an event listener
  emitter.on("event", (data) => {
    console.log(data)
  })

  // Dispatch an event
  emitter.emit("event", "Hello, World!")
  ```
*/

type EventListener<T = any> = (data: T) => void

export class EventEmitter<T = any> {
  private events: { [key: string]: EventListener<T>[] }

  constructor() {
    this.events = {}
  }

  on(event: string, listener: EventListener<T>): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  off(event: string, listenerToRemove: EventListener<T>): void {
    if (!this.events[event]) return

    this.events[event] = this.events[event].filter((listener) => listener !== listenerToRemove)
  }

  emit(event: string, data: T): void {
    if (!this.events[event]) return

    this.events[event].forEach((listener) => listener(data))
  }
}

const emitter = new EventEmitter()

export default emitter
