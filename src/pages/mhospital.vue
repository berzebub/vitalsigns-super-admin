<template>
  <q-page>
    <q-header class="row color-white">
      <q-toolbar class="col-4 bg-primary-500 no-padding shadow-1" style="width:100%">
        <q-toolbar-title>
          <div class>
            <q-btn class dense to="/hospital" flat icon="chevron_left"></q-btn>
            <span class="font-h3">โรงพยาบาล</span>
          </div>
        </q-toolbar-title>
        <!-- <div class="q-pa-sm font-body">
          <q-btn dense label="+ เพิ่ม Hospital Admin" @click="showAddUser()" class="q-mx-sm" flat></q-btn>
        </div>-->
        <q-btn flat icon="more_vert">
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup @click="showAddUser()">
                <q-item-section>เพิ่ม Admin</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="showEditHospital()">
                <q-item-section>แก้ไข</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="deleteHospital()">
                <q-item-section class="text-red">ลบโรงพยาบาล</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <div style="max-width:360px;width:95%;margin:auto" class="q-pa-lg" v-if="isLoaded">
      <div align="center" class="font-h3 relative-position">{{ hospitalData.name }}</div>
      <div align="left" class="font-body q-pt-md">
        <span class="color-light-gray">Date Created</span>
        <span class="q-pl-sm">{{ hospitalData.dateCreated }}</span>
      </div>
      <div align="left" class="font-body q-pt-md">
        <span class="color-light-gray">Domain name</span>
        <span class="q-pl-sm">{{ hospitalData.domainPrefix }}.vitalsignapp.com</span>
      </div>
      <div
        class="row q-mt-lg"
        v-for="(items,index) in userData.filter(
          x => x.hospitalKey == this.$route.params.hospitalKey
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
            <div class="col">{{ items.name }} {{ items.surname }}</div>
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
              input-style="letter-spacing:2px;caret-color:#009688;"
              class="rounded-borders q-px-sm"
              v-model="adminObj.password"
              @keyup.enter="signIn()"
              outlined
              :type="isPwd ? 'password' : 'text'"
              :label="'รหัสผ่าน'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pt-lg">
          <q-btn label="บันทึก" @click="addAdmin()" class="button-action"></q-btn>
        </q-card-actions>

        <q-card-actions align="center" v-show="isEditMode">
          <q-btn @click="deleteAdminAccount()" flat class="text-red">ลบบัญชี Hospital Admin</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowAddHospital" maximized>
      <q-card>
        <div align="right" class="q-pa-md">
          <q-btn v-close-popup icon="fas fa-times" flat></q-btn>
        </div>
        <q-card-section style="max-width:360px;width:95%;margin:auto">
          <div align="center" class="font-h3">
            <span>แก้ไขโรงพยาบาล</span>
          </div>
          <div class="font-h4 q-pt-md">
            ชื่อโรงพยาบาล
            <q-input v-model="hospitalName" label="ชื่อโรงพยาบาล" class="q-pt-sm" outlined></q-input>
          </div>
          <div class="font-h4 q-pt-md">
            <div class="row">
              <div class="col-12">Domain</div>
              <div class="col-6">
                <q-input v-model="domainPrefix" label="Domain name" class="q-pt-sm" outlined></q-input>
              </div>
              <div class="col-6 self-end">
                <span class="q-pl-xs relative-position" style="bottom:7px">.vitalsignapp.com</span>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pt-lg">
          <q-btn label="บันทึก" @click="editHospital()" class="button-action"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      isShowAddHospital: false,
      isShowAddUser: false,
      isEditMode: false,
      adminObj: {},
      isPwd: true,
      userData: "",
      currentHospitalData: "",
      hospitalKey: "",
      isLoaded: false,
      hospitalData: "",
      hospitalName: "",
      domainPrefix: "",
      listenUserData: ""
    };
  },
  methods: {
    showEditHospital() {
      this.isShowAddHospital = true;
    },
    deleteHospital() {
      this.$q
        .dialog({
          title: "แจ้งเตือน",
          message:
            "คุณต้องการลบโรงพยาบาลนี้หรือไม่ ข้อมูลที่เกียวข้องกับโรงพยาบาลนี้ทั้งหมดจะถูกลบ",
          cancel: { textColor: "black", flat: true },
          ok: { color: "orange-5" }
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: "ยืนยันการลบ",
              message: "ข้อมูลที่เกียวข้องกับโรงพยาบาลนี้ทั้งหมดจะถูกลบ",
              cancel: { textColor: "black", flat: true },
              ok: { color: "orange-5" }
            })
            .onOk(() => {
              this.$q.loading.show({ delay: 400 });

              db.collection("patientData")
                .where("hospitalKey", "==", this.$route.params.hospitalKey)
                .get()
                .then(doc => {
                  doc.forEach(element => {
                    db.collection("patientData")
                      .doc(element.id)
                      .delete();
                  });
                });

              db.collection("patientLog")
                .where("hospitalKey", "==", this.$route.params.hospitalKey)
                .get()
                .then(doc => {
                  doc.forEach(element => {
                    db.collection("patientLog")
                      .doc(element.id)
                      .delete();
                  });
                });

              db.collection("userData")
                .where("hospitalKey", "==", this.$route.params.hospitalKey)
                .get()
                .then(doc => {
                  doc.forEach(element => {
                    db.collection("userData")
                      .doc(element.id)
                      .delete();
                  });
                });

              db.collection("patientRoom")
                .where("hospitalKey", "==", this.$route.params.hospitalKey)
                .get()
                .then(doc => {
                  doc.forEach(element => {
                    db.collection("patientRoom")
                      .doc(element.id)
                      .delete();
                  });
                });

              db.collection("hospital")
                .doc(this.$route.params.hospitalKey)
                .delete()
                .then(doc => {
                  this.$router.push("/hospital");
                  this.$q.loading.hide();
                });
            });
        });
    },
    editAdmin(items) {
      this.adminObj = items;
      this.isShowAddUser = true;
      this.isEditMode = true;
    },
    showAddUser() {
      this.adminObj = {};
      this.isShowAddUser = true;
      this.isEditMode = false;
    },
    loadUserData() {
      this.listenUserData = db
        .collection("userData")
        .where("isAdmin", "==", true)
        .onSnapshot(doc => {
          let dataTemp = [];
          doc.forEach(element => {
            dataTemp.push({ ...element.data(), ...{ key: element.id } });
          });
          dataTemp = dataTemp.sort((a, b) => {
            return a.microtimeCreated - b.microtimeCreated;
          });
          this.userData = dataTemp;
          this.isLoaded = true;
        });
    },
    async editHospital() {
      this.$q.loading.show({ delay: 400 });
      let date = await this.getDate();

      db.collection("hospital")
        .doc(this.$route.params.hospitalKey)
        .update({
          name: this.hospitalName,
          domainPrefix: this.domainPrefix
        })
        .then(() => {
          this.isShowAddHospital = false;
          this.loadHospitalData();
          this.$q.notify({
            message: "แก้ไขข้อมูลสำเร็จ",
            classes: "bg-teal"
          });
        });
    },
    deleteAdminAccount() {
      this.$q
        .dialog({
          title: "แจ้งเตือน",
          message: "คุณต้องการลบบัญชีนี้หรือไม่",
          cancel: { textColor: "black", flat: true },
          ok: { color: "orange-5" }
        })
        .onOk(() => {
          db.collection("userData")
            .doc(this.adminObj.key)
            .delete()
            .then(() => {
              this.isShowAddUser = false;
              this.$q.loading.hide();
            });
        });
    },
    async addAdmin() {
      let date = await this.getDate();
      this.$q.loading.show({ delay: 400 });
      if (this.isEditMode) {
        db.collection("userData")
          .doc(this.adminObj.key)
          .update(this.adminObj)
          .then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              message: "แก้ไขข้อมูลสำเร็จ",
              classes: "bg-teal"
            });
            this.isEditMode = false;
            this.isShowAddUser = false;
          });
      } else {
        db.collection("userData")
          .where("email", "==", this.adminObj.email)
          .get()
          .then(doc => {
            if (doc.size) {
              this.$q.loading.hide();
              this.$q.notify({
                message: "พบ Email นี้อยู่แล้วในระบบ",
                classes: "bg-red"
              });
            } else {
              db.collection("userData")
                .add({
                  isAdmin: true,
                  email: this.adminObj.email,
                  password: this.adminObj.password,
                  hospitalKey: this.$route.params.hospitalKey,
                  name: this.adminObj.name,
                  surname: this.adminObj.surname,
                  dateCreated: date.date,
                  microtimeCreated: date.microtime
                })
                .then(() => {
                  this.$q.notify({
                    message: "เพิ่ม Admin สำเร็จ",
                    classes: "bg-teal"
                  });
                  this.adminObj = {
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    hospitalKey: this.$route.params.hospitalKey,
                    dateCreated: date.date
                  };
                  this.isShowAddUser = false;
                  this.$q.loading.hide();
                });
            }
          });
      }
    },
    loadHospitalData() {
      db.collection("hospital")
        .doc(this.$route.params.hospitalKey)
        .get()
        .then(doc => {
          this.hospitalData = doc.data();
          this.hospitalName = doc.data().name;
          this.domainPrefix = doc.data().domainPrefix;
        });
    }
  },
  mounted() {
    this.loadUserData();
    this.loadHospitalData();
  },
  beforeDestroy() {
    this.listenUserData();
  }
};
</script>

<style lang="scss" scoped>
</style>