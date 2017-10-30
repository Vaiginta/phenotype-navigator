import {
  TOGGLE,
  FETCH_DATA,
  SEARCH_TERM,
  SET_INPUT,
  GET_RELATIONSHIP,
  CLOSE_SIBLINGS_TABLE
 } from '../action_types.js';

import axios from 'axios';

export const closeSiblingsTable = () => {
  return {
    type: CLOSE_SIBLINGS_TABLE
  }
}

export const searchTerm = (path, inputPath) => {

  return {
    type: SEARCH_TERM,
    path,
    inputPath
 };
};

export const getRelationship = (parentId) => {

  return {
    type: GET_RELATIONSHIP,
    parentId
 };
};


export const setInput = (path, inputVal) => {

  return {
    type: SET_INPUT,
    inputVal,
    path
 };
};

export const toggle = (path) => {

  return {
    type: TOGGLE,
    path
 };
};

export const fetchData = () => dispatch => {
  axios.get('https://raw.githubusercontent.com/obophenotype/human-phenotype-ontology/master/hp.obo')
    .then((response) => {
      let arr = response.data.split('[Term]');
      arr.shift();
      var arrayOfTerms = [];
      arr.forEach(el => {
        var obj = {};
        el.split('\n').filter(a => a !== '').forEach(a => {
          let keyVal = a.split(': ');
          obj[keyVal[0]] = keyVal[1];
        });
        arrayOfTerms.push(obj);
      });
      return dispatch({
        type: FETCH_DATA,
        data:arrayOfTerms,
        path:'data',
      });
    })
    .catch(err => {
      console.log(err);
    });
}
