import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import {validator} from 'ember-cp-validations';
import {attr, belongsTo, hasMany} from 'ember-flexberry-data/utils/attributes';
import OrderStatusEnum from '../../../enums/i-i-s-shop-order-status';
import {computed} from '@ember/object';
import {presence,disabled} from 'ember-cp-validations'

export let Model = Mixin.create({
  status: DS.attr('i-i-s-shop-order-status', {defaultValue: OrderStatusEnum.New}),
  shipmentDate: DS.attr('date'),
  paymentDate: DS.attr('date'),
  totalSum: DS.attr('decimal'),
  manager: DS.belongsTo('i-i-s-shop-employee', {inverse: null, async: false}),
  orderItem: DS.hasMany('i-i-s-shop-order-item', {inverse: 'order', async: false})
});

export let ValidationRules = {
  status: {
    descriptionKey: 'models.i-i-s-shop-order.validations.status.__caption__',
    validators: [
      validator('ds-error'),
    ],
  },
  shipmentDate: {
    descriptionKey: 'models.i-i-s-shop-order.validations.shipmentDate.__caption__',
    validators: [
      validator('ds-error'),
      validator('date'),
    ],
  },
  paymentDate: {
    descriptionKey: 'models.i-i-s-shop-order.validations.paymentDate.__caption__',
    validators: [
      validator('ds-error'),
      validator('date'),
      validator('presence', {
          presence: true,
          disabled: computed('model.status', function () {
            return this.get('model.status') !== OrderStatusEnum.Paid;
          })
        }
      )
    ],
  },

  totalSum: {
    descriptionKey: 'models.i-i-s-shop-order.validations.totalSum.__caption__',
    validators:
      [
        validator('ds-error'),
        validator('number', {allowString: true, allowBlank: true}),
      ],
  },
  manager: {
    descriptionKey: 'models.i-i-s-shop-order.validations.manager.__caption__',
    validators:
      [
        validator('ds-error'),
        validator('presence', true),
      ],
  },
  orderItem: {
    descriptionKey: 'models.i-i-s-shop-order.validations.orderItem.__caption__',
    validators:
      [
        validator('ds-error'),
        validator('has-many'),
      ],
  },
};

export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'i-i-s-shop-document'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('OrderE', 'i-i-s-shop-order', {
    number: attr('Номер', {index: 0}),
    status: attr('Статус', {index: 1}),
    createDate: attr('Дата оформления', {index: 2}),
    manager: belongsTo('i-i-s-shop-employee', 'Менеджер', {
      lastName: attr('~', {index: 4, hidden: true}),
      middleName: attr('~', {index: 5, hidden: true}),
      firstName: attr('~', {index: 6, hidden: true})
    }, {index: 3, displayMemberPath: 'lastName'}),
    totalSum: attr('Сумма заказа', {index: 7}),
    paymentDate: attr('Дата оплаты', {index: 8}),
    shipmentDate: attr('Дата отгрузки', {index: 9}),
    orderItem: hasMany('i-i-s-shop-order-item', 'Содержимое заказа', {
      amount: attr('Количество', {index: 1}),
      priceWTaxes: attr('Цена с налогом', {index: 2}),
      totalSum: attr('Сумма по позиции', {index: 3}),
      product: belongsTo('i-i-s-shop-product', 'Товар', {
        name: attr('~', {index: 4, hidden: true}),
        price: attr('~', {index: 5, hidden: true})
      }, {index: 0, displayMemberPath: 'name'})
    })
  });

  modelClass.defineProjection('OrderL', 'i-i-s-shop-order', {
    number: attr('Номер', {index: 0}),
    status: attr('Статус', {index: 1}),
    createDate: attr('Дата оформления', {index: 2}),
    manager: belongsTo('i-i-s-shop-employee', 'Менеджер', {
      lastName: attr('Менеджер', {index: 3})
    }, {index: -1, hidden: true}),
    totalSum: attr('Стоимость заказа', {index: 4}),
    paymentDate: attr('Дата оплаты', {index: 5}),
    shipmentDate: attr('Дата отгрузки', {index: 6}),
    orderItem: hasMany('i-i-s-shop-order-item', '', {
      amount: attr('~', {index: 0, hidden: true}),
      priceWTaxes: attr('~', {index: 1, hidden: true}),
      product: belongsTo('i-i-s-shop-product', '~', {
        price: attr('~', {index: 3, hidden: true})
      }, {index: 2, hidden: true})
    })
  });
};
