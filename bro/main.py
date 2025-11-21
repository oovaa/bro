import os
import typer
import asyncio
from typing import Optional
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.live import Live
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

from bro.agent import get_agent_graph

# Load env vars
load_dotenv(os.path.expanduser("~/.bro_config"))

# We use add_completion=False to keep the help output clean
app = typer.Typer(add_completion=False)
console = Console()


async def process_stream(generator, live_display):
    """Helper to process the async stream from LangGraph."""
    final_text = ""
    async for update in generator:
        for node, values in update.items():
            if node == "chatbot":
                message = values["messages"][-1]
                if message.tool_calls:
                    tool_names = ", ".join([t["name"] for t in message.tool_calls])
                    live_display.update(
                        Panel(
                            f"[yellow]Searching: {tool_names}...[/yellow]",
                            title="Gemini 3 🧠",
                            border_style="yellow",
                        )
                    )
                else:
                    final_text = message.content
            elif node == "tools":
                live_display.update(
                    Panel(
                        f"[green]Processing Search Results...[/green]",
                        title="Gemini 3 🔎",
                        border_style="green",
                    )
                )
    return final_text


def run_query(question: str):
    """Runs a single query and prints the output."""
    try:
        graph = get_agent_graph()

        # Use a Live display for the spinner
        with Live(console=console, refresh_per_second=10) as live:
            live.update(Panel("Thinking...", title="Gemini 3", border_style="blue"))

            async_generator = graph.stream(
                {"messages": [HumanMessage(content=question)]}, stream_mode="updates"
            )

            # Run async loop
            messages_batch = asyncio.run(process_stream(async_generator, live))

            if messages_batch:
                live.stop()
                console.print(Markdown(messages_batch))

    except ValueError as e:
        console.print(f"[red]Configuration Error:[/red] {e}")
        console.print("Run [bold]./install <API_KEY>[/bold] to fix.")
    except Exception as e:
        console.print(f"[red]Error:[/red] {e}")


def run_interactive():
    """Runs the interactive chat loop."""
    console.clear()
    console.print(
        Panel.fit(
            "[bold cyan]Bro - Gemini 3 Agent[/bold cyan]\n[dim]Powered by Google GenAI & LangGraph[/dim]",
            border_style="cyan",
        )
    )

    try:
        # Initialize graph once to check config
        get_agent_graph()
    except ValueError as e:
        console.print(f"[red]{e}[/red]")
        return

    while True:
        try:
            user_input = console.input("[bold green]You > [/bold green]").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit"]:
                console.print("[dim]Goodbye![/dim]")
                break

            run_query(user_input)
            console.print()

        except KeyboardInterrupt:
            console.print("\n[dim]Goodbye![/dim]")
            break


@app.command()
def main(
    question: Optional[str] = typer.Argument(
        None, help="Optional question to ask immediately."
    )
):
    """
    Bro: Your Agentic AI Assistant.

    Run without arguments for Interactive Mode.
    Run with a question for Immediate Mode.
    """
    if question:
        run_query(question)
    else:
        run_interactive()


if __name__ == "__main__":
    app()
