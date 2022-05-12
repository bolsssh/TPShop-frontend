export default {
  projections: {
    InvoiceE: {
      number: {
        __caption__: 'Номер'
      },
      status: {
        __caption__: 'Статус'
      },
      createDate: {
        __caption__: 'Дата оформления'
      },
      order: {
        __caption__: 'Заказ',
        number: {
          __caption__: '~'
        }
      },
      customerName: {
        __caption__: 'Получатель'
      },
      totalSum: {
        __caption__: 'Сумма заказа'
      },
      totalWeight: {
        __caption__: 'Вес заказа (кг)'
      },
      note: {
        __caption__: 'Примечание'
      },
      shipmentDateTime: {
        __caption__: 'Дата и время отгрузки'
      },
      responsiblePerson: {
        __caption__: 'Менеджер',
        lastName: {
          __caption__: '~'
        }
      },
      invoiceItem: {
        __caption__: 'Список товаров к выдаче',
        product: {
          __caption__: 'Название товара',
          name: {
            __caption__: 'Название товара'
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
    InvoiceL: {
      number: {
        __caption__: 'Номер'
      },
      status: {
        __caption__: 'Статус'
      },
      createDate: {
        __caption__: 'Дата оформления'
      },
      order: {
        __caption__: '',
        number: {
          __caption__: ''
        }
      },
      customerName: {
        __caption__: 'Получатель'
      },
      totalSum: {
        __caption__: 'Сумма заказа'
      },
      totalWeight: {
        __caption__: 'Вес заказа (кг)'
      },
      note: {
        __caption__: 'Примечание'
      },
      shipmentDateTime: {
        __caption__: 'Дата и время отгрузки'
      },
      responsiblePerson: {
        __caption__: 'Товар выдал',
        lastName: {
          __caption__: 'Товар выдал'
        }
      }
    }
  },
  validations: {
    status: {
      __caption__: 'Статус'
    },
    shipmentDateTime: {
      __caption__: 'Дата и время отгрузки'
    },
    totalSum: {
      __caption__: 'Сумма заказа'
    },
    totalWeight: {
      __caption__: 'Вес заказа (кг)'
    },
    note: {
      __caption__: 'Примечание'
    },
    customerName: {
      __caption__: 'Получатель'
    },
    order: {
      __caption__: '~'
    },
    responsiblePerson: {
      __caption__: '~'
    },
    invoiceItem: {
      __caption__: 'Список товаров к выдаче'
    }
  }
};
