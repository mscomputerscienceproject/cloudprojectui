import axios from 'axios'

export default () => {
  var instance = axios.create({
    baseURL: 'https://marvelknights.herokuapp.com/api/',
  })
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = 'jkQAMQhNjVTD4v1OyeFz6zqS8nL2';
  return instance
}
