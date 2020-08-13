import React, { Component } from 'react'

// 1. componente con state
export default class SearchBar extends Component {
    state = {
        search: ""
    }


    handleSearchInput = (event) => {
        const searchStr =  event.target.value;

        this.setState({ search: searchStr });

        this.props.filterFood(searchStr);
    }

    // 3. vincular el formulario con el state
    render() {

        return (
            <div>

                {/* 2. formulario  */}
                <input 
                    type="text" 
                    name="search" 
                    value={this.state.search} 
                    onChange={this.handleSearchInput} 
                    />
            </div>
        )
    }
}
