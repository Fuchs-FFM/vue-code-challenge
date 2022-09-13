import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import TransactionApplication from '@/components/TransactionApplication.vue';
import TransactionDisplay from '@/components/TransactionDisplay.vue';
import CardDisplay from '@/components/CardDisplay.vue';

describe('TransactionApplication.vue', () => {
  // Helper method
  async function expectTransactionsAfterAmountUpdate(
    wrapper: VueWrapper<any>,
    amount: any,
    noOfTransaction: number,
  ) {
    const amountInput = wrapper.find('input');
    amountInput.setValue(amount);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(noOfTransaction);
  }

  it('Component renders', () => {
    const wrapper = shallowMount(TransactionApplication, {});
    expect(wrapper.exists);
  });

  it('Component filters by selected card', async () => {
    const wrapper = mount(TransactionApplication, {});
    const cards = wrapper.findAllComponents(CardDisplay);
    expect(cards.length).toBe(2);
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(6);

    cards[0].trigger('click');
    expect(wrapper.vm.selectedCard).toBe(cards[0].props().card.id);

    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(3);
    wrapper.findAllComponents(TransactionDisplay).forEach((row) => {
      expect(row.props().transaction.parentId).toBe(cards[0].props().card.id);
    });

    cards[1].trigger('click');
    expect(wrapper.vm.selectedCard).toBe(cards[1].props().card.id);

    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(3);
    wrapper.findAllComponents(TransactionDisplay).forEach((row) => {
      expect(row.props().transaction.parentId).toBe(cards[1].props().card.id);
    });

    cards[1].trigger('click');
    expect(wrapper.vm.selectedCard).toBe('');

    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(6);
  });

  it('Amount field gets cleared after card click', async () => {
    const wrapper = mount(TransactionApplication, {});
    const amountInput = wrapper.find('input');
    expect(amountInput.element.value).toBe('0');
    amountInput.setValue(100);
    expect(amountInput.element.value).toBe('100');

    wrapper.findAllComponents(CardDisplay)[0].trigger('click');
    await wrapper.vm.$nextTick();
    expect(amountInput.element.value).toBe('0');
  });

  it('Component filters by amount field', async () => {
    const wrapper = mount(TransactionApplication, {});
    expect(wrapper.findAllComponents(TransactionDisplay).length).toBe(6);

    // only amount: 288.38, description: 'Tickets' and amount: 533.48, description: 'Smart Phone'
    await expectTransactionsAfterAmountUpdate(wrapper, 200, 2);
    expect(wrapper.findAllComponents(TransactionDisplay)[0].html()).toContain('Tickets');
    expect(wrapper.findAllComponents(TransactionDisplay)[1].html()).toContain('Smart Phone');

    await expectTransactionsAfterAmountUpdate(wrapper, 0, 6);

    await expectTransactionsAfterAmountUpdate(wrapper, -50, 6);

    await expectTransactionsAfterAmountUpdate(wrapper, null, 6);
  });
});
