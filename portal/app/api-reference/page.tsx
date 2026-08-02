export default function ApiReferencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">API Reference</h1>
      <p className="text-muted mb-12">
        LiteLLM Proxy exposes an OpenAI-compatible API plus admin endpoints for
        key and team management.
      </p>

      {/* Chat Completions */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Chat Completions</h2>
        <p className="text-sm text-muted mb-4">
          All AI requests go through the standard OpenAI chat completions
          endpoint. Use any OpenAI-compatible SDK — just change the base URL and
          API key.
        </p>

        <div className="rounded-lg border border-border bg-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
              POST
            </span>
            <code className="text-sm">/chat/completions</code>
          </div>
          <pre className="text-sm">
            <code>{`curl http://localhost:4000/chat/completions \\
  -H "Authorization: Bearer sk-team-virtual-key" \\
  -H "Content-Type: application/json" \\
  -H "X-Team-ID: support-engineering" \\
  -H "X-App-ID: my-app" \\
  -H "X-Trace-ID: trace-abc-123" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'`}</code>
          </pre>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="font-medium mb-3">Python (OpenAI SDK)</h3>
          <pre className="text-sm">
            <code>{`from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000",
    api_key="sk-team-virtual-key",
)

response = client.chat.completions.create(
    model="claude-sonnet-4",
    messages=[{"role": "user", "content": "Hello!"}],
    extra_headers={
        "X-Team-ID": "support-engineering",
        "X-App-ID": "my-app",
        "X-Trace-ID": "trace-abc-123",
    },
)`}</code>
          </pre>
        </div>
      </section>

      {/* Metadata Headers */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Metadata Headers</h2>
        <p className="text-sm text-muted mb-4">
          Pass these headers with every request to enable per-team cost
          attribution and trace correlation in Langfuse.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Header
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Purpose
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  header: "X-Team-ID",
                  purpose: "Identifies the team for budget tracking",
                  example: "support-engineering",
                },
                {
                  header: "X-App-ID",
                  purpose: "Identifies the application or service",
                  example: "ticket-classifier",
                },
                {
                  header: "X-Trace-ID",
                  purpose:
                    "Correlation ID linking multi-step agent calls into one trace",
                  example: "trace-abc-123",
                },
              ].map((h, i, arr) => (
                <tr
                  key={h.header}
                  className={
                    i < arr.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-accent">
                    {h.header}
                  </td>
                  <td className="px-4 py-2.5 text-muted">{h.purpose}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted">
                    {h.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Admin Endpoints */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Admin Endpoints</h2>
        <p className="text-sm text-muted mb-6">
          These endpoints require the <code>LITELLM_MASTER_KEY</code> for
          authentication. Used by <code>setup_gateway.py</code> and the LiteLLM
          Admin UI.
        </p>

        <div className="space-y-4">
          {[
            {
              method: "POST",
              path: "/team/new",
              desc: "Create a new team with budget limits and model access controls.",
              body: `{
  "team_alias": "support-engineering",
  "max_budget": 50.00,
  "budget_duration": "1mo",
  "models": ["gpt-4o", "claude-sonnet-4"]
}`,
            },
            {
              method: "GET",
              path: "/team/list",
              desc: "List all teams with their current spend and budget status.",
              body: null,
            },
            {
              method: "POST",
              path: "/key/generate",
              desc: "Generate a new virtual API key scoped to a team.",
              body: `{
  "team_id": "team-uuid-here",
  "key_alias": "support-eng-default-key",
  "max_budget": null
}`,
            },
            {
              method: "GET",
              path: "/key/info",
              desc: "Get details about a virtual key including spend and permissions.",
              body: null,
            },
            {
              method: "POST",
              path: "/key/delete",
              desc: "Revoke a virtual API key immediately.",
              body: `{
  "keys": ["sk-team-key-to-revoke"]
}`,
            },
            {
              method: "GET",
              path: "/health",
              desc: "Health check endpoint. Returns 200 when the gateway is ready.",
              body: null,
            },
            {
              method: "GET",
              path: "/model/info",
              desc: "List all configured models with their routing details.",
              body: null,
            },
          ].map((ep) => (
            <div
              key={`${ep.method}-${ep.path}`}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded px-2 py-0.5 text-xs font-semibold ${
                    ep.method === "GET"
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {ep.method}
                </span>
                <code className="text-sm">{ep.path}</code>
              </div>
              <p className="text-sm text-muted mb-2">{ep.desc}</p>
              {ep.body && (
                <pre className="text-sm mt-3">
                  <code>{ep.body}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Rate Limits & Errors */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Error Codes</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Code
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Meaning
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  code: "401",
                  meaning: "Invalid API key",
                  action: "Check your virtual key or master key",
                },
                {
                  code: "403",
                  meaning: "Model not allowed for team",
                  action: "Add the model to the team's allowed list",
                },
                {
                  code: "429",
                  meaning: "Budget exceeded or rate limited",
                  action: "Increase team budget or wait for reset",
                },
                {
                  code: "500",
                  meaning: "Gateway internal error",
                  action: "Check LiteLLM logs for details",
                },
                {
                  code: "502",
                  meaning: "Provider unreachable",
                  action: "Verify provider API key and status",
                },
              ].map((e, i, arr) => (
                <tr
                  key={e.code}
                  className={
                    i < arr.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <td className="px-4 py-2.5 font-mono text-danger font-medium">
                    {e.code}
                  </td>
                  <td className="px-4 py-2.5">{e.meaning}</td>
                  <td className="px-4 py-2.5 text-muted">{e.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
