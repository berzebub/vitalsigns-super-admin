<template>
  <div class="flex flex-center">
    <!-- TODO : Container Header -->
    <q-toolbar class="bg-primary-500 shadow-1">
      <q-toolbar-title class="text-white">Vital Signs Super Admin</q-toolbar-title>
      <q-space />
    </q-toolbar>

    <!-- TODO : Container Body -->
    <div style="width:90%;margin:auto;max-width:360px">
      <div class="q-my-lg" align="center">
        <span class="font-h3">Super Admin</span>
      </div>

      <div class="q-mt-xl q-mb-sm">
        <div align="center">
          <div align="left" style="width:100%;margin:auto" class="font-h4">อีเมล</div>
          <q-input
            input-style="letter-spacing:2px;caret-color:#009688;"
            class="rounded-borders"
            color="teal"
            outlined
            autofocus
            v-model="email"
            label="example@gmail.com"
          ></q-input>
        </div>
      </div>

      <div class="q-mt-lg q-mb-sm">
        <div align="center">
          <div align="left" style="width:100%;margin:auto" class="font-h4">รหัสผ่าน</div>

          <q-input
            input-style="letter-spacing:2px;caret-color:#009688;"
            class="rounded-borders"
            v-model="password"
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
      </div>

      <div class="q-pt-lg q-pb-md" align="center">
        <q-btn @click="login()" class="button-action" dense label="เข้าสู่ระบบ"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../router/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      isPwd: true
    };
  },
  methods: {
    login() {
      let _this = this;
      this.$q.loading.show({ delay: 400 });
      db.collection("userData")
        .where("email", "==", this.email)
        .where("password", "==", this.password)
        .where("isSuperAdmin", "==", true)
        .get()
        .then(doc => {
          if (doc.size) {
            this.$router.push("/hospital");
          } else {
            this.$q.loading.hide();
            this.$q.dialog({
              title: "ผิดพลาด",
              message: "ไม่พบรหัสผู้ใช้งานนี้ในระบบ",
              ok: {
                color: "orange-5"
              }
            });
          }
        });
    }
  }
};
</script>
