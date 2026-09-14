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
7. 🔨 Charakter- & Würfelsystem — eigenes Regelwerk (d20-basiert, Stats, HP, Kampf) — Etappe 1 ✅ (28.08.2026): Server-Architektur (s. Entscheidungen); Regeln (Stats/HP/Checks/Kampf/Death Pages) folgen nach gemeinsamer Durchsprache des Buch-Regelkonzepts
8. ✅ Fortschritts-Tracking in DB — Tabelle game_progress (user_id PK, state jsonb, RLS: nur eigene Zeile, Migration: supabase/migrations/001_game_progress.sql); /story erfordert Login; Laden UND Speichern komplett serverseitig über Server Actions (src/story/actions.ts — der Browser erhält nur die aktuelle Szene + eigener Spielstand, nie die Story-JSON; /api/progress entfernt); ungültige/gesperrte Stände werden automatisch auf Tag 1 zurückgesetzt
9. ⬜ Echte Story-Inhalte einpflegen — vorhandenes Material des Users
10. ⬜ Polish — Styling, Illustrationen — Grafikstil FESTGELEGT (14.09.2026): **Pixel-Art** via PixelLab (pixellab.ai) für Charaktere + Animationen (walk/attack/idle), Health-Bars, UI-Elemente (Buttons, Menü) und den overall Vibe; Ember-&-Moss-Farben als Palette/Referenz mitgeben (Style-Konsistenz per Referenzbild); PixelLab hat MCP-Server + API — bei Schritt-10-Start einrichten (Konto + Token), dann Assets direkt aus dem Agenten-Workflow generieren; PixelLab-Gratis-Tier: 40 Generationen zum Testen, Paid ab $12/Monat
11. ⬜ Mobile-Optimierung — primäres Spielgerät ist das Smartphone: Layout & Typografie auf kleinen Screens, große gut tippbare Entscheidungs-Buttons, Performance/Ladezeit, Tests auf echten iOS-/Android-Geräten
12. ⬜ Sprachen-Entscheidung — Mehrsprachigkeit (insbesondere Deutsch neben Englisch) gegen Projektende bewerten: Aufwand für Story-Inhalte, UI-Texte, Würfel-Feedback; erst entscheiden, wenn Rest steht

## Geplante Projekt-Skills (.opencode/skills/<name>/SKILL.md)
Je Skill anlegen, wenn der zugehörige Schritt ansteigt — nicht vorher:
- **story-authoring** — Szenen-Format (id/day/choices/requires/effects/endsDay), Validator-Regeln, Erzählstil, Preview-Test → zu Schritt 9 (echte Story-Inhalte). Achtung: Repo ist public — NIE Buch-Spoiler in die Projekt-Skill schreiben, nur Format-/Stil-Konventionen
- **web-design** — Design-System (Ember & Moss, Domine/Manrope) + Design-Ideen des Users gegen den statischen Look (Animationen, Übergänge, Stimmung) → zu Schritt 10 (Polish); anlegen, sobald die Ideen des Users feststehen
- **dice-rules** — das ausgearbeitete Regelwerk (Stats, Check-Format, Death Pages, Kampfregeln, Schwierigkeits-Leitfaden fürs Buch) → zu Schritt 7; anlegen NACH Durchsprache des Buch-Regelkonzepts und Umsetzung (Etappe 2/3)
- **mobile-testing** — Checkliste für Schritt 11: Tests auf echten iOS-/Android-Geräten, Tippgrößen, Breakpoints, Performance → anlegen, wenn Mobile-Optimierung startet

