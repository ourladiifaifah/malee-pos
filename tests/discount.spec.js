const { test } = require('node:test');
const assert = require('node:assert');
const { applyDiscount, clearDiscount, calculateDiscount } = require('../discount');

function createState(input) {
  return {
    discountInput: { value: input },
    discountType: { value: null },
    discountValue: { value: 0 }
  };
}

test('applies fixed amount discount (THB)', () => {
  const state = createState(50);
  applyDiscount(state.discountInput, state.discountType, state.discountValue, 'thb');
  assert.strictEqual(state.discountType.value, 'thb');
  assert.strictEqual(state.discountValue.value, 50);
  const amount = calculateDiscount(state.discountType, state.discountValue, 500);
  assert.strictEqual(amount, 50);
});

test('applies percentage discount', () => {
  const state = createState(10);
  applyDiscount(state.discountInput, state.discountType, state.discountValue, 'percent');
  assert.strictEqual(state.discountType.value, 'percent');
  assert.strictEqual(state.discountValue.value, 10);
  const amount = calculateDiscount(state.discountType, state.discountValue, 200);
  assert.strictEqual(amount, 20);
});

test('clears discount values', () => {
  const state = createState(30);
  applyDiscount(state.discountInput, state.discountType, state.discountValue, 'thb');
  clearDiscount(state.discountInput, state.discountType, state.discountValue);
  assert.strictEqual(state.discountType.value, null);
  assert.strictEqual(state.discountValue.value, 0);
  assert.strictEqual(state.discountInput.value, null);
});
