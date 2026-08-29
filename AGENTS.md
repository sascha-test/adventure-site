# Advent of Tales — Projekt-Briefing

Interaktiver Choose-Your-Own-Adventure-Adventskalender im DnD-Setting (24 Tage, Dezember 2026). Jeden Tag ein neues Kapitel, Entscheidungen und Würfelchecks, die den weiteren Verlauf beeinflussen.

## ⚠️ REMINDER (offene Aufgabe)
- [ ] GitHub-Repo irgendwann auf **private** umstellen — spätestens sobald serverseitige Logik (service_role-Key!), echte Story-Inhalte oder Tages-Gating dazukommen, und vor dem Dezember-Live-Gang. Aktuell ist public okay (keine Secrets im Repo). Nach dem Umstellen: testen, ob Vercel weiterhin deployt (GitHub → Settings → Applications → Vercel → App-Zugriff auf das Repo prüfen).

## Projekt-Stack
- Next.js (TypeScript, Tailwind CSS v4, App Router, Turbopack)
- Supabase (Auth mit Magic Links + Postgres-Datenbank — BEIDES EINGERICHTET)
- Vercel (Hosting aktiv, eigene Domain verbunden)
- GitHub-Repo: https://github.com/sascha-test/adventure-site

## Projekt-Pfad
/Users/saschapolarise/Documents/Test Project/adventure-site

## Design / Branding
- Color-Scheme "Ember & Moss"
- Fonts: Domine (display/überschriften), Manrope (body/text)
- Farben: background oklch(0.15 0.01 250), text oklch(0.97 0.005 250), ember (orange) oklch(0.62 0.14 45), moss (grün) oklch(0.62 0.14 150)
- Logo: /public/logo.jpeg

## Live-Status (Stand: 28.08.2026)
- ✅ https://www.dungeonsandpages.com läuft komplett mit SSL (Vercel)
- ✅ Login-Seite live: /login (Magic Link, orange "Login"-Button oben rechts)
- ✅ Auth-Callback live: /auth/callback
- ✅ Login-Test am 28.08.2026 erfolgreich: Magic-Link-Anfrage → Mail kam an → Klick → eingeloggt → Logout
- DNS bei GoDaddy: A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com (Nameserver NICHT ändern, MX = Google NICHT anfassen)

## Supabase-Setup (fertig)
- Projekt-Ref: pqtcmqpemoiaaljsupjx, Region Frankfurt (eu-central-1) — EU-Souveränität
- Env-Vars (identisch in .env.local und Vercel, Production): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- Supabase-Integration in Vercel verknüpft (28.08.2026): hat zusätzlich POSTGRES_URL, POSTGRES_PASSWORD, SUPABASE_* (inkl. SERVICE_ROLE_KEY, JWT_SECRET, NEXT_PUBLIC_SUPABASE_ANON_KEY) in Vercel angelegt. Code nutzt diese NICHT — sie sind server-only (kein NEXT_PUBLIC_-Präfix außer ANON_KEY) und ungenutzt. service_role/JWT_SECRET dürfen niemals clientseitig verwendet werden.
- Login-Methode: Magic Link (passwortlos)
- Redirect-URLs: http://localhost:3000/auth/callback + https://www.dungeonsandpages.com/auth/callback (Production getestet)
- Vor Dezember: "Allow new users to sign up" deaktivieren + User manuell anlegen (Option A, Familien-/Freunde-Zugang)

## Roadmap & Fortschritt
1. ✅ Setup & Landingpage
2. ✅ Git/GitHub
3. ✅ Deploy auf Vercel — Domain + SSL laufen
4. ✅ Supabase-Setup + Login (Magic Link) — Login-Test am 28.08.2026 bestanden
5. ✅ Story-Engine — JSON-basierte Szenenstruktur, Verzweigungen, Flaggen (Demo: /story, 5 Tage)
6. ✅ Tages-Gating (serverseitig) — Szenen späterer Tage werden gar nicht an den Browser geschickt; Start 01.12.2026, Zeitzone Europe/Berlin; Preview-Link: /story?preview=STORY_PREVIEW_TOKEN (Env-Var in .env.local + Vercel, NICHT im Code — Repo ist public)
7. ⬜ Charakter- & Würfelsystem — eigenes Regelwerk (d20-basiert, Stats, HP, Kampf)
8. ⬜ Fortschritts-Tracking in DB — Tag, Choices, Stats, HP pro User (Tabelle game_progress mit user_id, RLS aktivieren!)
9. ⬜ Echte Story-Inhalte einpflegen — vorhandenes Material des Users
10. ⬜ Polish — Styling, Mobile, Illustrationen

## Wichtige Learnings / Konventionen
- Workflow: Code ändern → git add → git commit → git push. NUR der push löst das Vercel-Deployment aus. Immer pushen!
- Jeder push auf main geht live auf Vercel. Andere Branches = Preview-URLs.
- Next.js 16.3.0: Vor Code-Änderungen die Docs in node_modules/next/dist/docs/ lesen (breaking changes gegenüber älteren Versionen, z.B. await cookies()).
- Checks vor jedem Commit: npx tsc --noEmit && npm run lint && npm run build
- .env.local liegt im Projekt-Root (nicht in src/), ist in .gitignore — NIEMALS committen (Repo ist public!)
- Route Handlers: src/app/.../route.ts (export GET etc., nicht cached)
- Vercel Env-Vars: aktuell nur für Production gesetzt — falls Preview-Deployments genutzt werden, auch für Preview/Development setzen
- Mac-DNS-Cache leeren (falls nötig): sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

## Entscheidungen
- 24 Tage (klassischer Adventskalender)
- Regelwerk: eigenes, vereinfachtes (d20-basiert, Stats, HP, Kampf)
- Speicherung: Login + Datenbank (Supabase), nicht nur Browser-Speicher
- Login: Magic Link (passwortlos)
- Zugang: jetzt offen zum Entwickeln, vor Dezember Registrierung deaktivieren + User manuell anlegen (Option A)
- Sprache der Story-Inhalte: Englisch
- Zielgruppe zuerst: Familie & Freunde

## Über den Nutzer
Anfänger — klar erklären, nachfragen bevor Dinge geändert werden, technische Begriffe nicht als bekannt voraussetzen.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
