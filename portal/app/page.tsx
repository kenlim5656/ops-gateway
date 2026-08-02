import Link from "next/link";

const FEATURES = [
  {
    icon: "🔀",
    title: "Unified AI Gateway",
    description:
      "Route all AI requests through a single endpoint. Manage OpenAI, Anthropic, and other providers with one API key per team.",
  },
  {
    icon: "📊",
    title: "Deep Observability",
    description:
      "Inspect every prompt, response, and tool call. Trace multi-step agent sessions with full token-level detail via Langfuse.",
  },
  {
    icon: "💰",
    title: "Budget Enforcement",
    description:
      "Set per-team monthly spending limits. Automatically block requests when budgets are exhausted — no surprise bills.",
  },
  {
    icon: "🔑",
    title: "Virtual Key Management",
    description:
      "Issue scoped API keys per team with model-level access control. Revoke keys instantly without touching provider credentials.",
  },
  {
    icon: "🏷️",
    title: "Metadata Tagging",
    description:
      "Tag every request with team, application, and trace IDs via headers. Attribute costs and debug issues per project.",
  },
  {
    icon: "🐳",
    title: "One-Command Deploy",
    description:
      "Full stack in a single docker compose up. Postgres, ClickHouse, Redis, Langfuse, and LiteLLM — production-ready in minutes.",
  },
];

const STACK = [
  { name: "LiteLLM Proxy", role: "AI Gateway & Key Management", port: "4000" },
  { name: "Langfuse", role: "Observability & Tracing", port: "3000" },
  { name: "PostgreSQL 16", role: "Metadata & Key Storage", port: "—" },
  { name: "ClickHouse", role: "Analytical Trace Storage", port: "—" },
  { name: "Redis", role: "Queue & Cache Layer", port: "—" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-dim)_0%,_transparent_50%)] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Open Source — Self Hosted
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              AI Operations
              <span className="block text-accent">Mission Control</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Centralized gateway for all your enterprise AI applications and
              coding agents. API key management, budget enforcement, model
              routing, and deep observability — in a single self-hosted stack.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quickstart"
                className="inline-flex h-11 items-center rounded-lg bg-accent px-6 font-medium text-background hover:bg-accent/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/architecture"
                className="inline-flex h-11 items-center rounded-lg border border-border px-6 font-medium text-foreground hover:bg-card transition-colors"
              >
                View Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold mb-4">
          Everything You Need
        </h2>
        <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
          A complete operations layer between your AI applications and LLM
          providers. Control costs, enforce policies, and debug issues — all
          from one place.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 hover:bg-card-hover transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack Overview */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold mb-4">The Stack</h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            Five battle-tested open-source components, orchestrated with Docker
            Compose. No vendor lock-in, no SaaS dependencies.
          </p>
          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-6 py-3 text-left font-medium text-muted">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-muted">
                      Role
                    </th>
                    <th className="px-6 py-3 text-right font-medium text-muted">
                      Port
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {STACK.map((s, i) => (
                    <tr
                      key={s.name}
                      className={
                        i < STACK.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <td className="px-6 py-3 font-medium">{s.name}</td>
                      <td className="px-6 py-3 text-muted">{s.role}</td>
                      <td className="px-6 py-3 text-right font-mono text-accent">
                        {s.port}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Get the full stack running locally in under 5 minutes. Three
            commands — that&apos;s it.
          </p>
          <pre className="mx-auto max-w-lg text-left text-sm rounded-xl border border-border bg-card p-6 font-mono">
            <code>
              <span className="text-muted"># Clone & configure</span>
              {"\n"}git clone https://github.com/kelim19/ops-gateway{"\n"}
              cd ops-gateway{"\n"}cp .env.example .env{"\n\n"}
              <span className="text-muted"># Launch everything</span>
              {"\n"}docker compose up -d
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
