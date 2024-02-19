const shopContent = document.querySelector(".container__cards");
const cartContent = document.querySelector("#carrito");
const footer = document.querySelector(".dropFooter");
const templateFooter = document.querySelector("#templateFooter");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();

let cart = [];

const getProducts = async () => {

	const response = await fetch("../products.json");
	const data = await response.json();

	data.forEach((product) => {
		let content = document.createElement("div");
		content.className = "card";
		content.style.width = "18rem";
		content.innerHTML = `
		<img src="${product.img}" class="card-img-top">
		<div class="card-body">
          <h5 class="card-title">${product.tittle}</h5>
        </div>
		`;

		shopContent.append(content);

		let buyBtn = document.createElement("a");

		buyBtn.innerText = `$${product.price}`;
		buyBtn.className = "btn-card btn";

		content.append(buyBtn);

		if(cart.length === 0) {
			cartContent.innerHTML = `
		        <p class='emptyTxt' >Your Cart Is Empty</p>
			`
		}

		buyBtn.addEventListener("click", () => {
			cart.push({
				id: product.id,
				img: product.img,
				tittle: product.tittle,
				price: product.price,
				amount: product.amount,
			});

			Swal.fire({
				icon: "success",
				title: "We successfully save your purchase!",
			});

			cartContent.textContent = '';

			cart.forEach((product) => {
				let cartContain = document.createElement("li");
				cartContain.className = "";
				cartContain.innerHTML = `
				    <span class="lead">${product.tittle}</span>
				    <img class="img" id='cartImg' style="width: 120px; cursor: pointer; border-radius: 15px;" src="${product.img}">
					<span class="badge" id='dropPill'>${product.amount}</span>
					<h3 class='delete-button' >❌ Delete</h3>
					<div>
                        <button type="button" id='btnAdd' class="btn btn-outline-info">+</button>
                        <button type="button" id='btnDelete' class="btn btn-outline-danger">-</button>
                    </div>
					<hr>
				`;

			    cartContent.append(cartContain);
			});

			const total = cart.reduce((acc, item) => acc + item.price, 0);
		
		    const totalProduct = document.createElement('div');
		    totalProduct.className = 'textPrice'
		    totalProduct.innerHTML = `Total : $${total}`

		    cartContent.append(totalProduct);

			const shopBtn = document.createElement('h5');
			shopBtn.className = 'btnShop'
			shopBtn.innerHTML= 'Finalize Purchase'

			cartContent.append(shopBtn);
		});

		
	});
};

getProducts();
/*const agregarProducto = (e) => {
	const producto = {
		titulo : e.target.dataset.clothes,
		id : e.target.dataset.clothes,
		cantidad: 1,
		precio: parseInt(e.target.dataset.price),
		image: e.target.dataset.img,
	}
	
	const posicion = cart.findIndex(item => {
		return item.titulo === producto.titulo
	})
	if (posicion === -1) {
		cart.push(producto);
	} else {
		cart[posicion].cantidad++
	}
	
	mostrarcart()
};

const mostrarcart = () => {
	cartContent.textContent = ""

	cart.forEach ((item) => {
		const clone = template.content.cloneNode(true)
		
		clone.querySelector(`.img`).src = item.image;
		clone.querySelector(`.badge`).textContent = item.cantidad;
		clone.querySelector(`.list-group-item .lead`).textContent = item.titulo;
		clone.querySelector(`.spanPrice`).textContent = item.precio * item.cantidad
		
		clone.querySelector(`.btn-outline-info`).dataset.id = item.id;
		clone.querySelector(`.btn-outline-danger`).dataset.id = item.id;
		
		fragment.appendChild(clone)
	});

	cartContent.appendChild(fragment)

	mostrarFooter()
};

const mostrarFooter = () => {
	footer.textContent="";

	const total = cart.reduce ((acc, current) => {
		return acc + current.cantidad * current.precio
	}, 0);

	const clone = templateFooter.content.cloneNode(true)
	clone.querySelector(`.spn`).textContent = total;

	footer.appendChild (clone)
};

const btnAgregar = (e) => {
	cart = cart.map(item => {
		if (e.target.dataset.id === item.id) {
			item.cantidad++
		}
		return item
	})
	mostrarcart();
};

const btnQuitar = (e) => {
	cart = cart.filter(item => {
		if (e.target.dataset.id === item.id) {
			if (item.cantidad > 0){
				item.cantidad--;
				if (item.cantidad ===0) return
			}
			
		}
		return item
	});
	mostrarcart()
};

document.addEventListener(`click`, (e) => {
	if (e.target.matches('.btn-card')) {

		Swal.fire({
			icon: "success",
			title: "Congratulations!!",
			text: "we successfully save your purchase!",
		});

		
		agregarProducto(e)
		e.preventDefault()
	}

	if (e.target.matches('.btn-outline-info')) {
		btnAgregar(e)
	}

	if (e.target.matches('.btn-outline-danger')) {
		btnQuitar(e)
	}
});*/
