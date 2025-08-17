function applyDiscount(discountInput, discountType, discountValue, type) {
  if (discountInput.value > 0) {
    discountType.value = type;
    discountValue.value = discountInput.value;
  }
}

function clearDiscount(discountInput, discountType, discountValue) {
  discountInput.value = null;
  discountType.value = null;
  discountValue.value = 0;
}

function calculateDiscount(discountType, discountValue, subtotal) {
  if (!discountType.value || !discountValue.value) return 0;
  if (discountType.value === 'percent') {
    return subtotal * (discountValue.value / 100);
  }
  if (discountType.value === 'thb') {
    return discountValue.value;
  }
  return 0;
}

const discountUtils = { applyDiscount, clearDiscount, calculateDiscount };

if (typeof module !== 'undefined') {
  module.exports = discountUtils;
}

if (typeof window !== 'undefined') {
  window.discountUtils = discountUtils;
}
