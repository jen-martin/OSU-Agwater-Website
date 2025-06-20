import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import PropTypes from 'prop-types';
import { Button } from 'antd'

import AWAuthor from './AWAuthor'


const AWFeatureDetail = ({ article = null }) => {
    const overlayStyle = {
        position: 'absolute',
        left: '50%',
        bottom: '-4em',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '0px',
    };

    const containerStyle = {
        position: 'relative',
        display: 'inline-block',
        margin: '0px',
    };

    return (
        <>
            {(article == null) && (<span>No Article Available</span>)}
            {(article != null) && (
                <>
                    <div className='full-width' style={containerStyle}>
                        <img src={article.cover_image} style={{ width: '100%', padding:0 }} />

                        <div className='full-width' style={overlayStyle}>
                            <div className='padded'>
                                <div className="text-h4">{article.title}</div>
                                <div className="text-subtitle1">{article.subtitle}</div>

                                <AWAuthor name={article.lead_author} lead_site={article.lead_site} avatar={article.avatar} />
                                <div className="text-subtitle5">{article.additional_authors}</div>

                                <div className="text-subtitle5">{article.pub_date}</div>
                            </div>
                        </div>
                    </div>

                    <div id='divBodyText' className="aw-white-bg aw-black-text" style={{ padding: '0.5em' }}
                        dangerouslySetInnerHTML={{ __html: article.body_html }}></div>
                    <Button type="link" href={article.link} target="_blank" className="" >Read More...</Button>
                </>
            )}
        </>
    )
};

const AWFeature = () => {
    const [article, setArticle] = useState(null);

    const params = useParams();
    console.log('AWFeature article: ', params.id);

    // SANITIZE!!!!!
    //document.getElementById('divBodyText').innerHTML= article.body_html;

    useEffect(() => {
        fetch("/articles/articles.json")
            .then((res) => res.json())
            .then((data) => {
                for (let article of data.articles) {
                    article['_id'] = article.title.replaceAll(' ', '_');
                    if (article['_id'] == params.id) {
                        setArticle(article);
                        break;
                    }
                }
            })
    }, []);

    return (
        <div className='full-width aw-white-bg' style={{ borderRadius: 10 }}>
            <AWFeatureDetail article={article} />
        </div>
    )
};


AWFeatureDetail.propTypes = {
    article: PropTypes.object,
}

// Export both components
export { AWFeature, AWFeatureDetail };
export default AWFeature
