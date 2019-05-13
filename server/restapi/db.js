const mysql = require('mysql')

// variable setting
const pool = mysql.createPool({
  host: '183.99.229.179',
  port: '3306',
  user: 'ey',
  password: 'eksrnr32!',
  database: '20190513',
  charset: 'utf8',
  connectionLimit: 50,
  waitForConnections: true
})

const query = (sql, bind) => new Promise((resolve, reject) => {
  pool.getConnection((connectErr, con) => {
    if (connectErr) {
      console.log("Connect Error || " + connectErr.stack)
      reject(connectErr.stack)
      con.release()
      return
    }
    con.query(sql, bind, (queryErr, result) => {
      console.log("SQL::: " + sql) //for test
      if (queryErr) {
        console.log("Query Error || " + queryErr.stack)
        reject(queryErr.stack)
      } else {
        resolve(result)
      }
      con.release()
    })
  })
})

module.exports = query