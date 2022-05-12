// import Builder from 'ember-flexberry-data/query/builder';
import {generateNotOrPredicateByList} from '../utils/generate-predicate-by-list';


export default function generatePredicateForOrderUnique(property, condition, list) {
  // console.log('stored')
  // console.dir(list)
  return generateNotOrPredicateByList(property, condition, list);
}
export {
  generatePredicateForOrderUnique
};
