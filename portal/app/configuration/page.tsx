export default function ConfigurationPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Configuration</h1>
      <p className="text-muted mb-12">
        Environment variables, model routing, and gateway settings reference.
      </p>

      {/* Environment Variables */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Environment Variables</h2>
        <p className="text-sm text-muted mb-6">
          All variables are set in <code>.env</code> at the project root. Copy{" "}
          <code>.env.example</code> as a starting point.
        </p>

        {[
          {
            group: "PostgreSQL",
            vars: [
              {
                name: "POSTGRES_USER",
                default: "postgres",
                desc: "Database username",
              },
              {
                name: "POSTGRES_PASSWORD",
                default: "—",
                desc: "Database password (required, change from default)",
              },
              {
                name: "POSTGRES_DB",
                default: "opsgateway",
                desc: "Database name",
              },
            ],
          },
          {
            group: "Langfuse",
            vars: [
              {
                name: "LANGFUSE_SECRET_KEY",
                default: "—",
                desc: "Secret key for Langfuse API authentication",
              },
              {
                name: "LANGFUSE_PUBLIC_KEY",
                default: "—",
                desc: "Public key for client-side Langfuse SDK",
              },
              {
                name: "LANGFUSE_SALT",
                default: "—",
                desc: "Random string used for hashing",
              },
              {
                name: "NEXTAUTH_SECRET",
                default: "—",
                desc: "Secret for Langfuse session encryption",
              },
              {
                name: "NEXTAUTH_URL",
                default: "http://localhost:3000",
                desc: "Langfuse base URL",
              },
              {
                name: "LANGFUSE_INIT_USER_EMAIL",
                default: "admin@ops-gateway.local",
                desc: "Initial admin login email",
              },
              {
                name: "LANGFUSE_INIT_USER_PASSWORD",
                default: "—",
                desc: "Initial admin login password",
              },
            ],
          },
          {
            group: "LiteLLM",
            vars: [
              {
                name: "LITELLM_MASTER_KEY",
                default: "—",
                desc: "Admin API key for LiteLLM management endpoints",
              },
              {
                name: "LITELLM_SALT_KEY",
                default: "—",
                desc: "Salt for hashing virtual keys in the database",
              },
            ],
          },
          {
            group: "AI Providers",
            vars: [
              {
                name: "OPENAI_API_KEY",
                default: "—",
                desc: "Real OpenAI API key (never exposed to end users)",
              },
              {
                name: "ANTHROPIC_API_KEY",
                default: "—",
                desc: "Real Anthropic API key (never exposed to end users)",
              },
            ],
          },
          {
            group: "ClickHouse",
            vars: [
              {
                name: "CLICKHOUSE_USER",
                default: "default",
                desc: "ClickHouse username",
              },
              {
                name: "CLICKHOUSE_PASSWORD",
                default: "—",
                desc: "ClickHouse password",
              },
            ],
          },
        ].map((section) => (
          <div key={section.group} className="mb-8">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              {section.group}
            </h3>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-4 py-2.5 text-left font-medium text-muted">
                      Variable
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted">
                      Default
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section.vars.map((v, i) => (
                    <tr
                      key={v.name}
                      className={
                        i < section.vars.length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    >
                      <td className="px-4 py-2.5 font-mono text-xs">
                        {v.name}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted">
                        {v.default}
                      </td>
                      <td className="px-4 py-2.5 text-muted">{v.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* Model Routing */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Model Routing</h2>
        <p className="text-sm text-muted mb-6">
          Models are defined in <code>config/litellm_config.yaml</code>. Each
          entry maps a friendly model name to a provider-specific model ID.
        </p>

        <div className="rounded-xl border border-border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Model Name
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Provider
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-muted">
                  Provider Model ID
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "gpt-4o",
                  provider: "OpenAI",
                  id: "openai/gpt-4o",
                },
                {
                  name: "gpt-4o-mini",
                  provider: "OpenAI",
                  id: "openai/gpt-4o-mini",
                },
                {
                  name: "claude-sonnet-4",
                  provider: "Anthropic",
                  id: "anthropic/claude-sonnet-4-20250514",
                },
                {
                  name: "claude-haiku-4",
                  provider: "Anthropic",
                  id: "anthropic/claude-haiku-4-5-20251001",
                },
                {
                  name: "claude-opus-4",
                  provider: "Anthropic",
                  id: "anthropic/claude-opus-4-20250514",
                },
              ].map((m, i, arr) => (
                <tr
                  key={m.name}
                  className={
                    i < arr.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-accent">
                    {m.name}
                  </td>
                  <td className="px-4 py-2.5 text-muted">{m.provider}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted">
                    {m.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="font-medium mb-2">Adding a New Model</h3>
          <p className="text-sm text-muted mb-3">
            Add an entry to the <code>model_list</code> in{" "}
            <code>config/litellm_config.yaml</code>:
          </p>
          <pre className="text-sm">
            <code>{`- model_name: my-custom-model
  litellm_params:
    model: provider/model-id
    api_key: os.environ/MY_PROVIDER_KEY`}</code>
          </pre>
          <p className="text-sm text-muted mt-3">
            Then restart the LiteLLM container:{" "}
            <code>docker compose restart litellm</code>
          </p>
        </div>
      </section>

      {/* Gateway Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Gateway Settings</h2>
        <div className="space-y-4">
          {[
            {
              setting: "callbacks: [\"langfuse\"]",
              desc: "All requests are forwarded to Langfuse for tracing. Telemetry is sent asynchronously to avoid impacting request latency.",
            },
            {
              setting: "allow_dynamic_callback_disabling: false",
              desc: "Prevents clients from disabling callbacks per-request. Ensures 100% trace coverage — no developer can bypass observability.",
            },
            {
              setting: "drop_params: true",
              desc: "Strips LiteLLM-specific parameters before forwarding to providers. Prevents errors from unsupported parameters.",
            },
            {
              setting:
                "request_headers_to_passthrough: [X-Team-ID, X-App-ID, X-Trace-ID]",
              desc: "These HTTP headers are captured as metadata on each trace. Use them to attribute costs and filter traces by team, application, or correlation ID.",
            },
          ].map((s) => (
            <div
              key={s.setting}
              className="rounded-lg border border-border bg-card p-5"
            >
              <code className="text-sm text-accent">{s.setting}</code>
              <p className="text-sm text-muted mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
