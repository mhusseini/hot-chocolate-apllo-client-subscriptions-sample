<template>
  <button v-if="result?.dataItem" @click="refetch()">Reload</button>
  <div v-else>Loading...</div>
  <pre>{{ result?.dataItem }}</pre>
</template>

<script lang="ts" setup>
import {useQuery} from "@vue/apollo-composable";
import {DataItemsQuery, DataItemsQueryDataItemArgs} from "../types";
import {computed} from "vue";

import dataItemQuery from "../graphql/dataItem.graphql";
import dataItemSubscription from "../graphql/dataItem.subscription.graphql";

const props = defineProps<{
  itemId: number
}>();

const {
  result,
  refetch,
  subscribeToMore,
} = useQuery<DataItemsQuery, DataItemsQueryDataItemArgs>(
    dataItemQuery,
    () => ({itemId: props.itemId}));

subscribeToMore({
  document: dataItemSubscription,
  variables: {itemId: computed(() => props.itemId)},
  updateQuery: (prev, {subscriptionData}) => subscriptionData?.data ?? prev
});

</script>