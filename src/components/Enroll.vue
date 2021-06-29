<template>
  <v-container class="white elevation-0" grid-list-xl fluid ma-0 pa-0>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <b>Project : </b>
        <br /><br />
        <b>ACME Industry develops custom software for the aviation industry.</b>
        Its main competitors are companies like Raytheon and Boeing, as well as
        a few smaller contractors. Pat Smith has worked for ACME Industry for
        five years. Pat’s supervisor has noted that after being passed over
        several times for a promotion, Pat has become quite disgruntled. The
        company fears that Pat may be offering proprietary company information
        to a competitor in exchange for a job. An EnCase image of Pat’s
        computer’s hard drive has been generated. Our job is to examine the
        image and extract all pertinent information to support or disprove the
        statement of Pat may be offering proprietary company information to a
        competitor in exchange for a job.
      </v-flex>

      <v-flex>
        <v-spacer />
        <v-btn
          v-if="this.loggedInUser === 'SuperAdmin'"
          class="mx-1"
          color="green"
          dark
          @click.stop="add()"
        >
          <v-icon class="mx-1" dark>mdi-plus-circle</v-icon>Add user</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg6 sm10>
        <v-card dark color="indigo lighten-3">
          <v-card-text class="white">
            <doughnut-chart
              :chart-data="datacollection"
              :options="options"
            ></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex lg6 sm10>
        <v-card dark color="indigo lighten-3">
          <v-card-text class="white">
            <pie-chart
              :chart-data="rccollection"
              :options="options"
            ></pie-chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-data-table
      dense
      :headers="headers"
      :items-per-page="50"
      :items="profileData"
      :search="search"
      :loading="loading"
      :sort-by="['_id']"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="caption mx-0">Search</v-toolbar-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-flex sm2 pt-6>
            <v-text-field
              outlined
              dense
              placeholder="Search"
              class="caption"
              prepend-inner-icon="search"
              v-model="search"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:item.File="{ item }">
        <v-chip outlined class="ma-1" color="info" label dark>
          <v-icon outlined dark>mdi-file-pdf</v-icon>
          <v-div
            dark
            v-html="getDetails(item.File)"
            class="text elevation-0 px-2 body-2"
          ></v-div>
        </v-chip>
      </template>

      <template v-slot:item.Status="{ item }">
        <v-chip
          :color="getColor(item.Status)"
          class="caption"
          label
          small
          outlined
          >{{ item.Status }}</v-chip
        >
      </template>
    </v-data-table>

    <v-layout row justify-center>
      <v-dialog v-model="popupbox" max-width="800px" hide-overlay>
        <v-toolbar dark color="indigo lighten-2" height="45">
          <v-toolbar-title class="body-2 elevation-0"
            >Add/Edit Profile</v-toolbar-title
          >
        </v-toolbar>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          :close-on-content-click="false"
          :nudge-right="100"
          offset-y
          full-width
          min-width="500px"
        >
          <v-card>
            <v-card-text>
              <div class="d-flex">
                <v-text-field
                  ref="Json.Number"
                  outlined
                  dense
                  class="caption mr-1"
                  filled
                  v-model="Json.Number"
                  label="Number"
                  placeholder=" "
                  height="25"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field
                  ref="Json.Role"
                  outlined
                  dense
                  class="caption mr-1"
                  filled
                  v-model="Json.Role"
                  label="Role"
                  placeholder=" "
                  height="25"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field
                  ref="Json.Name"
                  outlined
                  dense
                  class="caption mr-1"
                  filled
                  v-model="Json.Name"
                  label="Name"
                  placeholder=" "
                  height="25"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field
                  ref="Json.Email"
                  outlined
                  dense
                  class="caption mr-1"
                  filled
                  v-model="Json.Email"
                  label="Email"
                  placeholder=" "
                  height="25"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field
                  ref="Json.Status"
                  outlined
                  dense
                  class="caption mr-1"
                  filled
                  v-model="Json.Status"
                  label="Status"
                  placeholder=" "
                  height="25"
                ></v-text-field>
              </div>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small outline dark color="indigo lighten-2" @click="close"
                >Close</v-btn
              >
              <v-btn
                v-if="Json._id === ''"
                small
                dark
                outline
                color="indigo lighten-2"
                @click="submit()"
                ><v-icon class="mr-1">mdi-floppy</v-icon>submit</v-btn
              >
              <v-btn
                v-if="Json._id !== ''"
                small
                outline
                dark
                color="indigo lighten-2"
                @click="update()"
                :disabled="!valid"
                ><v-icon class="mr-1">mdi-floppy</v-icon>Update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-dialog v-model="confirmpopup" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Confirmation </v-card-title>
          <v-card-text
            >Your Profile changes has been successfully updated.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo lighten-1"
              outlined
              text
              @click="confirmpopup = false"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <br /><br />
  </v-container>
