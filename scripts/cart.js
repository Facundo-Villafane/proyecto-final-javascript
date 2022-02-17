const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const procesarCompraBtn = document.getElementById('shopping-icon')
const countIcon = document.getElementById('countItem')
const finalizar2 = document.getElementById('shopping-icon2')
const fragment = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

procesarCompraBtn.addEventListener('click', e => {
    procesarPedido(e)
})



const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    //console.log(data)
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('span').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    console.log(e.target)
    console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {
        ...producto
    }
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-success').dataset.id = producto.id
        templateCarrito.querySelector('.btn-secondary').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))


}

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'

        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio



    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

    const pintarContador = () => {
        countIcon.innerHTML = ''
        if (Object.keys(carrito).length === 0) {
            countIcon.innerHTML = '0'
        } else {
            document.querySelector('.count-Item').textContent = nCantidad
        }
    }
    pintarContador()

}

const btnAccion = e => {
    //console.log(e.target)
    //sumar
    if (e.target.classList.contains('btn-success')) {
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {
            ...producto
        }
        pintarCarrito()
    }
    //restar
    if (e.target.classList.contains('btn-secondary')) {
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
            location.reload()
        }
        pintarCarrito()
        //
        
    }

    e.stopPropagation()
}


//const refreshCounter = e =>{
//    if ((Object.keys(carrito).length === 0) && (countIcon.innerHTML != '0')){
//        location.reload()
//    }
//}


function procesarPedido(e) {
    e.preventDefault()
    if (Object.keys(carrito).length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito esta vacio, agrega algun producto',
            showConfirmButton: false,
            width: 600,
        })
    } else {
        Swal.fire({
            title: 'Complete sus datos',
            html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre Completo"><br>
                    <input type="email" id="correo" class="swal2-input" placeholder="Email"><br>
                    <input type="text" id="dir" class= "swal2-input" placeholder="Dirección"><br>
                    <input type="text" id="tel" class= "swal2-input" placeholder= "Telefono">`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Su pedido llegará en 72hs', '¡Muchas Gracias!', 'success')
            } else if (result.isDenied) {
                Swal.fire('Su compra fue cancelada', '', 'info')
            }
        })
    }
}
