const exec = require('../db')
const express = require('express');
const router = express.Router();
const fs = require('fs')

const path = __dirname + '/group.json'
const getData = _ => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    err ? reject(err) : resolve(JSON.parse(data || null))
  })
})
const setData = data => new Promise((resolve, reject) => {
  fs.writeFile(path, JSON.stringify(data), 'utf-8', err => {
    err ? reject(err) : resolve()
  })
})

/* GET home page. */
router.get('', async (req, res) => {
  const send = { success: true }
  try {
    const data = await getData()
    send.data = data
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.json(send)
})

router.post('', async (req, res) => {
  const send = { success: true }
  try {
    const data = await setData(req.body)
    send.data = data
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.json(send)
})

router.post('/reset', async (req, res) => {
  const send = { success: true }
  try {
    const data = await setData([])
    send.data = data
  } catch (error) {
    send.success = false
    send.error = error
  }
  res.json(send)
})

module.exports = router;
