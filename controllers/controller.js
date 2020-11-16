"use strict";
let arrayCar = [];
const formCar = document.getElementById("formCar");
const formWheels = document.getElementById("formWheels");
formCar.addEventListener('submit', (e) => {
    e.preventDefault();
    let plate = document.forms[0]["plate01"];
    let brand = document.forms[0]["brand"];
    let color = document.forms[0]["color"];
    let plateExp = /^\d{4}[a-zA-Z]{3}$/;
    let validator = true;
    if (!plateExp.test(plate.value)) {
        alert("Ingresa un numero de placa valido.");
        validator = false;
    }
    arrayCar.forEach((car) => {
        if (car.plate == plate.value) {
            alert("La placa ingresada ya existe.");
            validator = false;
        }
    });
    if (validator) {
        createCar(plate.value, brand.value, color.value);
        formCar.reset();
    }
});
function createCar(plate, brand, color) {
    let car = new Car(plate, color, brand);
    arrayCar.push(car);
    // car.addWheel(new Wheel(2,"SEAT"));
}
formWheels.addEventListener("submit", (e) => {
    e.preventDefault();
    const plate = document.forms[1]["plate02"];
    const xcar = arrayCar.find((car) => car.plate === plate.value);
    let count = 0;
    let i = 1, j = 2;
    let wheel;
    if (xcar == undefined) {
        alert("La placa introducida, NO esta registrada.");
    }
    else if (xcar.wheels.length == 4) {
        alert("Los valores actuales se sobreescribiran si todos los datos actuales son correctos.");
        count = validator(count);
    }
    else {
        count = validator(count);
    }
    if (count == 4) {
        xcar.wheels.length = 0;
        for (i = 1; i < 8;) {
            wheel = new Wheel(formWheels[i].value, Number(formWheels[j].value));
            xcar.addWheel(wheel);
            i += 2;
            j += 2;
        }
    }
    else if (count < 4 && count != 0) {
        alert("Revisa que los diametros de las llantas sean correctos.");
    }
});
function showCars() {
    let data = "";
    if (arrayCar.length > 0) {
        arrayCar.forEach((element) => {
            data += `Registro de coche activo placa ${element.plate} `;
        });
        document.getElementById("data").innerText = data;
    }
    else {
        alert("No hay ningun coche introducido");
    }
}
function showCar() {
    let data = "";
    let plate = prompt("Ingresa en numero placa del coche a consultar.");
    const xcar = arrayCar.find((car) => car.plate === plate);
    if (xcar == undefined) {
        alert("No hay registros del coche Ingresado.");
    }
    else {
        data = `Los datos del coche son 
                        Numero de placa: ${xcar.plate} Marca: ${xcar.brand} color: ${xcar.color}
                        Marca llanta 1: ${xcar.wheels[0].brand}  Diametro llanta 1: ${xcar.wheels[0].diameter}
                        Marca llanta 2: ${xcar.wheels[1].brand}  Diametro llanta 2: ${xcar.wheels[1].diameter}
                        Marca llanta 3: ${xcar.wheels[2].brand}  Diametro llanta 3: ${xcar.wheels[2].diameter}
                        Marca llanta 4: ${xcar.wheels[3].brand}  Diametro llanta 4: ${xcar.wheels[3].diameter}
                `;
    }
    document.getElementById("data").innerText = data;
}
function validator(count) {
    const inputs = document.querySelectorAll("#formWheels input[name='diametro']");
    inputs.forEach((input) => {
        if (input.value >= 0.4 && input.value <= 2) {
            count++;
        }
        else {
            count--;
        }
    });
    return count;
}
