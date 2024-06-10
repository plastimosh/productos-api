//Importamos express
import express from 'express'
import conectar,{pool} from './database.js';
import services from './services.js';
import cors from 'cors'

//Se crea el objeto app que funciona como servidor express
const app = express();

//Middleware
app.use(express.json())
app.use(cors())

const productos =[
    {"id":5,"nombre":"Producto 1",precio:123},
    {"id":10,"nombre":"Producto 2",precio:456},
    {"id":3,"nombre":"Producto 3",precio:789}

]

//El endpoint tiene una ruta (nombre) y dos parametros(request, response)
app.get('/productos', async (req , res) =>{
    const data = await services.getProductos()
    res.status(200).json(data)
})

app.get('/productos/:id', async(req , res) =>{
    const id = req.params.id
    const producto = await services.getProductosById(id)
    res.status(200).send(producto)
})

app.post('/productos',async(req,res) =>{
    const producto = req.body
    //productos.push(producto)
   await services.saveProducto(producto)
    res.status(201).json(producto)
})

app.put('/productos/:id',async (req ,res) =>{
    const id = req.params.id
    const producto = req.body
    //const posicion = productos.findIndex(p => p.id == id)
    //productos[posicion] = { id:id , nombre:producto.nombre ,precio:producto.precio}
    const productoUpdated = await services.updateProducto(producto ,id)

    res.status(200).json(productoUpdated)
})

app.delete('/productos/:id',(req ,res) =>{
    const id = req.params.id
    const posicion = productos.findIndex(p => p.id == id)
    productos.splice(posicion,1)
    res.status(200).send('Registro eliminadocon exito')
})

const port=3800
conectar()

//Agregando puerto a la app
app.listen(port,()=>{
    console.log('Servior escuchando por el puerto:',port)
})