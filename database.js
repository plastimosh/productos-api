import pg from 'pg'

const {Pool} = pg
const pool = new Pool({
    connectionString:'postgres://default:Xe3qCLIxo5hm@ep-lively-feather-a4nw3nse.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
})

const conectar = () =>{
    pool.connect().then(()=>{
        console.log('Conectado con exito a la BD')
    }).catch((e)=>{
        console.log('Error al conectar:',e)
    })
}

export default conectar;
export {pool}