import $ from 'jquery';
import {buildValidations} from 'ember-cp-validations';
import OrderStatusEnum from '../enums/i-i-s-shop-order-status';
import {computed} from '@ember/object';

import {
  defineBaseModel,
  defineProjections,
  ValidationRules,
  Model as OrderMixin
} from '../mixins/regenerated/models/i-i-s-shop-order';

import DocumentModel from './i-i-s-shop-document';
import {ValidationRules as ParentValidationRules} from '../mixins/regenerated/models/i-i-s-shop-document';

const Validations = buildValidations($.extend({}, ParentValidationRules, ValidationRules), {
  dependentKeys: ['model.i18n.locale'],
});

let Model = DocumentModel.extend(OrderMixin, Validations, {
  isBlocked: computed('status', function () {
    const status = this.get('status');
    const dirtyAttributes = this.get('hasDirtyAttributes');
    let res = (status === OrderStatusEnum.Paid || status === OrderStatusEnum.Canceled) && !dirtyAttributes;
    console.log('blocked: ' + res);
    return res;
  }),

  actualTotalSum: computed('orderItem.@each.{actualTotalSum}', function () {
    return this.get('orderItem').reduce((sum, item) => {
      //const actualPrice = Number(item.get('product.price')|| 0) * 1.1;
      //const amount = Number(item.get('amount') || 0);
      // if (Number.isNaN(actualPrice) || Number.isNaN(amount)) {
      //   throw new Error(`Invalid 'price' or 'amount' for order item: '${item}'.`);
      // }
      return sum + item.get('actualTotalSum');
      //return sum + actualPrice* amount ;
    }, 0);
  }),

  actualTotalSumFixed: computed('actualTotalSum', function () {
    let ats = this.actualTotalSum;
    return ats.toFixed(2)
  }),
});

defineBaseModel(Model);
defineProjections(Model);

export default Model;
