import pytest
from unittest.mock import MagicMock
from langchain_core.messages import AIMessage


@pytest.fixture
def mock_llm_response():
    """Returns a standard mock AIMessage."""
    return AIMessage(content="I am a mock response.")


@pytest.fixture
def mock_search_response():
    """Returns a mock search result string."""
    return "[{'title': 'Test Result', 'body': 'This is a test search result.'}]"
