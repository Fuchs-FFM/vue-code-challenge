<template>
  <p class="row" :style="{backgroundColor: transaction.color}">
    <span> {{transaction.description}} </span> <span> {{ transaction.amount }} € </span>
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '../model/TransactionInterface';

export default defineComponent({
  name: 'TransactionDisplay',
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },
});
</script>

<style scoped>
.row {
    padding: 20px;
    box-sizing: border-box;
    border-radius:15px;
    margin: 25px;
    min-height: 50px;
    font-weight: bold;
}
p {
  display: flex;
  justify-content: space-between;
}
</style>
