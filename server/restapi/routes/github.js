const express = require('express')
const router = express.Router()
const qs = require('querystring')
const axios = require('axios')
const github = require('../../../client/github-grouping/src/github.json')


/* GET users listing. */
router.get('/auth', async (req, res) => {
  const { code } = req.query
  const { client_id, client_secret} = github
  const result = { success: true }
  try {
    const host = 'https://github.com/login/oauth/access_token'
    const r = await axios.post(host, {client_id, client_secret, code})
    const params = qs.parse(r.data)
    result.data = params
  } catch (error) {
    result.success = false
    result.error = error.stack
  }
  res.send(result)
})

router.get('/user', async (req, res) => {
  const { access_token } = req.query
  console.log(access_token)
  const result = { success: true }
  try {
    const host = 'https://api.github.com/user'
    const r = await axios.get(host, { headers: { "Authorization": `token ${access_token}` } })
    result.data = r.data
  } catch (error) {
    result.success = false
    result.error = error
  }
  res.send(result)
})

module.exports = router
