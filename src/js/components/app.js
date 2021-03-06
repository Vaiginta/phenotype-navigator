/* global window */
import React, { Component } from 'react';

class App extends Component {

  constructor () {
    super();
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render () {

    const {
      searchResults,
      setInput,
      searchTerm,
      inputVal,
      getRelationship,
      siblings,
      parent,
      closeSiblingsTable,
      relationshipTable,
      toggle,
      searchResultsRelationshipTable,
      compareNodes,
      currentNode
    } = this.props;

    let highlightSearchValue = (value) => {
      let valueLowerCase = value.toLowerCase();
      let inputValLowerCase = inputVal.toLowerCase();
      if (valueLowerCase.indexOf(inputValLowerCase) !== -1) {
        let valArr = valueLowerCase.split(inputValLowerCase);
        return <span>
                  <span>{valArr[0]}</span>
                  <span style={{backgroundColor:'rgba(247, 155, 56, 0.5)'}}>
                    { inputVal }
                  </span>
                  <span>{valArr[1]}</span>
                </span>
      } else {
        return value;
      }
    };

    return (
      <div className='app-root'>
        {siblings.size !== 0 && <div className='bg'></div>}
        <input onChange={e => setInput('inputVal', e.target.value)} />
        <div onClick={() => searchTerm('table', 'inputVal')} className='search-btn'>search</div>
        { searchResults.size !== 0 &&
          <div className='search-results'>
            { 'search results: ' +  searchResults.length }
            <div className='search-results-row'>
              <div className='search-results-cell header'>name</div>
              <div className='search-results-cell header'>synonym</div>
              <div className='search-results-cell header'>graph</div>
            </div>
            { searchResults.map(val => {
                    return (
                      <div  className='search-results-row'>
                        <div className='search-results-cell'>
                          { val['name'] && highlightSearchValue(val['name']) }
                        </div>
                        <div className='search-results-cell'>
                          { val['synonym'] && highlightSearchValue(val['synonym']) }
                        </div>
                        <div className='search-results-cell relationship'>
                          <div onClick={() => getRelationship(val)}>see a graph</div>
                        </div>
                      </div>
                    );
              } ) }
            { siblings.size !== 0 &&
                <div className='siblings-table'>
                  <div className='close-btn' onClick={closeSiblingsTable}>
                    close
                  </div>
                  <div>
                    <div className='parent'>
                      <div>{parent.split('!')[1]}</div>
                    </div>
                    <div className='children'>
                      { siblings.map(s => {
                          return (
                            <div
                              className = { 'child ' + (currentNode['name'] === s['name']
                                && 'current-node') }
                            >
                              {s['name']}
                            </div>
                          );
                      } ) }
                    </div>
                  </div>
                </div> }

          </div> }
      </div>
    );
  }
}

export default App;
