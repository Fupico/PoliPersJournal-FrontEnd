<template>
    <q-item clickable :to="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>
  
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
  <script setup lang="ts">
  export interface EssentialLinkProps {
    title: string;
    link?: string;
    icon?: string;
    roles?: String[] | any;
  }
  
  withDefaults(defineProps<EssentialLinkProps>(), {
    link: "#",
    icon: "",
  });
  </script>
  