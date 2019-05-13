const exec = require('../db')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:room', async (req, res) => {
  const sql = `SELECT * FROM chat where room = ${req.params.room}`
  const send = { success: true }
  try {
    send.data = await exec(sql)
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.send(send)
})

router.post('', async (req, res) => {
  const sql = `INSERT INTO chat SET ?`
  const send = { success: true }
  delete req.body.idx
  try {
    await exec(sql, req.body)
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.send(send)
})

module.exports = router;
