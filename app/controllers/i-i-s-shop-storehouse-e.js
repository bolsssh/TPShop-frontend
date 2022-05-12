import EditFormController from 'ember-flexberry/controllers/edit-form';
import {  SimplePredicate,}   from 'ember-flexberry-data/query/predicate';

export default EditFormController.extend({
  parentRoute: 'i-i-s-shop-storehouse-l',

  init() {
    this._super(...arguments);
    this.set('storekeeperLimitPredicate', new SimplePredicate('position', 'eq', 'Storekeeper'));
  },

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'i-i-s-shop-store-product+product':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'nameWCode',
            required: true,
            relationName: 'product',
            projection: 'ProductL',
            autocomplete: true,
          };
          break;

      }
    }

    return cellComponent;
  },
});
