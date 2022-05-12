export default {
  projections: {
    OrderItemE: {
      amount: {
        __caption__: 'Количество'
      },
      priceWTaxes: {
        __caption__: 'Цена с налогом'
      },
      totalSum: {
        __caption__: 'Сумма по позиции'
      },
      product: {
        __caption__: 'Продукт',
        name: {
          __caption__: '~'
        },
        price: {
          __caption__: '~'
        }
      }
    },
    OrderItemInOrderL: {
      amount: {
        __caption__: '~'
      },
      priceWTaxes: {
        __caption__: '~'
      },
      product: {
        __caption__: '~',
        price: {
          __caption__: '~'
        }
      }
    }
  },
  validations: {
    amount: {
      __caption__: 'Количество'
    },
    priceWTaxes: {
      __caption__: 'Цена с налогом'
    },
    totalSum: {
      __caption__: 'Сумма по позиции'
    },
    product: {
      __caption__: 'Продукт'
    },
    order: {
      __caption__: 'order'
    }
  }
};
