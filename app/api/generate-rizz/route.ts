import { NextResponse } from 'next/server'

const rizzLines = [
  "Are you a parking ticket? Because you've got FINE written all over you.",
  "I must be a snowflake, because I've fallen for you.",
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a map? I just keep getting lost in your eyes.",
  "Is your name Google? Because you've got everything I've been searching for.",
  "Are you a camera? Because every time I look at you, I smile.",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
  "Are you a bank loan? Because you've got my interest.",
  "Is your name Wi-Fi? Because I'm really feeling a connection.",
  "Are you a time traveler? Because I see you in my future.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a campfire? Because you're hot and I want s'more.",
  "Is your name Ariel? Because we mermaid for each other.",
  "Do you have a sunburn, or are you always this hot?",
  "Are you a cat? Because you're purr-fect.",
]

export async function GET() {
  const shuffled = [...rizzLines].sort(() => 0.5 - Math.random())
  const selectedRizzLines = shuffled.slice(0, 5)
  
  return NextResponse.json({ rizzLines: selectedRizzLines })
}

