import Api from '@/services/Api';
export default {

insertVolunteerSignup (event) {
    return Api().post('/event/'+ event._id + '/volunteersignup' , event.volunteersignup)
  },
  updateVolunteerSignup (event) {
    return Api().put ('/event/'+ event._id + '/volunteersignup', event.volunteersignup)
  },
  deleteVolunteerSignup (event) {
    return Api().delete('/event/'+ event.eventid + '/volunteersignup' + '/' + event.volunteersignupid)
  },
}