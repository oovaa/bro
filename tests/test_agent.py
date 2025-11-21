import pytest
from unittest.mock import MagicMock
from langchain_core.messages import HumanMessage, AIMessage

# Import the graph builder
from bro.agent import get_agent_graph


def test_agent_initialization(mocker):
    """Test if the graph builds correctly with mocked API key."""
    mocker.patch.dict("os.environ", {"GOOGLE_API_KEY": "fake_key"})
    graph = get_agent_graph()
    assert graph is not None


def test_agent_simple_chat_flow(mocker, mock_llm_response):
    """
    Test the most basic flow: User says hi -> LLM responds.
    We mock ChatGoogleGenerativeAI so no API calls happen.
    """
    mocker.patch.dict("os.environ", {"GOOGLE_API_KEY": "fake_key"})

    # Mock the Google model inside the agent module
    mock_model = MagicMock()
    mock_model.bind_tools.return_value.invoke.return_value = mock_llm_response

    # Patch the class to return our mock instance
    mocker.patch("bro.agent.ChatGoogleGenerativeAI", return_value=mock_model)

    graph = get_agent_graph()

    # Run the graph
    input_msg = HumanMessage(content="Hello")
    result = graph.invoke({"messages": [input_msg]})

    # Assertions
    assert len(result["messages"]) == 2
    assert result["messages"][-1].content == "I am a mock response."


def test_agent_search_trigger(mocker):
    """
    Test if the agent can determine it needs to use a tool.
    We mock the LLM to return a 'tool_call' message.
    """
    mocker.patch.dict("os.environ", {"GOOGLE_API_KEY": "fake_key"})

    # Create a message that signifies a tool call
    tool_call_msg = AIMessage(
        content="",
        tool_calls=[
            {
                "name": "duckduckgo_results_json",
                "args": {"query": "python"},
                "id": "123",
            }
        ],
    )

    # Mock LLM
    mock_model = MagicMock()
    mock_model.bind_tools.return_value.invoke.return_value = tool_call_msg
    mocker.patch("bro.agent.ChatGoogleGenerativeAI", return_value=mock_model)

    # Mock Search Tool
    mocker.patch(
        "bro.agent.DuckDuckGoSearchResults.invoke", return_value="Search Results Found"
    )

    graph = get_agent_graph()

    # Run one step
    result = graph.invoke({"messages": [HumanMessage(content="Search for Python")]})

    # The graph should have: User -> AI (Tool Call) -> Tool Node -> AI (Final Answer)
    # Note: In a real run, the LLM would be called again after the tool.
    # Since we mocked the LLM to *always* return a tool call, this might loop if not handled,
    # but standard invoke runs until end.

    assert len(result["messages"]) >= 3
    # Verify a tool message exists
    assert result["messages"][-2].type == "tool"
