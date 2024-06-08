import {pool} from './database.js'

const getProductos = async() =>{
    const data = await pool.query('Select * from productos')
    return data.rows
}

const getProductosById = async(id) =>{
    const data = await pool.query('Select * from productos where id = $1',[id])
    return data.rows
}

const saveProducto = async(producto)=>{
    const query = 'INSERT INTO productos (nombre, precio) values ($1 ,$2)'
    const values = [producto.nombre,producto.precio]
    await pool.query(query,values)
    return producto
}

const updateProducto = async(producto , id)=>{
    const query = 'UPDATE productos SET nombre=$1, precio=$2 WHERE id=$3 '
    const values = [producto.nombre,producto.precio,id]
    await pool.query(query,values)
    return {... producto ,id}
}

export default {getProductos , getProductosById ,saveProducto, updateProducto}