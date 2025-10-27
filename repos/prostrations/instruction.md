Vytvor aplikaci counter pro Ngöndro

zakladni bude counter aplikace s :
- aplikace bude jako SPA jayzk javascript a css s metodikou BEM
- minimalistickou funkcionalitou, 
- jednoduche barvy cerna a bila
- bude mit hlavicku na leve strane znak karmakagju a nadpis Ngöndro a na prave strane menu ikona lucide.dev menu
- klikanim prstem nebo mysi se pridava cislo
- dole pod cislem bude "progress bar" seda cara se zarazky vpravo a vlevo, pri klikani se posunuje "progress bar" bila cara, ktera bude 3x tlustsi nez seda cara
- v aplikaci budou 2 ruzne meditace (prozatim bude v hlaviccce u menu ikona 1 a 2 preklikavani counter): 
  ... jednoduchy counter, 
  ... counter pro poklony - u poklon bude dole u cisla jeste jedno male sede cislo a bude nasobkem 6
- defaultne maximum "progress bar" je 108 (bude nastavitelne)

example :

global.css

@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

// --------------------------------------------------------

page.tsx

"use client"

import { useState } from "react"

export default function MobileVerticalCounter() {
  const [count, setCount] = useState(0)
  const max = 100
  const progress = (count / max) * 100

  const handleIncrement = () => {
    if (count < max) {
      setCount((c) => c + 1)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-between h-screen bg-black text-white p-6 select-none"
      onClick={handleIncrement}
    >
      {/* Main counter display */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[25vw] font-bold leading-none">{count}</div>
      </div>

      <div className="w-full mb-8 relative flex items-center">
        {/* Start stopper */}
        <div className="absolute left-0 w-1 h-6 bg-white/20 rounded-full z-10" />

        {/* Progress bar background */}
        <div className="w-full h-[4px] bg-white/20" />

        {/* Progress bar fill */}
        <div
          className="absolute h-[12px] bg-white transition-all duration-300 left-0"
          style={{ width: `${progress}%` }}
        />

        {/* End stopper */}
        <div className="absolute right-0 w-1 h-6 bg-white/20 rounded-full z-10" />
      </div>
    </div>
  )
}



