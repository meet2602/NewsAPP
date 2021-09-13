import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    // articles = [
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Afghanistan: US investigating civilian deaths in Kabul strike",
    //         "description": "The strike aimed to stop a suicide bomber, but reportedly left nine Afghan civilians dead.",
    //         "url": "http://www.bbc.co.uk/news/world-asia-58380791",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/3554/production/_120325631_hi069989698.jpg",
    //         "publishedAt": "2021-08-30T08:52:23.5609265Z",
    //         "content": "image captionUS troops have been on high alert as the deadline for withdrawal approaches\r\nThe US military has said it is investigating after at least nine Afghan civilians were reportedly killed in a… [+2652 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Yongbyon: UN says North Korea appears to restart nuclear reactor",
    //         "description": "A UN report says the reactor, which can produce plutonium for weapons, has been active since July.",
    //         "url": "http://www.bbc.co.uk/news/world-asia-58380547",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/9DB4/production/_120327304_tv068959469.jpg",
    //         "publishedAt": "2021-08-30T08:07:22.326957Z",
    //         "content": "image captionNorth Korea has continued to develop nuclear weapons since IAEA inspectors were expelled\r\nNorth Korea appears to have restarted its Yongbyon nuclear reactor, the UN atomic agency has sai… [+3026 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Afghanistan: Anti-missile system stops rockets fired at Kabul airport",
    //         "description": "The rockets were stopped by a US anti-missile system after being fired by unknown persons.",
    //         "url": "http://www.bbc.co.uk/news/live/world-58279900",
    //         "urlToImage": "https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/5.2.0/bbc_news_logo.png",
    //         "publishedAt": "2021-08-30T07:07:31.8894313Z",
    //         "content": "US National Security Advisor Jake Sullivan has said they will continue to carry out strikes in Afghanistan, after an attack at Kabul airport killed about 170 people.\r\n\"The president [Joe Biden] does … [+1042 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Afghanistan: UK pressure over Taliban safe passage pledge",
    //         "description": "The government is seeking international support to ensure the militants allow people to leave Afghanistan.",
    //         "url": "http://www.bbc.co.uk/news/uk-58380167",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/74A6/production/_120326892_gettyimages-1234933677.jpg",
    //         "publishedAt": "2021-08-30T02:37:24.8938842Z",
    //         "content": "By Doug FaulknerBBC News\r\nThe UK is seeking international agreement to ensure the Taliban sticks to its commitment to allow safe passage for Afghans and foreign nationals who want to leave Afghanista… [+3667 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Bodies of US troops killed in Kabul returned to America",
    //         "description": "A \"dignified transfer\" ceremony takes place at Dover Air Force Base, Delaware, to receive their remains.",
    //         "url": "http://www.bbc.co.uk/news/world-us-canada-58380339",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/0EB2/production/_120326730_p09tk6kj.jpg",
    //         "publishedAt": "2021-08-29T22:22:23.9321656Z",
    //         "content": "A \"dignified transfer\" ceremony took place at Dover Air Force Base, Delaware, as the 13 US soldiers killed in the Kabul airport attack were returned in flag-draped coffins. \r\nPresident Joe Biden atte… [+115 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Ed Asner: Lou Grant and Up actor dies aged 91",
    //         "description": "He'll be remembered for his roles as TV newsman Lou Grant and the lead voice role in Pixar hit Up.",
    //         "url": "http://www.bbc.co.uk/news/world-us-canada-58380089",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/BDB2/production/_120326584_gettyimages-87442266.jpg",
    //         "publishedAt": "2021-08-29T22:07:24.5547718Z",
    //         "content": "image captionAsner voiced an elderly widower in animated hit Up\r\nEd Asner, best-known for playing fictional TV newsman Lou Grant, has died aged 91.\r\nThe actor, whose roles also included voicing the l… [+1574 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC Sport",
    //         "title": "Messi makes PSG debut in 2-0 win",
    //         "description": "Lionel Messi makes his Paris St-Germain debut as a 66th-minute substitute in a 2-0 win at Reims in Ligue 1.",
    //         "url": "http://www.bbc.co.uk/sport/football/58375791",
    //         "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/10CF4/production/_120325886_messi_reuters.jpg",
    //         "publishedAt": "2021-08-29T21:37:41.376426Z",
    //         "content": "Lionel Messi came on for Neymar just after PSG went 2-0 up\r\nLionel Messi made his Paris St-Germain debut as a 66th-minute substitute in a 2-0 win at Reims in Ligue 1.\r\nThe Argentine, wearing his new … [+4794 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "Hurricane Ida: 'Catastrophic' storm surge as winds move onshore",
    //         "description": "The storm is bringing with it a potentially \"catastrophic\" storm surge of up to 4.8m, forecasters say.",
    //         "url": "http://www.bbc.co.uk/news/world-us-canada-58378788",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/12C8E/production/_120324967_nola.jpg",
    //         "publishedAt": "2021-08-29T17:22:21.6027939Z",
    //         "content": "image captionNew Orleans residents who had not left the city by Sunday were preparing to ride out the storm\r\nHurricane Ida has made landfall in the US state of Louisiana, with winds of 150mph (240km/… [+1738 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "What now for Afghans arriving in America?",
    //         "description": "Afghans land to start a new life in the US as hope dims for those left behind to face the Taliban.",
    //         "url": "http://www.bbc.co.uk/news/world-us-canada-58352130",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/8C32/production/_120309853_gettyimages-1336698025.jpg",
    //         "publishedAt": "2021-08-29T11:52:22.3130694Z",
    //         "content": "By Sam Farzaneh, Angélica Casas &amp; Indrani BasuBBC News in Virginia and Texas\r\nimage captionAfghan refugees arrive at Dulles airport\r\nA thin length of yellow tape cordoned off the new arrivals - h… [+6385 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "'I'm like a prisoner': Life in a Taliban city",
    //         "description": "People in Afghanistan’s third-largest city, Herat, explain how life has changed in recent weeks.",
    //         "url": "http://www.bbc.co.uk/news/world-asia-58346909",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/00DE/production/_120222200_p09tdd32.jpg",
    //         "publishedAt": "2021-08-28T23:22:20.7258734Z",
    //         "content": "The BBC has been speaking to people in Herat, Afghanistans third-largest city, with a population estimated to be more than 500,000. \r\nIts a strategically important provincial capital in the west of t… [+275 chars]"
    //     }
    // ]

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        console.log(parsedData);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category) + " - NewsMonkey";
        updateNews()
        // eslint-disable-next-line
    }, [])

    // const handlePreviousClick = async () => {
    //     setPage(page - 1)
    //     updateNews()

    // }
    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px', marginTop: '90px' }}>NewMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    source={element.source.name}
                                    date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* {!loading && <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
                    <h4>{page} - {Math.ceil(totalResults / props.pageSize)}</h4>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>} */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
