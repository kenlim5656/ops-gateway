export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Architecture</h1>
      <p className="text-muted mb-12">
        How the components connect, what each service does, and how data flows
        from your AI applications through the gateway to observability.
      </p>

      {/* Architecture Diagram */}
      <div className="rounded-xl border border-border bg-card p-8 mb-12 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-6">System Overview</h2>
        <svg
          viewBox="0 0 900 520"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ minWidth: 600 }}
        >
          {/* Background */}
          <rect width="900" height="520" fill="transparent" />

          {/* AI Apps */}
          <rect x="30" y="20" width="180" height="60" rx="8" fill="#0e7490" opacity="0.3" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="120" y="45" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="600">AI Applications</text>
          <text x="120" y="62" textAnchor="middle" fill="#a1a1aa" fontSize="10">Agents, Apps, Copilots</text>

          {/* Arrow down */}
          <line x1="120" y1="80" x2="120" y2="130" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="135" y="110" fill="#a1a1aa" fontSize="9">API calls</text>

          {/* LiteLLM Box */}
          <rect x="30" y="130" width="180" height="100" rx="8" fill="#18181b" stroke="#06b6d4" strokeWidth="2" />
          <text x="120" y="158" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="600">LiteLLM Proxy</text>
          <text x="120" y="176" textAnchor="middle" fill="#a1a1aa" fontSize="10">:4000</text>
          <text x="120" y="196" textAnchor="middle" fill="#a1a1aa" fontSize="9">Key Auth • Rate Limits</text>
          <text x="120" y="210" textAnchor="middle" fill="#a1a1aa" fontSize="9">Budget • Model Routing</text>

          {/* Arrow right to providers */}
          <line x1="210" y1="180" x2="320" y2="100" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-warn)" />
          <line x1="210" y1="180" x2="320" y2="180" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-warn)" />

          {/* Provider boxes */}
          <rect x="320" y="70" width="150" height="50" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <text x="395" y="93" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600">OpenAI</text>
          <text x="395" y="107" textAnchor="middle" fill="#a1a1aa" fontSize="9">GPT-4o, GPT-4o-mini</text>

          <rect x="320" y="155" width="150" height="50" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <text x="395" y="178" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">Anthropic</text>
          <text x="395" y="192" textAnchor="middle" fill="#a1a1aa" fontSize="9">Claude Sonnet, Haiku, Opus</text>

          {/* Arrow down from LiteLLM to callbacks */}
          <line x1="120" y1="230" x2="120" y2="290" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#arrow-success)" />
          <text x="135" y="265" fill="#22c55e" fontSize="9">callbacks</text>

          {/* Langfuse section */}
          <rect x="20" y="290" width="460" height="210" rx="10" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <text x="250" y="315" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="600">Langfuse Observability Stack</text>

          {/* Langfuse Web */}
          <rect x="40" y="335" width="140" height="60" rx="6" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="110" y="360" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600">Langfuse Web</text>
          <text x="110" y="378" textAnchor="middle" fill="#a1a1aa" fontSize="10">:3000</text>

          {/* Langfuse Worker */}
          <rect x="200" y="335" width="140" height="60" rx="6" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="270" y="360" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600">Langfuse Worker</text>
          <text x="270" y="378" textAnchor="middle" fill="#a1a1aa" fontSize="10">Background</text>

          {/* ClickHouse */}
          <rect x="360" y="335" width="100" height="60" rx="6" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="410" y="360" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="600">ClickHouse</text>
          <text x="410" y="378" textAnchor="middle" fill="#a1a1aa" fontSize="9">Analytics</text>

          {/* Shared infra at bottom */}
          <rect x="40" y="420" width="200" height="55" rx="6" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="140" y="445" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="600">PostgreSQL 16</text>
          <text x="140" y="460" textAnchor="middle" fill="#a1a1aa" fontSize="9">Metadata • Keys • Spend</text>

          <rect x="260" y="420" width="100" height="55" rx="6" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <text x="310" y="445" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="600">Redis</text>
          <text x="310" y="460" textAnchor="middle" fill="#a1a1aa" fontSize="9">Queue • Cache</text>

          {/* Connections inside Langfuse */}
          <line x1="110" y1="395" x2="110" y2="420" stroke="#27272a" strokeWidth="1" />
          <line x1="270" y1="395" x2="270" y2="420" stroke="#27272a" strokeWidth="1" />
          <line x1="270" y1="395" x2="410" y2="395" stroke="#27272a" strokeWidth="1" />
          <line x1="410" y1="395" x2="410" y2="420" stroke="#27272a" strokeWidth="1" />
          <line x1="270" y1="410" x2="310" y2="420" stroke="#27272a" strokeWidth="1" />

          {/* Ops team */}
          <rect x="560" y="290" width="300" height="210" rx="10" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <text x="710" y="315" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="600">Ops Team Interfaces</text>

          <rect x="580" y="335" width="120" height="55" rx="6" fill="#09090b" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="640" y="358" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="600">LiteLLM UI</text>
          <text x="640" y="375" textAnchor="middle" fill="#a1a1aa" fontSize="9">Keys • Budgets • Teams</text>

          <rect x="720" y="335" width="120" height="55" rx="6" fill="#09090b" stroke="#22c55e" strokeWidth="1.5" />
          <text x="780" y="358" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="600">Langfuse UI</text>
          <text x="780" y="375" textAnchor="middle" fill="#a1a1aa" fontSize="9">Traces • Prompts • Evals</text>

          <rect x="580" y="410" width="260" height="55" rx="6" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="710" y="435" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="600">Mission Control Portal</text>
          <text x="710" y="452" textAnchor="middle" fill="#a1a1aa" fontSize="9">Docs • Architecture • Setup Guides</text>

          {/* Connection arrows */}
          <line x1="480" y1="365" x2="580" y2="365" stroke="#27272a" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-dim)" />

          {/* Arrow markers */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#06b6d4" />
            </marker>
            <marker id="arrow-warn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
            </marker>
            <marker id="arrow-success" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
            </marker>
            <marker id="arrow-dim" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#27272a" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Data Flow */}
      <div className="space-y-8 mb-12">
        <h2 className="text-xl font-semibold">Data Flow</h2>

        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Request Ingestion",
              desc: "AI applications send OpenAI-compatible API calls to the LiteLLM Proxy on port 4000. Each request includes a virtual API key and metadata headers (X-Team-ID, X-App-ID, X-Trace-ID).",
            },
            {
              step: "2",
              title: "Authentication & Budget Check",
              desc: "LiteLLM validates the virtual key against PostgreSQL, checks team budget limits, and verifies model access permissions. Requests exceeding budget are rejected with a 429 status.",
            },
            {
              step: "3",
              title: "Model Routing",
              desc: "Valid requests are routed to the configured LLM provider (OpenAI, Anthropic, etc.) using the real provider API key stored in the gateway configuration.",
            },
            {
              step: "4",
              title: "Response Streaming",
              desc: "The provider's response is streamed back to the client. Token usage is recorded and the team's spend counter is updated in PostgreSQL.",
            },
            {
              step: "5",
              title: "Async Telemetry",
              desc: "Out-of-band, the Langfuse callback forwards the full request/response span — including prompts, outputs, token counts, and latency — to Langfuse via the background worker.",
            },
            {
              step: "6",
              title: "Trace Storage",
              desc: "Langfuse Worker processes the span and stores metadata in PostgreSQL and analytical data in ClickHouse. Traces are immediately queryable in the Langfuse UI.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 rounded-lg border border-border bg-card p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Decisions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Design Decisions</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Shared PostgreSQL",
              desc: "A single Postgres instance serves both LiteLLM (key/spend storage) and Langfuse (metadata). Simplifies operations and reduces resource overhead for small-to-medium deployments.",
            },
            {
              title: "ClickHouse for Analytics",
              desc: "Langfuse uses ClickHouse for trace/span analytical queries. Columnar storage enables fast aggregations across millions of traces without impacting the transactional Postgres workload.",
            },
            {
              title: "Callback-Based Telemetry",
              desc: "LiteLLM forwards traces to Langfuse asynchronously via callbacks, not inline. This keeps request latency low and ensures observability doesn't impact production traffic.",
            },
            {
              title: "No Dynamic Callback Disabling",
              desc: "The allow_dynamic_callback_disabling: false setting prevents developers from bypassing observability per-request. Every call is traced — no exceptions.",
            },
            {
              title: "Virtual Keys Over Real Keys",
              desc: "Teams never see real provider API keys. Virtual keys are scoped, rate-limited, and budget-capped. Rotating provider keys requires zero changes to downstream applications.",
            },
            {
              title: "Docker Compose Orchestration",
              desc: "Health-check-gated depends_on ensures correct boot order. No external orchestrator needed for development or small production deployments.",
            },
          ].map((d) => (
            <div
              key={d.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
