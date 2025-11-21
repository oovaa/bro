import os
import typer
import asyncio
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.live import Live
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

from bro.agent import get_agent_graph

# Load env vars
load_dotenv(os.path.expanduser("~/.bro_config"))

app = typer.Typer(help="Bro: Your Agentic AI Assistant")
console = Console()


def print_stream(graph, user_input: str, thread_id: str = "default"):
    config = {"configurable": {"thread_id": thread_id}}

    # Use a Spinner to show activity
    with Live(console=console, refresh_per_second=10) as live:
        live.update(Panel("Thinking...", title="Gemini 3", border_style="blue"))

        try:
            async_generator = graph.stream(
                {"messages": [HumanMessage(content=user_input)]},
                config=config,
                stream_mode="updates",
            )

            messages_batch = asyncio.run(process_stream(async_generator, live))

            if messages_batch:
                live.stop()
                console.print(Markdown(messages_batch))

        except Exception as e:
            live.update(Panel(f"[red]Error: {str(e)}[/red]", title="Error"))


async def process_stream(generator, live_display):
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


@app.command()
def interactive():
    """Start an interactive chat session."""
    console.clear()
    console.print(
        Panel.fit(
            "[bold cyan]Bro - Gemini 3 Agent[/bold cyan]\n[dim]Powered by Google GenAI & LangGraph[/dim]",
            border_style="cyan",
        )
    )

    try:
        graph = get_agent_graph()
    except ValueError as e:
        console.print(f"[red]{e}[/red]")
        console.print("Please run [bold]./install <GOOGLE_API_KEY>[/bold] first.")
        raise typer.Exit()

    while True:
        try:
            user_input = console.input("[bold green]You > [/bold green]").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit"]:
                break

            print_stream(graph, user_input)
            console.print()

        except KeyboardInterrupt:
            break


@app.command()
def ask(question: str):
    """Ask a single question."""
    try:
        graph = get_agent_graph()
        print_stream(graph, question)
    except Exception as e:
        console.print(f"[red]Error: {e}[/red]")


if __name__ == "__main__":
    app()
