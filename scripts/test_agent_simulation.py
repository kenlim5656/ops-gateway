#!/usr/bin/env python3
"""Simulate a multi-step AI agent run through the Ops Gateway.

Sends three sequential LLM calls through the LiteLLM Proxy with
trace metadata headers, verifying that the gateway routes, streams,
and logs correctly.
"""

import os
import sys
import uuid

from openai import OpenAI
from rich.console import Console
from rich.panel import Panel
from rich.rule import Rule

GATEWAY_URL = os.getenv("LITELLM_GATEWAY_URL", "http://localhost:4000")
API_KEY = os.getenv("OPS_GATEWAY_API_KEY", "")
MODEL = os.getenv("OPS_GATEWAY_MODEL", "gpt-4o-mini")

console = Console()

AGENT_STEPS = [
    {
        "name": "Step 1 — User Query Analysis",
        "messages": [
            {
                "role": "system",
                "content": "You are an enterprise support agent. Analyze the user's request and identify the key issue. Respond in 2-3 sentences.",
            },
            {
                "role": "user",
                "content": "Our CI pipeline has been failing intermittently on the deployment stage for the last 3 days. The error mentions a timeout connecting to the container registry.",
            },
        ],
    },
    {
        "name": "Step 2 — Database Search (Simulated Tool Call)",
        "messages": [
            {
                "role": "system",
                "content": "You are an enterprise support agent with access to internal knowledge. Based on the previous analysis, suggest which internal systems to check and what the likely root cause is. Respond in 2-3 sentences.",
            },
            {
                "role": "user",
                "content": "The issue is intermittent CI deployment failures with container registry timeouts over the past 3 days. Simulate checking our incident database and network monitoring tools.",
            },
        ],
    },
    {
        "name": "Step 3 — Final Summary",
        "messages": [
            {
                "role": "system",
                "content": "You are an enterprise support agent. Provide a concise resolution summary with actionable next steps. Respond in 3-4 sentences.",
            },
            {
                "role": "user",
                "content": "Based on our investigation: the container registry has been experiencing DNS resolution delays during peak hours. Provide a summary and recommended actions for the engineering team.",
            },
        ],
    },
]


def main() -> None:
    if not API_KEY:
        console.print(
            "[red]Set OPS_GATEWAY_API_KEY to a virtual key from setup_gateway.py[/red]"
        )
        sys.exit(1)

    trace_id = str(uuid.uuid4())
    team_id = "support-engineering"
    app_id = "agent-simulation-test"

    console.print(
        Panel.fit(
            "[bold cyan]Ops Gateway — Agent Simulation[/bold cyan]",
            border_style="cyan",
        )
    )
    console.print(f"Gateway : [bold]{GATEWAY_URL}[/bold]")
    console.print(f"Model   : [bold]{MODEL}[/bold]")
    console.print(f"Trace ID: [dim]{trace_id}[/dim]")
    console.print()

    client = OpenAI(base_url=GATEWAY_URL, api_key=API_KEY)

    total_prompt_tokens = 0
    total_completion_tokens = 0

    for i, step in enumerate(AGENT_STEPS, 1):
        console.print(Rule(f"[bold]{step['name']}[/bold]"))

        chunks = []
        stream = client.chat.completions.create(
            model=MODEL,
            messages=step["messages"],
            stream=True,
            extra_headers={
                "X-Team-ID": team_id,
                "X-App-ID": app_id,
                "X-Trace-ID": trace_id,
            },
            stream_options={"include_usage": True},
        )

        console.print("[dim]Response:[/dim] ", end="")
        usage = None
        for chunk in stream:
            if chunk.usage:
                usage = chunk.usage
            if chunk.choices and chunk.choices[0].delta.content:
                text = chunk.choices[0].delta.content
                chunks.append(text)
                console.print(text, end="", highlight=False)

        console.print("\n")

        if usage:
            total_prompt_tokens += usage.prompt_tokens
            total_completion_tokens += usage.completion_tokens
            console.print(
                f"  [dim]Tokens — prompt: {usage.prompt_tokens}, "
                f"completion: {usage.completion_tokens}[/dim]"
            )

        if not chunks:
            console.print("[red]No response received — check gateway logs.[/red]")
            sys.exit(1)

        console.print(f"  [green]Step {i} complete.[/green]\n")

    console.print(Rule("[bold green]Simulation Complete[/bold green]"))
    console.print(f"Total tokens — prompt: {total_prompt_tokens}, completion: {total_completion_tokens}")
    console.print(f"\nView traces in Langfuse: [bold]http://localhost:3000[/bold]")
    console.print(f"Search for trace ID: [dim]{trace_id}[/dim]\n")


if __name__ == "__main__":
    main()
