import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Archivo_Black, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google"

import "./globals.css"

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
})

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
})

const labMono = JetBrains_Mono({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-lab-mono",
})

export const metadata: Metadata = {
  title: {
    default: "IPC2 Hub · jorgemejia25",
    template: "%s · IPC2 Hub",
  },
  description:
    "Selector de proyectos y laboratorios de auxiliatura IPC2: Practica1, Proyecto1, Git Flow, POO, JSON y XML.",
  authors: [{ name: "jorgemejia25", url: "https://github.com/jorgemejia25" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${mono.variable} ${labMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-mono">{children}</body>
    </html>
  )
}
