const exec = require('../db')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('', async (req, res) => {
  const sql = `SELECT * FROM group`
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
  const sql = `INSERT INTO group SET ?`
  const send = { success: true }
  try {
    await exec(sql, req.body)
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.send(send)
})

router.post('/reset', async (req, res) => {
  const sql = `DELETE FROM group`
  const send = { success: true }
  try {
    await exec(sql, req.body)
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.send(send)
})

module.exports = router;
