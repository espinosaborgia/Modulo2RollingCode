//La semilla que inicia nuestro sistema
//es decir los datos necesarios
//para que el sistema comience a funcionar  de 0

const INITIAL_ROLES = [
  {
    id: 1,
    description: "Cliente",
  },
  {
    id: 2,
    description: "Admin",
  },
 
];

const PRODUCTS = [
  {
    id: crypto.randomUUID(),
    name: "Queso Cremoso Rosalat",
    description: "Es un queso fresco, de pasta blanda, cerrada algo elástica y cremosa; de sabor ligeramente ácido y aroma suave.",
    price: 3500,
    picture:"https://www.rosalat.com.ar/wp-content/uploads/2017/08/DSC_5485.jpg",
    distributor: "Capo",
    quantity: 50,
    category:"QUESOS"
  },
  {
    id: crypto.randomUUID(),
    name: "Jamon Cocido La Piamontesa",
    description: "El jamón cocido es uno de los productos de charcutería más universales, pero también uno de los más desconocidos. Y no es más que el resultado de salar con salmuera, macerar y cocer la extremidad trasera del cerdo.",
    price: 4000,
    picture:"https://www.titanioshop.com.ar/Assets/img/productos/JAMON%20COCIDO%20PIAMONTESA.JPG",
    distributor: "Gomez Pardo",
    quantity: 29,
    category:"FIAMBRES"
  },
];

const ROLES_VALUES = {
  CLIENTE: 1,
  ADMIN: 2,
};

export { INITIAL_ROLES, ROLES_VALUES, PRODUCTS };
