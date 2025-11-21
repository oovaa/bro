import os
from typing import Annotated
from typing_extensions import TypedDict

from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

# NEW IMPORTS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_core.messages import SystemMessage


class State(TypedDict):
    messages: Annotated[list, add_messages]


def get_agent_graph():
    """
    Builds the LangGraph agent with Gemini 3 and Search.
    """

    # 1. Setup Tools
    search_tool = DuckDuckGoSearchResults(backend="news")
    tools = [search_tool]

    # 2. Setup LLM (Gemini 3)
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY environment variable is not set.")

    llm = ChatGoogleGenerativeAI(
        model="gemini-3-pro-preview",  # Latest model as of Nov 2025
        temperature=0.3,
        google_api_key=api_key,
        max_retries=2,
        # Gemini specific safety settings to prevent blocking innocent queries
        safety_settings={
            "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
            "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
            "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
            "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
        },
    )

    # Bind tools to the LLM
    llm_with_tools = llm.bind_tools(tools)

    # 3. Define Nodes
    def chatbot(state: State):
        return {"messages": [llm_with_tools.invoke(state["messages"])]}

    # 4. Build Graph
    graph_builder = StateGraph(State)

    graph_builder.add_node("chatbot", chatbot)
    graph_builder.add_node("tools", ToolNode(tools=tools))

    graph_builder.add_edge("tools", "chatbot")
    graph_builder.set_entry_point("chatbot")

    graph_builder.add_conditional_edges(
        "chatbot",
        tools_condition,
    )

    return graph_builder.compile()
