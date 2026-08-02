export default function QuickStartPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Quick Start</h1>
      <p className="text-muted mb-12">
        Get the full Ops Gateway stack running locally in under 5 minutes.
      </p>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Docker", version: "24+", desc: "With Docker Compose v2" },
            { name: "Python", version: "3.11+", desc: "For provisioning scripts" },
            { name: "Git", version: "Any", desc: "To clone the repository" },
            { name: "API Key", version: "—", desc: "OpenAI and/or Anthropic" },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-medium">{p.name}</span>
                <span className="text-xs text-muted font-mono">{p.version}</span>
              </div>
              <p className="text-sm text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold mb-2">Setup Steps</h2>

        {/* Step 1 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
              1
            </span>
            <h3 className="font-semibold">Clone & Configure</h3>
          </div>
          <pre className="text-sm mb-3">
            <code>{`git clone https://github.com/kelim19/ops-gateway
cd ops-gateway
cp .env.example .env`}</code>
          </pre>
          <p className="text-sm text-muted">
            Edit <code>.env</code> and set your real API keys:
          </p>
          <pre className="text-sm mt-2">
            <code>{`# Required — at least one provider key
OPENAI_API_KEY=sk-your-real-key
ANTHROPIC_API_KEY=sk-ant-your-real-key

# Change these for security
POSTGRES_PASSWORD=your-strong-password
LITELLM_MASTER_KEY=sk-your-master-key
LANGFUSE_SECRET_KEY=sk-lf-your-secret
LANGFUSE_PUBLIC_KEY=pk-lf-your-public`}</code>
          </pre>
        </div>

        {/* Step 2 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
              2
            </span>
            <h3 className="font-semibold">Launch the Stack</h3>
          </div>
          <pre className="text-sm mb-3">
            <code>{`docker compose up -d`}</code>
          </pre>
          <p className="text-sm text-muted">
            This starts all 6 services: Postgres, ClickHouse, Redis, Langfuse
            Web, Langfuse Worker, and LiteLLM Proxy. Health checks ensure
            correct boot order — allow ~60 seconds for first startup.
          </p>
          <pre className="text-sm mt-2">
            <code>{`# Check all services are healthy
docker compose ps`}</code>
          </pre>
        </div>

        {/* Step 3 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
              3
            </span>
            <h3 className="font-semibold">Access the UIs</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-medium text-accent mb-1">
                LiteLLM Admin UI
              </div>
              <code className="text-sm text-muted">
                http://localhost:4000/ui
              </code>
              <p className="text-sm text-muted mt-2">
                View teams, keys, budgets, and spend. Login with your master
                key.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-medium text-success mb-1">Langfuse UI</div>
              <code className="text-sm text-muted">http://localhost:3000</code>
              <p className="text-sm text-muted mt-2">
                Inspect traces, prompts, tool calls, and token usage. Login with
                the init credentials from <code>.env</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
              4
            </span>
            <h3 className="font-semibold">Provision Teams & Keys</h3>
          </div>
          <pre className="text-sm mb-3">
            <code>{`pip install -r scripts/requirements.txt
python scripts/setup_gateway.py`}</code>
          </pre>
          <p className="text-sm text-muted">
            This creates two sample teams with budget limits and generates
            virtual API keys. Save the output — you&apos;ll need the keys for the
            next step.
          </p>
        </div>

        {/* Step 5 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
              5
            </span>
            <h3 className="font-semibold">Run the Agent Simulation</h3>
          </div>
          <pre className="text-sm mb-3">
            <code>{`export OPS_GATEWAY_API_KEY=sk-team-key-from-step-4
python scripts/test_agent_simulation.py`}</code>
          </pre>
          <p className="text-sm text-muted">
            Simulates a 3-step AI agent workflow with streaming. After it
            completes, check the Langfuse UI to see the full trace tree with
            prompts, outputs, and token counts.
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Troubleshooting</h2>
        <div className="space-y-4">
          {[
            {
              q: "Services won't start / health check failures",
              a: "Run docker compose logs <service> to check for errors. Ensure ports 3000 and 4000 are free. On first run, allow up to 2 minutes for database migrations.",
            },
            {
              q: "LiteLLM returns 401 Unauthorized",
              a: "Verify your LITELLM_MASTER_KEY in .env matches what you're using. For virtual keys, ensure you ran setup_gateway.py first.",
            },
            {
              q: "Traces not appearing in Langfuse",
              a: "Check that LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY match between LiteLLM and Langfuse config. Also verify the langfuse-worker container is running.",
            },
            {
              q: "Provider API errors (OpenAI/Anthropic)",
              a: "Ensure your provider API keys in .env are valid and have sufficient credits. Check LiteLLM logs: docker compose logs litellm.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-medium mb-2">{item.q}</h3>
              <p className="text-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
