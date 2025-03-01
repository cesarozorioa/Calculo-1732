import requests

url = "http://127.0.0.1:5000/integrar"
data = {
    "funcion": "x**2",
    "a": 0,
    "b": 1
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
