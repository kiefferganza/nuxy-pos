export default {
  methods: {
    setFallbackImage(event) {
      event.target.src = require('~/static/no-image.webp')
    },
  },
}
