import axios from 'axios'

    const dogApi = axios.create({
      baseURL: 'https://api.thedogapi.com/v1',
      headers: {
        'x-api-key': process.env.DOG_API_KEY || 'live_QUc1jYKWDDpRFH2HdTNfVZMVLtdWN5R7W5X5K3WdLOERYoUbiuK2cPnKxhTUvdeP'
      }
    })

    const pixabayApi = axios.create({
      baseURL: 'https://pixabay.com/api',
      params: {
        key: process.env.PIXABAY_API_KEY || '48378802-72caf28c83fbe3c5978fec2e0'
      }
    })

    export { dogApi, pixabayApi }
