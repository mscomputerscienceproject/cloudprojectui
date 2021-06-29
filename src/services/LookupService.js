import Api from '@/services/Api'

export default {
  getPrograms () {
    return Api().get('/lookup/getprograms')
  }
}