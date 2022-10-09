import axios from 'axios'
export default {
  async get(url, body = {}, headers={
    'Authorization': 'Basic YXBpa2V5OjViNTczZGEwNzA3NDU1ODliYjQxNjI1ZWEyNDdjOTJlNDhjMjI1MGQ1YzlmZmQwZGMxN2NhZWZhMjQzMDY3Y2Y='
  }) {
    return (await axios.get(url, body, headers))
  }
}
