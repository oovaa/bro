from langchain_community.tools import DuckDuckGoSearchResults

search = DuckDuckGoSearchResults(description="use english to answer")

print(search.invoke("Obama"))
