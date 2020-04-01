<template>
  <q-page>
    <q-header class="row color-white">
      <q-toolbar
        class="col-4 bg-primary-500 no-padding shadow-1"
        :style="
          $q.platform.is.desktop ? 'max-width:360px;width:100%;' : 'width:100%;'
        "
      >
        <q-toolbar-title>
          <div class="q-px-md">
            <span class="font-h3">โรงพยาบาล</span>
          </div>
        </q-toolbar-title>
        <div class="q-pa-sm font-body">
          <q-btn
            dense
            label="+ เพิ่มโรงพยาบาล"
            @click="isShowAddHospital = true"
            class="q-mx-sm"
            flat
          ></q-btn>
        </div>
      </q-toolbar>
      <q-toolbar class="col bg-primary-500 shadow-1" v-if="$q.platform.is.desktop">
        <q-toolbar-title>
          <div class="font-h3">รายละเอียดโรงพยาบาล</div>
        </q-toolbar-title>
        <q-btn
          v-show="isClickedOnHospital"
          dense
          no-caps
          @click="isShowAddUser = true,isEditMode = false"
          label="+ เพิ่ม Hospital Admin"
          class="q-mx-sm"
          flat
        ></q-btn>
      </q-toolbar>
    </q-header>

    <!-- TODO : Container List Data -->
    <div class="row">
      <div
        class="col-4 container-list bg-white"
        :class="$q.platform.is.desktop ? 'desktop-only' : 'mobile-only'"
      >
        <!-- TODO : List Data Component -->
        <div>
          <div class="q-px-md" style="padding-top:22px;">
            <span
              class="font-body color-primary-600 text-bold"
              style="font-size:14px;font-weight:bold;"
            ></span>
          </div>

          <div
            class="row q-py-sm font-body full-width relative-position cursor-pointer"
            v-ripple
            v-for="(items,index) in hospitalData"
            :key="index"
            @click="showHospitalData(index)"
          >
            <div class="q-px-md col">{{ items.name }}</div>
            <div class="col-1 self-center" style="width:30px;">
              <q-icon name="chevron_right" size="24px"></q-icon>
            </div>
            <div class="col-12 q-px-md color-light-gray">{{ items.domainPrefix }}</div>
            <div class="col-12">
              <q-separator />
            </div>
          </div>
        </div>
      </div>

      <!-- TODO : Container Show Data -->
      <div class="col container-list" v-if="!isClickedOnHospital">
        <!-- NOTE ยังไม่มีการโชว์ข้อมูลผู้ป่วย -->
        <div class="font-h3 color q-ma-xl q-pa-xl color-light-gray">
          <q-icon name="arrow_back" class="q-mr-sm"></q-icon>เลือกข้อมูลด้านซ้าย
          เพื่อดูรายละเอียด
        </div>
      </div>

      <div v-else class="col container-list">
        <div style="max-width:360px;width:95%;margin:auto" class="q-pa-lg">
          <div align="center" class="font-h3">{{ currentHospitalData.name }}</div>
          <div align="left" class="font-body">
            <span class="color-light-gray">Domain</span>
            <span class="q-pl-sm">{{ currentHospitalData.domainPrefix }}</span>
          </div>
          <div align="left" class="font-body">
            <span class="color-light-gray">Date Created</span>
            <span class="q-pl-sm">{{ currentHospitalData.dateCreated.date }}</span>
          </div>

          <div
            class="row q-mt-lg"
            v-for="(items,index) in userData.filter(
          x => x.hospitalKey == currentHospitalData.key
          )"
            :key="index"
          >
            <q-card class="col-12 q-pa-sm">
              <q-card-section align="center" class="font-body">
                Hospital Admin
                <q-btn
                  dense
                  flat
                  class="absolute-right cursor-pointer color-primary-500"
                  @click="editAdmin(items)"
                >edit</q-btn>
              </q-card-section>
              <div class="q-pb-sm">
                <q-separator></q-separator>
              </div>
              <div class="row q-px-md">
                <div class="col">Name</div>
                <div class="col">{{ items.displayName }}</div>
              </div>
              <div class="row q-px-md">
                <div class="col">Email</div>
                <div class="col">{{ items.email }}</div>
              </div>
              <div class="row q-px-md">
                <div class="col">Password</div>
                <div class="col">{{ items.password }}</div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="isShowAddHospital" maximized>
      <q-card>
        <div align="right" class="q-pa-md">
          <q-btn v-close-popup icon="fas fa-times" flat></q-btn>
        </div>
        <q-card-section style="max-width:360px;width:95%;margin:auto">
          <div align="center" class="font-h3">เพิ่มโรงพยาบาล</div>
          <div class="font-h4 q-pt-md">
            ชื่อโรงพยาบาล
            <q-input v-model="hospitalName" label="ชื่อโรงพยาบาล" class="q-pt-sm" outlined></q-input>
          </div>

          <div class="font-h4 q-pt-md">
            Domain
            <div class="row">
              <div class="col-6">
                <q-input label="domain" v-model="domainPrefix" class="q-pt-sm" outlined></q-input>
              </div>
              <div class="col self-end">
                <div class="q-pl-sm">.vitalsignapp.com</div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pt-lg">
          <q-btn label="บันทึก" @click="addHospital()" class="button-action"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowAddUser" maximized>
      <q-card>
        <div align="right" class="q-pa-md">
          <q-btn v-close-popup icon="fas fa-times" flat></q-btn>
        </div>
        <q-card-section style="max-width:360px;width:95%;margin:auto">
          <div align="center" class="font-h3">{{ isEditMode ? 'แก้ไข' : 'เพิ่ม' }} Hospital Admin</div>
          <div class="font-h4 q-pt-md">
            <span class="q-px-sm">ชื่อและนามสกุล</span>
            <div class="row">
              <div class="col-6 q-px-sm">
                <q-input label="ชื่อ" v-model="adminObj.name" class="q-pt-sm" outlined></q-input>
              </div>
              <div class="col-6 q-px-sm">
                <q-input label="สกุล" v-model="adminObj.surname" class="q-pt-sm" outlined></q-input>
              </div>
            </div>
          </div>

          <div class="font-h4 q-pt-md">
            <span class="q-px-sm"></span>
            Email
            <q-input
              :readonly="isEditMode"
              v-model="adminObj.email"
              label="Email"
              class="q-pt-sm q-px-sm"
              outlined
            ></q-input>
          </div>

          <div class="font-h4 q-pt-md">
            <span class="q-px-sm"></span>
            Password
            <q-input
              :readonly="isEditMode"
              v-model="adminObj.password"
              label="Password"
              class="q-pt-sm q-px-sm"
              outlined
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pt-lg">
          <q-btn label="บันทึก" @click="addAdmin()" class="button-action"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
