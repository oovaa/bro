from typer.testing import CliRunner
from bro.main import app
from unittest.mock import MagicMock

runner = CliRunner()


def test_cli_help():
    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    assert "Bro: Your Agentic AI Assistant" in result.stdout


def test_cli_ask_command(mocker):
    """Test 'bro ask' command."""
    # Mock the graph execution so we don't need API keys or stream handling
    mock_graph = MagicMock()
    mock_graph.stream.return_value = (
        []
    )  # Return empty async generator (mocking async is tricky in sync tests)

    # We patch get_agent_graph to return our mock
    mocker.patch("bro.main.get_agent_graph", return_value=mock_graph)

    # We also need to patch asyncio.run or the process_stream function since they are async
    mocker.patch("bro.main.process_stream", return_value="Final Answer")

    result = runner.invoke(app, ["ask", "What is 2+2?"])

    assert result.exit_code == 0
    # Since we mocked process_stream to return "Final Answer", check if it printed
    assert "Final Answer" in result.stdout
