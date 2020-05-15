export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://web-notice-board-dev.herokuapp.com/'
    : 'http://localhost:3000';