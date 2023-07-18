const axios = require('axios')

axios.get('https://kind-ruby-elephant-tutu.cyclic.app/api/v1/posts')
    .then(response => {
        const data = response.data
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })