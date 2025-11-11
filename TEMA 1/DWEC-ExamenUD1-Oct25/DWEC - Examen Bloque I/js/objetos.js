// =====================
//   ELECTRODOMESTICO
// =====================
class Electrodomestico 
    {
        #nombre;
        #precio;

        constructor(nombre, precio) 
            {
                this.#nombre = nombre;
                this.#precio = precio;
            }
    
        get nombre()
            {
                return this.#nombre;
            }

        get precio()
            {
                return this.#precio;
            }

        set precio(precio)
            {
                this.#precio = precio;
            }
        
        toString()
            {
                return this.nombre + '' + this.precio;
            }
    }

// =====================
//       LAVADORA
// =====================
class Lavadora extends Electrodomestico
    {
        #carga;

        constructor(nombre, precio, carga) 
            {
                super(nombre, precio,);
                this.#carga = carga;
            }
        
        get carga()
            {
                return this.#carga;
            }

        set carga(carga)
            {
                this.#carga = carga;
            }
        
        toHTMLRow() 
            {
                let fila = super.toString();
                fila += `<td>${this.carga} kg</td></tr>`;
                return fila;
            }
    }

// =====================
//      TELEVISOR
// =====================
class Televisor extends Electrodomestico
    {
        #pulgadas;
        #fullHD;

        constructor(nombre, precio, pulgadas, fullHD) 
            {
                super(nombre, precio);
                this.#pulgadas = pulgadas;
                this.#fullHD = fullHD;
            }
        
        get pulgadas()
            {
                return this.#pulgadas;
            }

        set pulgadas(pulgadas)
            {
                this.#pulgadas = pulgadas;
            }
        
        get fullHD()
            {
                return this.#fullHD;
            }

        set fullHD(fullHD)
            {
                this.#fullHD = fullHD;
            }
        
        toHTMLRow() 
            {
                let fila = super.toString();
                fila += `<td>${this.pulgadas}</td>
                        <td>${this.fullHD}</td></tr>`;
                return fila;
            }
    }

// =====================
//    STOCK PRODUCTO
// =====================
class StockProducto
    {
        #producto;
        #stock;

        constructor(producto, stock)
            {
                this.#producto = producto;
                this.#stock = stock;
            }

        get producto()
            {
                return this.#producto;
            }
        
        set producto(producto)
            {
                this.#producto = producto;
            }
        
        get stock()
            {
                return this.#stock;
            }
        
        set stock(stock)
            {
                this.#stock = stock;
            }

        toHTMLRow() 
            {
                let fila = super.toString();
                fila += `<td>${this.stock}</td></tr>`;
                return fila;
            }

    }

// =====================
//       ALMACEN
// =====================
class Almacen
    {
        #catalogo;
        #stock;

        constructor()
            {
                this.#catalogo = [];
                this.#stock = [];
            }

        get catalogo()
            {
                return this.#catalogo;
            }

        set catalogo(catalogo)
            {
                this.#catalogo = catalogo;
            }
        
        get stock()
            {
                return this.#stock;
            }

        set stock(stock)
            {
                this.#stock = stock;
            }
        
        altaProducto(catalogo) 
            {
                const existe = this.catalogo.some(p => p.catalogo === producto.catalogo);
                if (!existe) 
                    {
                        this.catalogo.push(catalogo);
                        return true;
                    }
                return false;
            }

    }