import React from 'react';
import axios from 'axios'
import '../Search.css';
import Loader from '../loader.gif';

const API_ENDPOINT = 'http://localhost:8080/search?q=';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
        };
        this.cancel = '';
    }

    handleOnInputChangeInSearchField = (event) => {
        const query = event.target.value;

        if (!query) {
            this.setState({query, results: {}, message: '', totalPages: 0, totalResults: 0});
        } else {
            this.setState({query, loading: true, message: ''}, () => {
                this.fetchSearchResults(query);
            });
        }
    };

    fetchSearchResults = (query) => {
        const searchUrl = API_ENDPOINT + query;
        console.log(searchUrl);
        if (this.cancel) {
            this.cancel.cancel();

        }
        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token,
        }).then((res) => {
            const resultNotFoundMsg = !res.length ? 'No result is found' : '';
            console.log("mozammal " + JSON.stringify(res.data))
            this.setState({
                results: res.data,
                message: resultNotFoundMsg,
                loading: false,
            })
        })
    };

    renderSearchResults = () => {
        const {results} = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div key={result.id} className="result-box">
                                <p>
                                    <h2>{result.articleContent.description}</h2>
                                </p>
                                <a href={result.articleContent.url}>
                                    click for More...
                                </a>
                                <div className="image-wrapper">
                                    <img className="image" src={result.articleContent.urlToImage} alt={result.user}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };


    render() {
        const {query} = this.state;
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Full index search</h2>
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChangeInSearchField}
                    />
                    <i className="fa fa-search search-icon"/>
                </label>
                {/*Result*/}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default Search;