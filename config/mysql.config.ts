import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'user_data',
    port:3306
})


const execute = (query: string, params: string[]) => {    
    return new Promise ((resolve, reject) =>{
        pool.query(query, params, (error, result) =>{
            if(error) { reject(error)} else { resolve(result)}
        })
    })
 }

export {execute}
