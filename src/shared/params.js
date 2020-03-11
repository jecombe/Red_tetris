module.exports = {
  socket: {
    id: 'CLIENT',
  },
  server: {
    host: '10.3.7.4',
    port: 3000,
    get url() { return `http://${this.host}:${this.port}`; },
  },
};
