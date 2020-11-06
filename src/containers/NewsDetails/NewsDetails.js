import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pl';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import * as SC from './NewsDetails.sc';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import NewsGallery from './NewsGallery/NewsGallery';
import { sanitizeHtml } from '../../shared/utility';

moment.locale('pl');

const NewsDetails = (props) => {
  const {
    match: {
      params: { slug },
    },
  } = props;

  const { newsDetails } = useSelector((state) => state.news);

  const dispatch = useDispatch();
  const onFetchNewsDetails = useCallback(
    (newsSlug) => dispatch(actions.fetchNewsDetails(newsSlug)),
    [dispatch],
  );
  const onClearNewsDetails = useCallback(() => dispatch(actions.setNewsDetails(null)), [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchNewsDetails(slug);
    return () => onClearNewsDetails();
  }, [onFetchNewsDetails, onClearNewsDetails, slug]);

  let newsDetailsNode = <Loader />;
  if (newsDetails === undefined) {
    newsDetailsNode = <Heading variant="h3">Nie ma takich aktualności</Heading>;
  } else if (newsDetails) {
    const {
      title,
      acf: { thumbnail },
      date,
      content,
      images,
    } = newsDetails;

    const gallerySection = images ? (
      <section className="gallery-section">
        <Heading variant="h3" margin="medium">
          Galeria
        </Heading>
        <span className="gallery-info">Kliknij na zdjęcie, żeby powiększyć</span>
        <NewsGallery images={images} />
      </section>
    ) : null;

    newsDetailsNode = (
      <SC.Wrapper>
        <img src={thumbnail} alt="miniaturka" className="thumbnail" />
        <Heading variant="h3" margin="medium">
          {title.rendered}
        </Heading>
        <span className="date">{moment(date).format('LL')}</span>
        <article
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.rendered) }}
          className="content"
        />
        {gallerySection}
      </SC.Wrapper>
    );
  }

  return <FreeSides>{newsDetailsNode}</FreeSides>;
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NewsDetails;
