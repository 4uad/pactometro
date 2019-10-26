# Pactómetro

En vista de la cada vez más complicada realidad parlamentaria y del éxito generalizado de los pactómetros en prensa digital, he decidido crear un pactómetro en ReactJS. Es totalmente configurable para adaptarse a cualquier aritmética parlamentaria. Además, permite guardar y compartir fácilmente cualquier pacto, ya que almacena los votos en tiempo real en la URL.

Es posible probar el pactómetro con el resultado de las últimas elecciones generales en [Heroku](https://guarded-waters-59432.herokuapp.com/).

## Variables

- ``parties`` Permite definir, en formato JSON, los partidos existentes en la cámara.
  - ``key`` Abreviatura para el partido (utilizada en la URL).
  - ``party`` Nombre del partido (se muestra al usuario).
  - ``ideology`` Ideología del partido como número entero. Se utiliza para ordenar los escaños en la cámara. Cuando menor sea, más a la izquierda de la cámara se situará el partido.
  - ``seats`` Número de escaños asignados al partido
  - ``color`` Color del partido en cualquier formato CSS (hexadecimal, rgb, hsl...)
  - ``vote`` Voto por defecto
    - ``true`` Sí
    - ``false`` No
    - ``null`` Abstención
  - ``logo`` URL del logotipo
- ``rowCount`` Número de filas a mostrar en el parlamento
- ``seatCount`` Número de escaños a mostrar en el parlamento

## Desarrollado con

* [ReactJS](https://es.reactjs.org/) - Framework
* [react-draggable](https://www.npmjs.com/package/react-draggable) - Librería Reactjs para elementos arrastables

## Autores

* **Diego Martín** - *Desarrollo de la primera versión estable* - [4uad](https://github.com/4uad)

## Licencia

Este proyecto tiene licencia MIT
