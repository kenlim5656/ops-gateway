#!/usr/bin/env python3
"""Provision teams and virtual API keys on the LiteLLM Proxy."""

import os
import sys

import httpx
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

GATEWAY_URL = os.getenv("LITELLM_GATEWAY_URL", "http://localhost:4000")
MASTER_KEY = os.getenv("LITELLM_MASTER_KEY", "sk-master-key-1234")

TEAMS = [
    {
        "team_alias": "support-engineering",
        "max_budget": 50.00,
        "budget_duration": "1mo",
        "models": ["gpt-4o", "gpt-4o-mini", "claude-sonnet-4", "claude-haiku-4"],
    },
    {
        "team_alias": "marketing-automation",
        "max_budget": 20.00,
        "budget_duration": "1mo",
        "models": ["gpt-4o-mini", "claude-haiku-4"],
    },
]

console = Console()


def create_team(client: httpx.Client, team: dict) -> dict:
    resp = client.post(f"{GATEWAY_URL}/team/new", json=team)
    resp.raise_for_status()
    return resp.json()


def generate_key(client: httpx.Client, team_id: str, team_alias: str) -> dict:
    resp = client.post(
        f"{GATEWAY_URL}/key/generate",
        json={
            "team_id": team_id,
            "key_alias": f"{team_alias}-default-key",
            "max_budget": None,
        },
    )
    resp.raise_for_status()
    return resp.json()


def main() -> None:
    console.print(
        Panel.fit(
            "[bold cyan]Ops Gateway — Team & Key Provisioning[/bold cyan]",
            border_style="cyan",
        )
    )
    console.print(f"Gateway: [bold]{GATEWAY_URL}[/bold]\n")

    headers = {"Authorization": f"Bearer {MASTER_KEY}"}
    results = []

    with httpx.Client(headers=headers, timeout=30) as client:
        # Verify connectivity
        try:
            health = client.get(f"{GATEWAY_URL}/health")
            health.raise_for_status()
        except httpx.HTTPError as exc:
            console.print(f"[red]Cannot reach gateway:[/red] {exc}")
            console.print("Make sure the stack is running: docker compose up -d")
            sys.exit(1)

        console.print("[green]Gateway is healthy.[/green]\n")

        for team_cfg in TEAMS:
            alias = team_cfg["team_alias"]
            console.print(f"Creating team [bold]{alias}[/bold] ...")
            team_resp = create_team(client, team_cfg)
            team_id = team_resp.get("team_id", "")

            console.print(f"Generating key for [bold]{alias}[/bold] ...")
            key_resp = generate_key(client, team_id, alias)
            virtual_key = key_resp.get("key", "")

            results.append(
                {
                    "team": alias,
                    "team_id": team_id,
                    "budget": f"${team_cfg['max_budget']:.2f}/mo",
                    "models": ", ".join(team_cfg["models"]),
                    "virtual_key": virtual_key,
                }
            )

    table = Table(title="Provisioned Teams & Keys", border_style="cyan")
    table.add_column("Team", style="bold")
    table.add_column("Team ID", style="dim")
    table.add_column("Budget")
    table.add_column("Models")
    table.add_column("Virtual Key", style="green")

    for r in results:
        table.add_row(
            r["team"],
            r["team_id"][:12] + "…",
            r["budget"],
            r["models"],
            r["virtual_key"],
        )

    console.print()
    console.print(table)
    console.print(
        "\n[bold yellow]Save these virtual keys![/bold yellow] "
        "Use them as the API key when calling the gateway.\n"
    )


if __name__ == "__main__":
    main()
