import Api from '@/services/Api'

export default {
  index () {
    return Api().get('/member/getmembership')
  },
  getmembershipbyid (id) {
    return Api().get(`/member/getmembershipbyid/${id}`)
  },
  KidsByFamilyId(id) {
    return Api().get(`/kids/getByFamilyId/${id}`)
  },
  spouseByFamilyId(id) {
    return Api().get(`/spouse/getByFamilyId/${id}`)
  },
  getmemberbyemailAddress (id) {
    return Api().get(`/getmemberbyemail/${id}`)
  },
  getCategory () {
    return Api().get(`/categorylist`)
  },
  getCategory1() {
    return Api().get(`/categorylist`)
  },
  getmemberbyemail (id) {
    return Api().get(`/member/getmemberbyemail/${id}`)
  },
  addmembership (comment) {
    return Api().post('/member/addmembership', comment)
  },
  updatemembership (comment) {
    return Api().post('/member/updatemembership', comment)
  },
  deletemembership (id) {
    return Api().post(`/member/deletemembership/${id}`)
  },
  getConfigData () {
    return Api().get('/getConfigData')
  },
  addrole (comment) {
    return Api().post('/addrole', comment)
  },
  getrolebyid (id) {
    return Api().get(`/getrolebyid/${id}`)
  },
  getRoleByEmail (email) {
    return Api().get(`/getRoleByEmail/${email}`)
  },
  updaterole (comment) {
    return Api().post('/updaterole', comment)
  },
  deleterole (id) {
    return Api().post(`/deleterole/${id}`)
  },
  getevents () {
    return Api().get('/event/getevents')
  },  
  geteventbyid (id) {
    return Api().get(`/event/geteventbyid/${id}`)
  },
  addevent (event) {
    return Api().post('/event/addevent', event)
  },
  updateevent (event) {
    return Api().post('/event/updateevent', event)
  },
  updateCulturalProgramEnrollmentDates (enrollmentDates) {
    return Api().post('/event/updateCulturalProgramEnrollmentDates', enrollmentDates)
  },
  updateCompetitiveProgramEnrollmentDates (enrollmentDates) {
    return Api().post('/event/updateCompetitiveProgramEnrollmentDates', enrollmentDates)
  },
  insertCulturalProgram (culturalProgram) {
    return Api().post('/event/insertCulturalProgram', culturalProgram)
  },
  updateCulturalProgram (culturalProgram) {
    return Api().post('/event/updateCulturalProgram', culturalProgram)
  },
  deleteCulturalProgram (culturalProgram) {
    return Api().post('/event/deleteCulturalProgram', culturalProgram)
  },
  getLookupsForCulturalPrograms () {
    return Api().get('/event/getLookupsForCulturalPrograms')
  },

  insertCompetitiveProgram (culturalProgram) {
    return Api().post('/event/insertCompetitiveProgram', culturalProgram)
  },
  updateCompetitiveProgram (culturalProgram) {
    return Api().post('/event/updateCompetitiveProgram', culturalProgram)
  },
  deleteCompetitiveProgram (culturalProgram) {
    return Api().post('/event/deleteCompetitiveProgram', culturalProgram)
  },
  getLookupsForCompetitivePrograms () {
    return Api().get('/event/getLookupsForCompetitivePrograms')
  },  
  insertFoodSale (event) {
    return Api().post('/event/'+ event._id + '/foodsale' , event.foodsale)
  },
  updateFoodSale (event) {
    return Api().put ('/event/'+ event._id + '/foodsale', event.foodsale)
  },
  deleteFoodSale (event) {
    return Api().delete('/event/'+ event.eventid + '/foodsale' + '/' + event.foodsaleid)
  },
  insertTicketSale (event) {
    return Api().post('/event/'+ event._id + '/ticketsale' , event.ticketsale)
  },
  updateTicketSale (event) {
    return Api().put ('/event/'+ event._id + '/ticketsale', event.ticketsale)
  },
  deleteTicketSale (event) {
    return Api().delete('/event/'+ event.eventid + '/ticketsale' + '/' + event.ticketsaleid)
  },

  deleteevent (id) {
    return Api().post(`/event/deleteevent/${id}`)
  },
  submitfrontdeskcheckin (checkinstatusdetails) {
    return Api().post('/event/submitfrontdeskcheckin', checkinstatusdetails)
  },
  getfrontdeskstatus () {
    return Api().get('/event/getfrontdeskstatus')
  },
  createProgram(program) {
    return Api().post(`/program/create`,program)
  },
  programICoordinate(id) {
    return Api().get(`/programICoordinate/${id}`)
  },
  programByFamilyID(id) {
    return Api().get(`/programByFamilyID/${id}`)
  },
  addKid(kid) {
    return Api().post(`/kids/create`,kid)
  },
  programsByEventID(id) {
    return Api().get(`/program/${id}`)
  },
  updateProgram(program) {
    return Api().post('/program/update', program)
  },
  updatePersonalData (member) {
    return Api().post('/membership/updatePersonalData', member)
  },
  getSpouseByFamilyId(familyid) {
    return Api().get(`/getspousedata/${familyid}`)
  },
  updateSpouseData (spouse) {
    return Api().post('/spouse/updateSpouseData', spouse)
  },
  createSpouseData (spouse) {
    return Api().post('/spouse/create', spouse)
  },
  getactiveEvents() {
    return Api().get('/activeEvents')
  },
  participantsByProgramID(id) {
    return Api().get(`/participant/${id}`)
  },
  getAllKids() {
    return Api().get('/kids/')
  },
  getAllSpouses() {
    return Api().get('/spouse/')
  },  
  getprogrambyid(id) {
    return Api().get(`/programById/${id}`)
  },
  getProgramBySPN(id) {
    return Api().get(`/SystemProNumber/${id}`)
  },
  pcpcheckinsbyprogram() {
    return Api().get('/event/pcpcheckinsbyprogram')
  },
  getParticipantsByProgramId(id) {
    return Api().get(`/getParticipantsByProgramId/${id}`)
  },
  //byFamilyId
  getAllParticipantByFamilyId(id) {
    return Api().get(`/participant/byFamilyId/${id}`)
  },
  getAllParticipantByProgramId(id) {
    return Api().get(`/participant/byProgramId/${id}`)
  },
  getAllParticipantByPaymentStatus(id) {
    return Api().get(`/participant/paymentstatus/${id}`)
  },
  //byProgramId
  getAllParticipantByMembership(id) {
    return Api().get(`/participant/membershipCategory/${id}`)
  },
  deleteParticipant(id) {
    return Api().put(`/participant/delete/${id}`)
  },
  updateEnrollmentStatus (newValue) {
    return Api().post(`/updateEnrollmentStatus/${newValue}`)
  },
  getEnrollmentStatus () {
    return Api().get(`/getEnrollmentStatus`)
  },
  getParticipantsByKidsId(id) {
    return Api().get(`/getParticipantsByKidsId/${id}`)
  },  
  createParticipantData(participantData) {
    return Api().post(`/participant/createParticipant`,participantData)
  },
  getAllKuralInfo () {
    return Api().get(`/getAllKuralInfo`)
  },
  getKuralById(id) {
    return Api().get(`/getKuralById/${id}`)
  }, 
  updateKuralById (data) {
    return Api().post('/updateKuralById', data)
  },
  updateKural (data) {
    return Api().post('/updateKural', data)
  },
  sendEmailAlert (data) {
    return Api().post('/sendEmailAlert', data)
  },
  getStats () {
    return Api().get(`/getStats`)
  },
  addKural (comment) {
    return Api().post('/addKural', comment)
  }
}