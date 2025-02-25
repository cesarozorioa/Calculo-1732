let funciones = [];

function agregarFuncion() {
    let input = document.getElementById("funcion").value;
    if (input && funciones.length < 5) {
        funciones.push(input);
        graficar2D();
    }
}

function graficar2D() {
    let datos = funciones.map(fx => ({
        x: math.range(-10, 10, 0.1)._data,
        y: math.range(-10, 10, 0.1)._data.map(x => math.evaluate(fx, { x }))
    }));
    
    let trazas = datos.map((data, i) => ({
        x: data.x,
        y: data.y,
        type: 'scatter',
        name: `f${i+1}(x)`
    }));
    
    Plotly.newPlot("grafica2D", trazas);
}

function convertir3D() {
    document.getElementById("grafica2D").style.display = "none";
    document.getElementById("grafica3D").style.display = "block";
    
    let x = math.range(-5, 5, 0.5)._data;
    let y = math.range(-5, 5, 0.5)._data;
    let z = x.map(xi => y.map(yi => math.evaluate(funciones[0], { x: xi, y: yi }) || 0));
    
    let traza3D = {
        x: x,
        y: y,
        z: z,
        type: 'surface'
    };
    
    Plotly.newPlot("grafica3D", [traza3D]);
}

function insertarSimbolo(simbolo) {
    document.getElementById("funcion").value += simbolo;
}

function capturarPantalla() {
    html2canvas(document.getElementById("grafica2D")).then(canvas => {
        let enlace = document.createElement("a");
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "grafica.png";
        enlace.click();
    });
}

function calcularArea(a, b) {
    let funcion = funciones[0];
    fetch('/integrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funcion, a, b })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("procedimiento").innerText = `Área: ${data.resultado}`;
    });
}