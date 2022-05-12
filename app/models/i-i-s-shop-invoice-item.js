import { buildValidations } from 'ember-cp-validations';
import EmberFlexberryDataModel from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
import { computed } from '@ember/object';

import {
  defineProjections,
  ValidationRules,
  Model as InvoiceItemMixin
} from '../mixins/regenerated/models/i-i-s-shop-invoice-item';

const Validations = buildValidations(ValidationRules, {
  dependentKeys: ['model.i18n.locale'],
});

let Model = EmberFlexberryDataModel.extend(OfflineModelMixin, InvoiceItemMixin, Validations, {
  nameWCode: computed('productCode', 'name', function() {
    let code = this.get('productCode');
    let name = this.get('name');
    return `<${code}> ${name}`;
  }),
});

defineProjections(Model);

export default Model;
