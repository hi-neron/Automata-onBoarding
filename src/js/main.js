"use strict"

let animals = []

function Animal (type, color, name) {
  this.type = type
  this.color = color
  this.name = name

  this.getColor = function () {
    console.log(this.color)
  }

}

animals.push(new Animal('lion', 'red', 'Drogo'))
animals.push(new Animal('lion', 'yellow', 'Dest'))

Animal.prototype.getName = function () {
  console.log(this.name)
}

Animal.prototype.addBirthday = function (day) {
  this.birthday = day
  console.log(`${this.name} added ${this.birthday} like a birthday's date`)
}

for(let i = 0; i < animals.length; i++){
  animals[i].getName()
  animals[i].addBirthday(i*2)
}

let my_object = new Object()

my_object = {
  first_name : {
    fist: 'pepe',
    second: 'lucho'
  },
  second_name : {
    fist: 'sanchez',
    second: 'castillo'
  },
  id : 12314
}

function changePlantName (specie, name) {
  if (name) {
    specie.name = name
  }
  console.log(specie)
}

let plant = {name: 'holipen', quantity: '2'}
changePlantName(plant, 'pepper')

// apply invocation pattern
// ejecuta una funcion pasando un contexto

let myArray = [1, 2, 4]

let add = function (a, b, c, d){
  return a + b * c / d
}

let data = add.apply(null, myArray)
console.log(data)

function paint (color) {
  console.log(blue)
  return `it was paint ${color} color`
}

let blue = 'prusianBlue'

function newColor () {
  let blue = 'darkBlue'
}

let toPrint = paint.apply(newColor, ['red'])
console.log(toPrint)

// ARGUMENTS
// parametro argumentos, contiene los argumentos que no fueron recibidos

function argu () {
  console.log(arguments)
}

argu('pepe', 'salio', true)

// EXCEPTIONS
// try catch

function pullError () {
  let result = 2
  let number
  try { // try to catch exceptions
    throw { // crea un error
      name: 'TypeError'
    }
  } catch (e) { // if an exceptions occurs, run next.
    console.log(e.name)
  }
}

pullError()

// Augmented types
// por medio del objecto prototype se puede agregar un metodo
// que ereden todos los demas tipos de objetos nativos,
// "recordemos que: Array, string, Number, etc" heredan de Function
Function.prototype.method = function (name, func) {
  this.prototype[name] = func
  return this
}

// de esta forma podemos llamar al metodo: method, para crear a cada
// funcion nativa, un nuevo metodo

Number.method('integer', function () {
  let toDo = this < 0 ? 'ceil' : 'floor'
  console.log(toDo)
  return Math[toDo](this)
})

document.writeln((-10 / 3).integer()) // -3

String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + " neat ".trim() + '"');

Array.method('first', function () {
  return this[0]
})

document.writeln('First number is ' + [2, 3, 4].first())

/*
hay que tene3r en cuenta que los prototipos de estructuras basicas
son publicas, se debe tener mucho cuidado con mezclar librerias.
Una tecnica para evitar sobreescrituras, es agregar los nuevos metodos
solo si el metodo ya no existe
*/

Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

// callbacks

function myCb (result, finished) {
  let print = result * 2
  finished(print)
}

function perimeter (a, b, c) {
  return a + b + c
}

function area (getArea) {
  let sides = getArea[0]
  let perimeter = getArea[1]
  let semiP = perimeter / 2
  let a = semiP - sides[0]
  let b = semiP - sides[1]
  let c = semiP - sides[2]
  console.log(a + ' : ' + b + ' : '+ c)
  let result = Math.abs(semiP * (a * b * c))
  result = Math.sqrt(result)
  return result
}

function triangle (data, result) {
  let perimeterResult = perimeter.apply(null, data)
  let getArea = []
  getArea.push(data)
  getArea.push(perimeterResult)
  let areaResult = area(getArea)
  result(perimeterResult, areaResult)
}

let result = triangle([3, 4, 5], (perimeter, area) => {
  console.log(`the triangle contour is ${perimeter} and area is ${area}`)
})
