'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h1>Критическая ошибка</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Обновить</button>
      </body>
    </html>
  )
}
