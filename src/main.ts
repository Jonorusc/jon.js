import "@/main.css"
import { render, loadGlobalVariables } from "@@/lib/loaders"
import HelloWorld from "@/components/HelloWorld.jon"


loadGlobalVariables()

// render
render(HelloWorld, document.querySelector<HTMLDivElement>("#app")!)
