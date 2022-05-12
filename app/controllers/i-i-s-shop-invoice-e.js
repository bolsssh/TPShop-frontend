import EditFormController from 'ember-flexberry/controllers/edit-form';
import {  SimplePredicate,}   from 'ember-flexberry-data/query/predicate';
//import generatePredicateForOrderUnique from '../utils/generate-predicate-for-order-unique';
// import {generateNotOrPredicateByList} from '../utils/generate-predicate-by-list';

export default EditFormController.extend({
  parentRoute: 'i-i-s-shop-invoice-l',

  init() {
    this._super(...arguments);
    this.set('storekeeperLimitPredicate', new SimplePredicate('position', 'eq', 'Storekeeper'));
    //let store = this.get('store')
    // const query = new Builder(store, 'i-i-s-shop-invoice')
    //   .selectByProjection('InvoiceE')
    //   .build();

    // let reservedOrders
    // store.query('i-i-s-shop-invoice', query)
    //   .then((invoices) => {
    //     invoices.map((invoice) => {
    //       reservedOrders.push(invoice.get('order'))
    //     })
    //   })

    //this.set('generatePredicateForOrderUnique', generatePredicateForOrderUnique('number', 'eq',reservedOrders));
  },

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'i-i-s-shop-invoice-item+product':
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
})

