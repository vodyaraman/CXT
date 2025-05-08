"use client"

import { LinkButton } from "@/components/buttons"

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>This is starting page</p>
      <LinkButton href="/dashboard" text="Тестовый модуль"/>
    </main>
  )
}
