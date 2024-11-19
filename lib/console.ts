export default function Console(msg: string, type?: "error" | "warn" | "success"): void {
  const message = `
    %c${msg}
  `

  const messageStyle =
    type === "error"
      ? "color: red; font-weight: bold"
      : type === "warn"
      ? "color: orange; font-weight: bold"
      : type === "success"
      ? "color: green; font-weight: bold"
      : "color: black; font-weight: bold"
  console.error(`%c${message}`, messageStyle)
}