</template>

<script>
import ReportServices from "@/services/ReportServices"
import DoughnutChart from "@/components/DoughnutChart.js"
import PieChart from "@/components/PieChart.js"

export default {
  components: { DoughnutChart, PieChart },
  data() {
    return {
      datacollection: null,
      options: {
        layout: { padding: { left: 1, right: 0, top: 0, bottom: 0 } },
        legend: { display: true, position: "right" },
        title: { display: false, text: "Role By Status" },
        tooltips: { enabled: true },
        hover: { animationDuration: 1 },
        responsive: true,
        maintainAspectRatio: false,
      },
      search: "",
      loading: false,
      profileData: [],
      headers: [
        { text: "Number", align: "left", value: "Number" },
        { text: "EmployeeID", align: "left", value: "EmployeeID" },
        { text: "Name", align: "left", value: "Name" },
        { text: "Email", align: "left", value: "Email" },
        { text: "Role", align: "left", value: "Role" },
        { text: "Status", align: "left", value: "Status" },
        { text: "View Report", align: "left", value: "File" },
      ],
      Json: {
        _id: "",
        Number: "",
        EmployeeID: "",
        Role: "",
        Name: "",
        Email: "",
        Status: "",
        File: "",
      },
      select: null,
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "This Field is required"],
      comment: null,
      popupbox: false,
      confirmpopup: false,
    }
  },
  computed: {
    loggedInUser() {
      var user = this.$store.getters.email
      if (user) return "SuperAdmin"
      else return null
    },
  },
  methods: {
    fillData() {
      ;(this.datacollection = {
        labels: ["Disabled", "Active"],
        datasets: [
          {
            backgroundColor: ["#f87979", "#5DADE2"],
            data: [1, 5],
          },
        ],
      }),
        (this.rccollection = {
          labels: [
            "Reporter",
            "Researcher",
            "Director",
            "Security Officer",
            "Employee",
          ],
          datasets: [
            {
              backgroundColor: [
                "#7DCEA0",
                "#f87979",
                "#5DADE2",
                "yellow",
                "cyan",
              ],
              data: [1, 1, 1, 1, 1],
            },
          ],
        })
    },
    getColor(status) {
      if (status === "Active") return "green"
      else if (status === "Disabled") return "red"
      else return "orange"
    },
    getDetails(detail) {
      var html = detail
      if (detail.startsWith("http")) {
        html = detail.replace(
          html,
          '<a href="' + html + '" target="_blank">' + "View" + "</a>"
        )
        return html
      }
      if (detail.includes("http")) {
        var url = html.match(
          /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g
        )
        html = html.replace(
          url,
          '<a href="' + url + '" target="_blank">' + "View" + "</a>"
        )
        return html
      }
      return html
    },
    async add() {
      this.popupbox = true
      this.cleardata()
    },
    async cleardata() {
      this.Json._id = ""
      this.Json.Number = ""
      this.Json.EmployeeID = ""
      this.Json.Role = ""
      this.Json.Name = ""
      this.Json.Email = ""
      this.Json.Status = ""
      this.Json.File = ""
    },
    async getProfile(id) {
      if (id) {
        this.popupbox = true
        this.roleData = (await ReportServices.getKuralById(id)).data
        this.Json._id = this.roleData._id
        this.Json.Number = this.roleData.Number
        this.Json.EmployeeID = this.roleData.EmployeeID
        this.Json.Role = this.roleData.Role
        this.Json.Name = this.roleData.Name
        this.Json.Email = this.roleData.Email
        this.Json.Status = this.roleData.Status
        this.Json.File = this.roleData.File
      }
    },
    update() {
      if (this.$refs.form.validate()) {
        this.Json.Status = "Active"
        ReportServices.updateKural(this.Json)
        this.popupbox = false
        setTimeout(() => {
          this.refresh()
        }, 400)
        this.confirmpopup = true
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        ReportServices.addKural(this.Json)
        this.popupbox = false
        setTimeout(() => {
          this.refresh()
        }, 500)
      }
    },
    async refresh() {
      this.loading = true
      this.profileData = (await ReportServices.getAllKuralInfo()).data
      this.loading = false
      this.noDataText = "No data available"
    },
    close() {
      this.popupbox = false
    },
  },
  async mounted() {
    this.refresh()
    this.fillData()
  },
}
</script>
