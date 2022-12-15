import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Symbol from './Symbol';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    capitalizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalizeLetter(this.props.category)}- Fenko Super Fast News`;
    }

    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=9f7d59329dfa47108b042cca6f3546f7&category=${this.props.category}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let jsonData = await data.json();
        this.props.setProgress(50);
        this.setState({
            article: jsonData.articles,
            totalResults: jsonData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=9f7d59329dfa47108b042cca6f3546f7&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({
            article: this.state.article.concat(jsonData.articles),
            totalResults: jsonData.totalResults,
            loading: false
        });
    }

    render() {
        return (
            <>
                <div className="container" style={{marginTop: '90px'}}>
                    <h1 className='text-center'>Fenkoo Super Fast {this.capitalizeLetter(this.props.category)} News</h1>
                    <hr />
                </div>
                {this.state.loading && <Symbol />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Symbol />} >
                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.article.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : "..."} description={element.description ? element.description.slice(0, 80) : "..."} imgUrl={element.urlToImage ? element.urlToImage : "https://profile.usatoday.com/newsletters/resources/usat/property/usatoday/newsletter-thumbs/8872UT-E-NLETTER02@2x.jpg"} newsUrl={element.url}
                                        author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </ >
        )
    }
}