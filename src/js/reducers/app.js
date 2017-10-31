import Immutable, { Map } from 'immutable';
import createReducer
  from './createReducer.js';
import {
  TOGGLE,
  FETCH_DATA,
  SEARCH_TERM,
  SET_INPUT,
  GET_RELATIONSHIP,
  CLOSE_SIBLINGS_TABLE,
  COMPARE_NODES
} from '../action_types.js';

export const initialState = Immutable.fromJS({
  toggledValue:false,
  table: {searchResults:[]},
  searchResultsRelationshipTable: {searchResults:[]},
  inputVal:'',
  siblings:[],
  parent:'',
  relationshipTable:false,
  currentNode:{}
});

export const fetchData = (state, {data, path}) => {
  return state.set(path, data);
};

export const searchTerm = (state, {path, inputPath}) => {
  let data = state.get('data');
  let searchValue = state.get(inputPath);
  let matchingValues = data.filter(d =>
    (d['synonym'] && d['synonym'].indexOf(searchValue) !== -1)
    || d['name'].indexOf(searchValue) !== -1
  )
  return state.setIn([path, 'searchResults'], matchingValues);
};

export const toggle = (state, {path}) => {
  let currentValue = state.get(path);

  return state.set(path, !currentValue);
};

export const setInput = (state, {path, inputVal}) => {
  return state.set(path, inputVal);
};

export const closeSiblingsTable = (state, {}) => {
  return state.set('siblings', Immutable.fromJS([])).set('parent', '');
}

export const getRelationship = (state, {val}) => {
  let children = state.get('data').filter(d =>
    d['is_a'] === val['is_a']
  );
  return state
          .set('siblings', children)
          .set('parent', val['is_a'])
          .set('currentNode', val)
  ;
};

export default createReducer(
  initialState,
  {
    [TOGGLE] : toggle,
    [FETCH_DATA] : fetchData,
    [SEARCH_TERM] : searchTerm,
    [SET_INPUT] : setInput,
    [GET_RELATIONSHIP] : getRelationship,
    [CLOSE_SIBLINGS_TABLE] : closeSiblingsTable
  }
);
