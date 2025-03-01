from flask import Flask, request, jsonify, render_template
import sympy as sp
import requests

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/integrar", methods=["POST"])
def integrar():
    datos = request.json
    expresion = datos.get("funcion")
    a = float(datos.get("a"))
    b = float(datos.get("b"))
    
    x = sp.symbols('x')
    funcion = sp.sympify(expresion)
    area = sp.integrate(funcion, (x, a, b))
    
    return jsonify({"resultado": float(area)})

@app.route("/test_integrar", methods=["GET"])
def test_integrar():
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
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)