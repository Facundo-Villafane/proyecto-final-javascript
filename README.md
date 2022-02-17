<div id="top"></div>

[![Facundo Villafañe][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://gojira3d.000webhostapp.com/images/Recurso-gojira-art.png" alt="Logo" width="80" height="80">


<h3 align="center">GOJIRA 3D</h3>

  <p align="center">
    Proyecto final del curso de JavaScript de CODERHOUSE
  </p>
</div>



## Sobre el proyecto

Reutilicé el HTML y el CSS que tenia de un [proyecto de un curso anterior de Desarrollo Web](https://gojira3d.000webhostapp.com/index.html), solo que a la pagina de 'productos' le añadí dinamismo con Javascript en la creaccion de un carrito de compras.

Los datos de los productos estan almacenados en un archivo JSON y son dibujados en el template. 

Cada vez que se da al boton comprar se dibuja un modal en la parte inferior mostrando, nombre, cantidad, precio y total de el producto o los productos, asi tambien se dibuja en el nav un contador en el icono de carrito.

Desde el modal se puede sumar o disminuir la cantidad de productos del carrito, como asi tambien, borrar todos los elementos del mismo. 
Los datos del carrito estan guardados en localStorage.

Utilicé tambien una libreria para dar estilo a los popup,al dar click en el icono del carrito del nav estando este vacio, aparecerá un popup de error, pero al contener al menos un elemento, procederá a 'procesar la compra' pidiendo los datos de envio. 


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/facundovillafane/
