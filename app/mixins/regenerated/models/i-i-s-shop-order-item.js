import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import {validator} from 'ember-cp-validations';
import {attr, belongsTo, hasMany} from 'ember-flexberry-data/utils/attributes';
import {computed} from '@ember/object';
import {presence, disabled} from 'ember-cp-validations'
import OrderStatusEnum from "../../../enums/i-i-s-shop-order-status";

export let Model = Mixin.create({
  order: DS.belongsTo('i-i-s-shop-order', {inverse: 'orderItem', async: false}),
  product: DS.belongsTo('i-i-s-shop-product', {inverse: null, async: false}),
  amount: DS.attr('number'),
  priceWTaxes: DS.attr('decimal'),
  /**
   Non-stored property.

   @property totalSum
   */
  totalSum: DS.attr('decimal'),
  /**
   Method to set non-stored property.
   Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
   Please, implement 'totalSumCompute' method in model class (outside of this mixin) if you want to compute value of 'totalSum' property.

   @method _totalSumCompute
   @private
   @example
   ```javascript
   _totalSumChanged: on('init', observer('totalSum', function() {
        once(this, '_totalSumCompute');
      }))
   ```
   */
  // _totalSumCompute: function() {
  //   let result = (this.totalSumCompute && typeof this.totalSumCompute === 'function') ? this.totalSumCompute() : null;
  //   this.set('totalSum', result);
  // },


});

export let ValidationRules = {
  order: {
    descriptionKey: 'models.i-i-s-shop-order-item.validations.order.__caption__',
    validators: [
      validator('ds-error'),
      validator('presence', true),
    ],
  },
  amount: {
    descriptionKey: 'models.i-i-s-shop-order-item.validations.amount.__caption__',
    validators: [
      validator('ds-error'),
      validator('number', {allowString: true, allowBlank: true, integer: true}),
      validator('check-product-amount', {
        showSuggestions: false,
        disabled: computed('model.order.status', function () {
          return this.get('model.order.isBlocked');
        })
      }),
    ],
  },
  priceWTaxes: {
    descriptionKey: 'models.i-i-s-shop-order-item.validations.priceWTaxes.__caption__',
    validators: [
      validator('ds-error'),
      validator('number', {allowString: true, allowBlank: true}),
    ],
  },
  totalSum: {
    descriptionKey: 'models.i-i-s-shop-order-item.validations.totalSum.__caption__',
    validators: [
      validator('ds-error'),
      validator('number', {allowString: true, allowBlank: true}),
    ],
  },
  product: {
    descriptionKey: 'models.i-i-s-shop-order-item.validations.product.__caption__',
    validators: [
      validator('ds-error'),
      validator('presence', true),
    ],
  },

};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('OrderItemE', 'i-i-s-shop-order-item', {
    product: belongsTo('i-i-s-shop-product', 'Товар', {
      name: attr('~', {index: 4, hidden: true}),
      price: attr('~', {index: 5, hidden: true}),
      weight: attr('~', {index: 6, hidden: true})
    }, {index: 0, displayMemberPath: 'name'}),
    amount: attr('Количество', {index: 1}),
    priceWTaxes: attr('Цена с налогом', {index: 2}),
    totalSum: attr('Сумма по позиции', {index: 3}),
  });

  modelClass.defineProjection('OrderItemInOrderL', 'i-i-s-shop-order-item', {
    amount: attr('~', {index: 1, hidden: true}),
    priceWTaxes: attr('~', {index: 2, hidden: true}),
    product: belongsTo('i-i-s-shop-product', '~', {
      price: attr('~', {index: 3, hidden: true})
    }, {index: 0, hidden: true})
  });
};
