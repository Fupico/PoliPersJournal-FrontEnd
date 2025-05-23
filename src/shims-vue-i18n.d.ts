/// <reference types="quasar" />

import { ComponentCustomProperties } from "vue";
import { I18n } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: I18n["global"]["t"];
  }
}
