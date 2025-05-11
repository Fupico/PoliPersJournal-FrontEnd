<template>
  <q-page class="body bg-image">
    <div class="q-container">
      <q-row class="q-mb-md">
        <q-col class="absolute-center full-width" style="max-width: 550px">
          <q-card flat class="login-card">
            <q-card-section>
              <br />

              <div class="text-h4 text-bold text-center mb-3 text-indigo-8">
                Kullanıcı Giriş
              </div>
              <hr />

              <br />

              <q-tabs
                v-model="loginMethod"
                class="text-indigo-8"
                active-color="indigo-8"
                indicator-color="indigo-8"
                align="justify"
              >
                <q-tab name="username" label="Kullanıcı Adı" />
                <q-tab name="phone" label="Telefon" />
                <q-tab name="email" label="E-Mail" />
              </q-tabs>

              <q-tab-panels
                class="bg-transparent"
                v-model="loginMethod"
                animated
              >
                <q-tab-panel class="bg-transparent" name="username">
                  <q-form
                    @submit="onLogin('userName')"
                    class="q-gutter-md q-mt-md"
                  >
                    <q-input
                      v-model="dataItem.userName"
                      label="Kullanıcı Adı"
                    />
                    <q-input
                      :type="isPwd ? 'password' : 'text'"
                      v-model="dataItem.password"
                      label="Şifre"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <div class="row justify-center">
                      <q-btn
                        type="submit"
                        label="Giriş"
                        color="indigo-8"
                        class="q-px-md"
                        no-caps
                      />
                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="phone">
                  <q-form
                    @submit="onLogin('phoneNumber')"
                    class="q-gutter-md q-mt-md"
                  >
                    <q-input
                      v-model="dataItem.phoneNumber"
                      label="Telefon Numarası"
                      mask="+90 (###) ### ## ##"
                    />
                    <q-input
                      :type="isPwd ? 'password' : 'text'"
                      v-model="dataItem.password"
                      label="Şifre"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <div class="row justify-center">
                      <q-btn
                        type="submit"
                        label="Giriş"
                        color="indigo-8"
                        class="q-px-md"
                        no-caps
                      />
                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="email">
                  <q-form
                    @submit="onLogin('email')"
                    class="q-gutter-md q-mt-md"
                  >
                    <q-input
                      v-model="dataItem.email"
                      label="E-Mail"
                      type="email"
                    />
                    <q-input
                      :type="isPwd ? 'password' : 'text'"
                      v-model="dataItem.password"
                      label="Şifre"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <div class="row justify-center">
                      <q-btn
                        type="submit"
                        label="Giriş"
                        color="indigo-8"
                        class="q-px-md"
                        no-caps
                      />
                    </div>
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>
              <div class="row justify-center items-end q-ma-md">
                <b
                  style="cursor: pointer; color: black"
                  @click="router.push('/register')"
                  >Kayıt Ol</b
                >
              </div>
              <!-- <q-form @submit="onLogin" class="q-gutter-xs">
                <br />

                <q-input
                  v-model="dataItem.userName"
                  label="Kullanıcı Adı"
                ></q-input>
                <q-input
                  :type="isPwd ? 'password' : 'text'"
                  v-model="dataItem.password"
                  :label="'Şifre'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    ></q-icon>
                  </template>
                </q-input>

               
                <br />
                <div class="row justify-center items-end">
                  <q-btn
                    no-caps
                    class="q-pa"
                    :label="'Giriş'"
                    type="submit"
                    color="indigo-8"
                  ></q-btn>
                </div>
                <div class="row justify-center items-end q-ma-md">
                  <b
                    style="cursor: pointer; color: black"
                    @click="router.push('/register')"
                    >Kayıt Ol</b
                  >
                </div>
              </q-form> -->
            </q-card-section>

            <div class="row items-end justify-between q-gutter-md q-pa-md">
              <div class="q-gutter-sm">
                <a
                  style="font-size: 14px; text-decoration: none"
                  class="text-indigo-8"
                  target="_blank"
                  href="http://www.fupico.com"
                >
                  <!-- <b> {{ project.projectBy }}</b> -->
                </a>
              </div>
            </div>
          </q-card>
        </q-col>
      </q-row>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "src/stores/authServiceStore";
import { LoginRequest } from "src/models/Auth/Login";
const authStore = useAuthStore();
const { responseData, login, isLoading, errorMessage } = authStore;
const $q = useQuasar();
const router = useRouter();
const isPwd = ref(true);
const dataItem = ref<LoginRequest>({
  userName: null,
  password: null,
  phoneNumber: null,
  email: null,
});
const loginMethod = ref("username"); // Default login method
const onLogin = async (loginType: string) => {
  if (loginType == "userName") {
    dataItem.value.phoneNumber = null;
    dataItem.value.email = null;
  } else if (loginType == "phoneNumber") {
    dataItem.value.userName = null;
    dataItem.value.email = null;
  } else if (loginType == "email") {
    dataItem.value.userName = null;
    dataItem.value.phoneNumber = null;
  }
  await authStore.login(dataItem.value);

  console.log("responseData", authStore.responseData);
  if (authStore.responseData != null) {
    if (authStore.responseData.success === true) {
      $q.notify({
        message: "Giriş İşlemi Başarılı",
        type: "positive",
        icon: "check_circle",
      });
      router.push("/");
    } else {
      console.log("errorMessage", authStore.errorMessage);
      $q.notify({
        message: authStore.errorMessage || "Hata Oluştu",
        type: "negative",
        icon: "error",
      });
    }
  } else {
    console.log("errorMessage", authStore.errorMessage);
    $q.notify({
      message: authStore.errorMessage || "Hata Oluştu",
      type: "negative",
      icon: "error",
    });
  }
};
</script>

<style scoped>
.body {
  background: linear-gradient(
    to right top,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
}

.bg-image {
  background-image: url("/public/images/image.png");
  /* background-image: url("/public/images/loginBG.png"); */
  background-repeat: no-repeat;
  background-size: cover;
}
.login-card {
  /* -webkit-box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(91, 151, 115, 0); */
  /*box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #5B9773, 5px 5px 15px 5px rgba(91, 151, 115, 0);*/
  /* box-shadow: 2px 5px 50px #6e6e6e; */
  border-radius: 15px;
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Rengi beyaz (255, 255, 255) ve 50% opacity (0.5) olarak ayarladık */
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  /* background-color:transparent; */
  /* border-bottom: 11px solid #FFCB00;*/
}
:deep(.no-pointer-events) {
  padding: 8px;
}
:deep(.q-field__native) {
  padding: 6px 6px;
}
@media (max-width: 580px) {
  .login-card {
    margin: 0 10px 0 10px;
  }
}
</style>
