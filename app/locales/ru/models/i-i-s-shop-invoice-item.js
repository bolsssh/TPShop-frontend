export default {
  projections: {
    InvoiceItemE: {
      product: {
        __caption__: '~',
        name: {
          __caption__: '~'
        }
      },
      amount: {
        __caption__: 'Количество'
      },
      weight: {
        __caption__: 'Вес (кг)'
      },
      price: {
        __caption__: 'Цена'
      },
      totalSum: {
        __caption__: 'Сумма по позиции'
      }
    }
  },
  validations: {
    amount: {
      __caption__: 'Количество'
    },
    weight: {
      __caption__: 'Вес (кг)'
    },
    price: {
      __caption__: 'Цена'
    },
    totalSum: {
      __caption__: 'Сумма по позиции'
    },
    product: {
      __caption__: '~'
    },
    invoice: {
      __caption__: 'invoice'
    }
  }
};
