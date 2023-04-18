<template>
  <h2>{{itemId}}</h2>
  <button @click="itemId++">Increment Id</button>
  <DataItem :item-id="itemId"/>
</template>

<script setup lang="ts">
import {provideApolloClient} from "./services/apollo-client";
import DataItem from "./components/DataItem.vue";
import {ref} from "vue";

provideApolloClient("http://localhost:5117/graphql");

const itemId = ref(100);
</script>
