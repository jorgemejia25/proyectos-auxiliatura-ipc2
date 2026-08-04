import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google"

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

export const metadata: Metadata = {
  title: {
    default: "IPC2 Hub · jorgemejia25",
    template: "%s · IPC2 Hub",
  },
  description:
    "Selector de proyectos de auxiliatura IPC2: Practica1 Veterinaria POO y Proyecto1 Chapín Warriors.",
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
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-mono">{children}</body>
    </html>
  )
}
