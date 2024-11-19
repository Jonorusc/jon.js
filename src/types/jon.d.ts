declare module "*.jon" {
  const content: {
    template: string
    setup: () => void
    style: string
  }
  export default content
}
