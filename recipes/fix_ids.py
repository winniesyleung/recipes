import re
with open('index.html', 'r') as f:
    content = f.read()

# Fix duplicate ID 17 - change Carbonara from ID 17 to 18
content = re.sub(
    r"(id: 17,\s*category: 'others',\s*url: 'https://www\.recipetineats\.com/carbonara/')",
    "id: 18,\n                category: 'others',\n                url: 'https://www.recipetineats.com/carbonara/'",
    content
)

# Also fix Bolognese if it's ID 18 - change to 19
content = re.sub(
    r"(id: 18,\s*category: 'others',\s*url: 'https://www\.recipetineats\.com/spaghetti-bolognese/')",
    "id: 19,\n                category: 'others',\n                url: 'https://www.recipetineats.com/spaghetti-bolognese/'",
    content
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed")

ids = re.findall(r'id:\s*(\d+)', content)
print(f"Recipe IDs: {ids}")
print(f"Total: {len(ids)}")
EOF