export default {
  data() {
    return {
      isShowAddUser: false,
      isShowAddHospital: false,
      hospitalName: "",
      domainPrefix: "",
      hospitalData: "",
      currentHospitalData: "",
      isClickedOnHospital: false,
      adminObj: {
        name: "",
        surname: "",
        email: "",
        password: "",
        hospitalKey: "",
        dateCreated: "",
        uid: ""
      },
      userData: "",
      showUserData: "",
      isEditMode: false
    };
  },
  methods: {
    editAdmin(items) {
      console.log(items);
      this.adminObj = items;
      this.isShowAddUser = true;
      this.isEditMode = true;
    },
    addAdmin() {
      let _this = this;
      this.$q.loading.show({
        delay: 400
      });
      auth
        .createUserWithEmailAndPassword(
          _this.adminObj.email,
          _this.adminObj.password
        )
        .then(() => {
          let user = auth.currentUser;
          user
            .updateProfile({
              displayName: this.adminObj.name + " " + this.adminObj.password
            })
            .then(() => {
              let userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                name: this.adminObj.name,
                surname: this.adminObj.surname,
                password: this.adminObj.password,
                hospitalKey: this.currentHospitalData.key
              };
              db.collection("userData")
                .add(userData)
                .then(() => {
                  _this.$q.loading.hide();
                  _this.$q.notify({
                    message: "สร้างบุคลากรเรียบร้อย",
                    classes: "notifyBg"
                  });
                  _this.isShowAddUser = false;
                  _this.adminObj = {
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    hospitalKey: "",
                    dateCreated: "",
                    uid: ""
                  };
                });
            });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          _this.$q.loading.hide();
          alert(errorMessage);
        });
    },
    showHospitalData(index) {
      this.isClickedOnHospital = true;
      this.currentHospitalData = this.hospitalData[index];
    },
    async addHospital() {
      this.$q.loading.show({ delay: 400 });
      let date = await this.getDate();
      db.collection("hospital")
        .add({
          name: this.hospitalName,
          domainPrefix: this.domainPrefix,
          dateCreated: date,
          microtimeCreated: date.microtime
        })
        .then(() => {
          this.isShowAddHospital = false;
          this.$q.loading.hide();
        });
    },
    loadHospital() {
      this.$q.loading.show({ delay: 400 });
      db.collection("hospital").onSnapshot(doc => {
        let dataTemp = [];
        doc.forEach(element => {
          dataTemp.push({ ...element.data(), ...{ key: element.id } });
        });
        this.hospitalData = dataTemp;
        this.$q.loading.hide();
        this.loadUserData();
      });
    },
    loadUserData() {
      db.collection("userData").onSnapshot(doc => {
        let dataTemp = [];
        doc.forEach(element => {
          dataTemp.push({ ...element.data(), ...{ key: element.id } });
        });
        this.userData = dataTemp;
      });
    }
  },
  mounted() {
    this.loadHospital();
    console.log(auth.currentUser.email);
  }
};
</script>

<style lang="scss" scoped>
/* TODO : Container List Data And Scrollbar */
.container-list {
  overflow-y: auto;
  height: calc(100vh - 50px);
  border-right: 1px solid #b3b3b379;
}

.container-list.desktop-only {
  max-width: 360px;
  width: 100%;
}

.container-list.mobile-only {
  width: 100%;
}

.container-list::-webkit-scrollbar {
  width: 2px;
}

.container-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.container-list::-webkit-scrollbar-thumb {
  background: rgb(167, 167, 167);
}

.container-list::-webkit-scrollbar-thumb:hover {
  background: rgb(163, 163, 163);
}

.my-card {
  padding: 2px;
  border-radius: 10px;
}
</style>