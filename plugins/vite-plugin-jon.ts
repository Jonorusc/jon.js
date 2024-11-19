import { Plugin } from "vite"

export default function jonLoader(): Plugin {
  return {
    name: "vite-plugin-jon",
    enforce: "pre", // Ensure this runs early in the pipeline
    resolveId(id) {
      if (id.endsWith(".jon")) {
        return id // Tell Vite to handle this file
      }
      return null
    },
    transform(src, id) {
      if (id.endsWith(".jon")) {
        // Extract the `<template>`, `<script>`, and `<style>` sections
        const templateMatch = src.match(/<template>([\s\S]*?)<\/template>/)
        const scriptMatch = src.match(/<script>([\s\S]*?)<\/script>/)
        const styleMatch = src.match(/<style>([\s\S]*?)<\/style>/)

        const template = templateMatch ? templateMatch[1].trim() : ""
        const script = scriptMatch ? scriptMatch[1].trim() : ""
        const style = styleMatch ? styleMatch[1].trim() : ""

        // Wrap the extracted sections into a JavaScript module
        // export as default so that we can import it like this: import Component from "./component.jon"
        return `
          export default {
            template: \`${template}\`,
            setup() {
              ${script}
            },
            style: \`${style}\`
          }
        `
      }

      return null // Skip files that are not `.jon`
    },
  }
}
