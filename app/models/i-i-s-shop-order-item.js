import {buildValidations} from 'ember-cp-validations';
import EmberFlexberryDataModel from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
import {computed, observer} from '@ember/object';
import {on} from '@ember/object/evented';
import {once} from '@ember/runloop';
import {
  defineProjections, ValidationRules, Model as OrderItemMixin
} from '../mixins/regenerated/models/i-i-s-shop-order-item';

const Validations = buildValidations(ValidationRules, {
  dependentKeys: ['model.i18n.locale'],
});

let Model = EmberFlexberryDataModel.extend(OfflineModelMixin, OrderItemMixin, Validations, {
  //taxes: 0.10,
  // _priceWTaxesComputed: function (){
  //   console.log('this._priceWTaxesComputed');
  //   return this._price;
  // },
  actualPriceWTaxes: computed('product','product.price', function () {
    let price = 0;
    if (!this.get('order.isBlocked')) {
      price = Number(this.get('product.price') || 0) * 1.1
      console.log('product: ' + price);
    } else {
      console.log('current: ');
      price = Number(this.get('priceWTaxes') || 0);
      console.log(price);
    }
    return price;
  }),
  actualPriceWTaxesFixed: computed('actualPriceWTaxes', function () {
    return this.actualPriceWTaxes.toFixed(2)
  }),

  actualTotalSum: computed('actualPriceWTaxes','amount', function () {
    const price = this.actualPriceWTaxes;
    const amount = Number(this.get('amount') || 0);
    return price * amount;
  }),

  actualTotalSumFixed: computed('actualTotalSum', function () {
    let ats = this.actualTotalSum;
    return ats.toFixed(2)
  }),

  // _priceWTaxesChanged: on('init', observer('product', function () {
  //   if (!this.get('order.isBlocked')) {
  //     once(this, function () {
  //       const price = Number(this.get('product.price') || 0);
  //       this.set('priceWTaxes', price * 1.1)
  //     })
  //   }
  // })),
});

defineProjections(Model);
export default Model;