**Installierte externe Skills (28.08.2026, via `npx skills add … --copy` — liegen in .agents/skills/, Versionen/Quellen in skills-lock.json, Updates via `npx skills update`):**
- **supabase** + **supabase-postgres-best-practices** (offiziell, supabase/agent-skills) — VOR jeder DB-/RLS-/Migrations-/supabase-js-Arbeit laden
- **ui-animation** (mblode/agent-skills) — zu Schritt 10: Animations-Regeln (nur transform/opacity, prefers-reduced-motion, CSS-first)
- **impeccable** (pbakaus/impeccable) — zu Schritt 10: kompletter Design-Workflow (critique/audit/polish/animate/typeset/…, mit Next.js-Support)
- Hinweise: opencode lädt neue Skills erst nach einem Neustart. Impeccable-Telemetrie (nur beim „Concept-Roll"-Feature) abschaltbar via `IMPECCABLE_NO_TELEMETRY=1`; Bildgenerierung braucht einen OpenAI-Key (nicht konfiguriert → ungenutzt). Skills sind Anweisungen von Dritten — bei Updates Inhalte wieder prüfen.

## Wichtige Learnings / Konventionen
- Workflow: Code ändern → git add → git commit → git push. NUR der push löst das Vercel-Deployment aus. Immer pushen!
- Jeder push auf main geht live auf Vercel. Andere Branches = Preview-URLs.
- Next.js 16.3.0: Vor Code-Änderungen die Docs in node_modules/next/dist/docs/ lesen (breaking changes gegenüber älteren Versionen, z.B. await cookies()).
- Checks vor jedem Commit: npx tsc --noEmit && npm run lint && npm run build
- .env.local liegt im Projekt-Root (nicht in src/), ist in .gitignore — NIEMALS committen (Repo ist public!)
- Route Handlers: src/app/.../route.ts (export GET etc., nicht cached)
- Server Actions: src/story/actions.ts mit "use server" — jeder Spielzug (Entscheidung, Tageswechsel, Neustart) läuft serverseitig: DB-Stand laden → prüfen (Login, Tag-Gating, Preview-Token, Szene/Choice gültig) → anwenden → speichern → nur das Ergebnis (TurnResult) an den Browser. Basis für faires Würfeln in Schritt 7.
- Achtung bei `rm -rf .next`: Danach kennt `npx tsc --noEmit` die von Next generierten Typen (PageProps etc.) erst wieder nach `npm run build` oder `npm run dev` — Reihenfolge also erst builden, dann tsc.
- Vercel Env-Vars: aktuell nur für Production gesetzt — falls Preview-Deployments genutzt werden, auch für Preview/Development setzen
- Mac-DNS-Cache leeren (falls nötig): sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

## Entscheidungen
- 24 Tage (klassischer Adventskalender)
- Regelwerk: eigenes, vereinfachtes (d20-basiert, Stats, HP, Kampf)
- Architektur (28.08.2026, „Variante A"): komplette Server-Regie — Server Actions, DB ist die einzige Wahrheit, Würfeln nur serverseitig (crypto-Zufall), keine Story-JSON im Browser, Client schickt nie Spielstände, sondern nur Klick-Intents
- Regelwerk-Vorgaben aus dem Buch (28.08.2026): keine automatische Heilung über Nacht (nur Story-Momente heilen); Tod ist real — „Death Pages" mit bis zu 3 Wiederbelebungen + bleibende Mali; Details zu Stats/Check-Misserfolg/Charakter-Erstellung im Buchkonzept des Users — gemeinsam durchgehen, bevor sie eingebaut werden
- Speicherung: Login + Datenbank (Supabase), nicht nur Browser-Speicher
- Login: Magic Link (passwortlos)
- Zugang: jetzt offen zum Entwickeln, vor Dezember Registrierung deaktivieren + User manuell anlegen (Option A)
- Grafikstil (14.09.2026): Pixel-Art für alle grafischen Elemente (Charaktere, Animationen, Health-Bars, UI, Szenen) — Tool der Wahl: PixelLab (Pixel-Asset-Spezialist: Style-Konsistenz per Referenzbild, Animation per Text/Skelett, MCP + Python-SDK); Higgsfield evaluiert und verworfen (Video-/Marketing-Fokus, Credit-Abo ohne Roll-over)
- Sprache der Story-Inhalte: Englisch (Mehrsprachigkeit — v. a. Deutsch — als offene Option, neu bewerten am Projektende, siehe Roadmap-Punkt 12)
- Zielgruppe zuerst: Familie & Freunde

## Über den Nutzer
Anfänger — klar erklären, nachfragen bevor Dinge geändert werden, technische Begriffe nicht als bekannt voraussetzen.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
