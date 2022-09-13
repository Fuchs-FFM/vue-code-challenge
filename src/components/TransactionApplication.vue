<template>
  <div class="mainbody">
    <li v-for="card in rawCards" :key=card.id>
      <CardDisplay
        :card="card"
        :style="[isHighlightedCard(card.id) ? {opacity: 1.0} : { opacity: 0.5}]"
        @click="selectCard(card.id)">
        </CardDisplay>
    </li>
    <h3>Amount Filter</h3>
    <input type="number" placeholder="below amount will be filtered out" v-model="filterAmount" />
    <div v-for="transaction in filteredTransactions" :key=transaction.id>
      <TransactionDisplay :transaction="transaction"></TransactionDisplay>
    </div>
    <h1 v-if="filteredTransactions.length === 0">
      Sorry all transactions are currently filtered out...
    </h1>
  </div>
</template>

<script lang="ts">
import { Transaction } from '@/model/TransactionInterface';
import { defineComponent } from 'vue';
import CardDisplay from './CardDisplay.vue';
import TransactionDisplay from './TransactionDisplay.vue';
// @ts-ignore TODO - update with ts clean solution
import rawCards from '../mockdata/card'; // TODO replace with service providing data
// @ts-ignore TODO - update with ts clean solution
import rawTransactions from '../mockdata/transactions'; // TODO replace with service providing data

export default defineComponent({
  name: 'TransactionApplication',
  components: { CardDisplay, TransactionDisplay },
  data() {
    return {
      selectedCard: '',
      filterAmount: 0,
      rawCards,
      rawTransactions,
    };
  },
  methods: {
    selectCard(newCard: string): void {
      if (this.selectedCard === newCard) {
        this.selectedCard = '';
      } else {
        this.selectedCard = newCard;
      }
      this.filterAmount = 0;
    },
    isHighlightedCard(cardId: string): boolean {
      return this.selectedCard === '' || this.selectedCard === cardId;
    },
    determineRowColor(cardIdOfRow: string): string | undefined {
      return this.rawCards.find((card: { id: string; }) => card.id === cardIdOfRow)?.color;
    },
    flatAndPreprocessTransactions(inputTransactions: any[]): Transaction[] {
      const transactions: Transaction[] = [];
      inputTransactions.forEach((transactionCategorys) => {
        Object.keys(transactionCategorys).forEach((categoryKey) => {
          // @ts-ignore TODO - update with ts clean solution
          transactionCategorys[categoryKey].forEach((transaction: any) => {
            transactions.push({
              ...transaction,
              parentId: categoryKey,
              color: this.determineRowColor(categoryKey),
            });
          });
        });
      });
      return transactions;
    },
  },
  computed: {
    filteredTransactions(): Transaction[] {
      let transactionsPerCard = this.rawTransactions;
      if (this.selectedCard) {
        // @ts-ignore TODO - update with ts clean solution
        transactionsPerCard = [this.rawTransactions.find((card) => card[this.selectedCard])];
      }
      const transactions = this.flatAndPreprocessTransactions(transactionsPerCard);
      return transactions.filter((transaction) => transaction.amount >= this.filterAmount);
    },
  },
});
</script>

<style scoped>
.mainbody {
  margin: 10px;
  padding: 25px;
  background-color: lightgray;
  border-radius: 20px;
  min-height: 1000px;
}

li {
  display: inline-flex
}

input {
  min-width: 90%;
  box-sizing: border-box;
  padding: 10px;
  margin: 25px;
  border-radius: 10px;
}
</style>
