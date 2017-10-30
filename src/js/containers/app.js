import {connect} from 'react-redux'
import App from '../components/app.js'
import * as actionCreators from '../actions/app.js';

const mapStateToProps = state => {
  return {
    data: state.getIn(['app', 'data']),
    searchResults: state.getIn(['app', 'table', 'searchResults']),
    searchResultsRelationshipTable: state.getIn(['app', 'searchResultsRelationshipTable', 'searchResults']),
    inputVal: state.getIn(['app', 'inputVal']),
    siblings: state.getIn(['app', 'siblings']),
    parent: state.getIn(['app', 'parent']),
    relationshipTable: state.getIn(['app', 'relationshipTable'])
  }
}

const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App)

export default AppContainer;
