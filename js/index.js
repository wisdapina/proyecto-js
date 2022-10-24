let carrito = [];
let productos = [];
const items = document.getElementById("items");
const articulos = document.getElementById("articulos");
const vaciar = document.getElementById("vaciar");

const datos = async () => {
  const data = await fetch("./stock.json");
  const dataJson = await data.json();
  const productos = dataJson;
  productos.forEach((element) => {
    const divProductos = document.createElement("div");
    divProductos.setAttribute(
      "class",
      "card col-lg-3 col-xs-12 m-10 p-10 text-center   mb-3" 
    );
    divProductos.innerHTML = `
          <img src=${element.img} class="card-img-top  imagen" alt="...">
    <div class="card-body">
    <h5 class="card-title">${element.nombre}</h5>
    <p class="card-text">${element.descr}</p>
    <p class="card-text">${element.precio}</p>
    
    
    <button type="button" id ="${element.id}" class="btn btn-dark">AGREGAR</button>
          
          
          `;
    articulos.appendChild(divProductos);

    const boton = document.getElementById(element.id);
    const productoEncontrado = productos.find(
      (product) => product.id == element.id
    );
    boton.onclick = () => {
      agregarcarrito(productoEncontrado);
     
    
    };

    function agregarcarrito(element) {
      let enCarrito = carrito.find((producto) => producto.id == element.id);

      if (!enCarrito) {
        carrito.push({ ...element, cantidad: 1 });
      } else {
        let carritoFiltrado = carrito.filter(
          (producto) => producto.id != element.id
        );
        carrito = [
          ...carritoFiltrado,
          { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
        ];
      }

      console.log(carrito);

      Toastify({
        text: `Has agregado ${element.nombre} al carrito`,
        className: "info",
        gravity: `top`,

        style: {
          background: "linear-gradient(to right, black, #708090",
        },
      }).showToast();

      mostrarCarrito();
    }

    function mostrarCarrito() {
      document.getElementById("agregar").innerHTML = "";
      let compra = 0;
      let totalCompra = 0;
      let compraFinal= 0;
      vaciar.onclick = () => {
        carrito = [];
        mostrarCarrito();
       compraFinal = 0
       
        
      
      };

      for (const element of carrito) {
        compra = element.precio * element.cantidad;
        totalCompra += compra;
        compraFinal = totalCompra   ;
        document.getElementById("agregar").innerHTML += `
    
     <table class="table table-secondary  row">
      <tbody class"text-center border justify-content-center col-lg-6 ">
      
          <tr class="text-center">
            <td >Producto</td>
            <td >${element.nombre}</td>
            <td >Precio</td>
            <td >$${element.precio}</td>
            <td >Cantidad</td>
            <td >${element.cantidad}</td>
            <td >Sub-Totales</td>
            <td >$${compra}</td>
           
            </tr>
      </tbody>
    </table>
     
      `;
    
      
    }
      function compratotal() {
        document.getElementById("compraTotal").innerHTML = `
      
      <h3> Compra total = $ ${compraFinal}</h3>
      `;
      }

      compratotal(compraFinal);
    }
  });
};

datos();
