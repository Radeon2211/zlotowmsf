import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import decodeEntities from 'parse-entities';
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
  const { error } = useSelector((state) => state.ui);

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
    newsDetailsNode = (
      <Heading variant="h3" align="center">
        Nie znaleziono takiego artykułu
      </Heading>
    );
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
        <Heading variant="h5" margin="small" align="center">
          Kliknij na zdjęcie, żeby powiększyć
        </Heading>
        <NewsGallery images={images} />
      </section>
    ) : null;

    newsDetailsNode = (
      <SC.Wrapper>
        <img src={thumbnail} alt="miniaturka" className="thumbnail" />
        <Heading variant="h3" margin="medium">
          {decodeEntities(title.rendered)}
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

  if (error) {
    newsDetailsNode = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem danych o artykule
      </Heading>
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
