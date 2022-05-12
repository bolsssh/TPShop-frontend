import $ from 'jquery';
import {buildValidations} from 'ember-cp-validations';
import {computed} from '@ember/object';
import Builder from 'ember-flexberry-data/query/builder';
import generateUniqueId from 'ember-flexberry-data/utils/generate-unique-id';
import {observer} from '@ember/object';
import {
  defineBaseModel,
  defineProjections,
  ValidationRules,
  Model as InvoiceMixin
} from '../mixins/regenerated/models/i-i-s-shop-invoice';

import DocumentModel from './i-i-s-shop-document';
import {ValidationRules as ParentValidationRules} from '../mixins/regenerated/models/i-i-s-shop-document';

const Validations = buildValidations($.extend({}, ParentValidationRules, ValidationRules), {
  dependentKeys: ['model.i18n.locale'],
});

let Model = DocumentModel.extend(InvoiceMixin, Validations, {

  _loadItemsFromOrder: observer('order', function () {
    //this.set('order', order);
    let order = this.get('order')
    this.get('invoiceItem').toArray().forEach((item) => {
      item.deleteRecord();
    });
    if (!order) {
      return;
    }
    const store = this.get('store');
    const modelName = 'i-i-s-shop-order-item';

    const query = new Builder(store, modelName)
      .selectByProjection('OrderItemE')
      .where('order', 'eq', order.get('id'))
      .build();
    let inv = this;
    store.query(modelName, query).then((orderItems) => {
      const invoiceItems = orderItems.map((orderItem) => {
        const id = generateUniqueId();
        const price = orderItem.get('actualPriceWTaxes');
        const totalSum = orderItem.get('totalSum');
        const product = orderItem.get('product');
        const amount = Number(orderItem.get('amount'));
        const weight = Number(product.get('weight')) * amount;
        return store.createRecord('i-i-s-shop-invoice-item', {
          id, amount, weight, price, totalSum, product, inv
        });
      });
      this.get('invoiceItem').pushObjects(invoiceItems);
    }).finally(() => {
      inv.set('orderItemsLoading', false);
    });
  }),
  actualTotalSum: computed('invoiceItem', function () {
    const items = this.get('invoiceItem');
    return items === undefined ? 0 :
      items.reduce((sum, item) => {
        const actualPrice = Number(item.get('price') || 0);
        const amount = Number(item.get('amount') || 0);
        if (Number.isNaN(actualPrice) || Number.isNaN(amount)) {
          throw new Error(`Invalid 'price' or 'amount' for order item: '${item}'.`);
        }
        return sum + actualPrice * amount;
      }, 0);
  }),
  actualTotalWeight: computed('invoiceItem', function () {
    const items = this.get('invoiceItem');
    return items === undefined ? 0 :
      items.reduce((sum, item) => {
        const weight = Number(item.get('weight') || 0);
        const amount = Number(item.get('amount') || 0);
        if (Number.isNaN(weight) || Number.isNaN(amount)) {
          throw new Error(`Invalid 'weight' or 'amount' for invoice item: '${item}'.`);
        }
        return sum + weight * amount;

      }, 0);
  }),

});

defineBaseModel(Model);
defineProjections(Model);

export default Model;
