<template>
<div class="card" :style="{backgroundColor: card.color}">
  <h1>{{card.description}}</h1>
  <h2>{{card.id}}</h2>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Card } from '../model/CardInterface';

export default defineComponent({
  name: 'CardDisplay',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },
  data() {
    return {
      cardSelected: false,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    border-radius:15px;
    margin: 25px;
    padding-left: 25px;
    min-width: 300px;
    min-height: 250px;
}
h1, h2 {
  text-align: left;
}
</style>
