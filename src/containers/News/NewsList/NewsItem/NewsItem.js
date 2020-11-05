import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pl';
import { Link } from 'react-router-dom';
import * as SC from './NewsItem.sc';
import Heading from '../../../../components/UI/Heading/Heading';
import MainButton from '../../../../components/UI/Buttons/MainButton';
import { sanitizeHtml } from '../../../../shared/utility';

moment.locale('pl');

const NewsItem = (props) => {
  const { data, newest } = props;
  const {
    title,
    acf: { thumbnail },
    date,
    excerpt,
    slug,
  } = data;

  return (
    <SC.Wrapper newest={newest}>
      <Link to={`/aktualnosci/${slug}`} className="thumbnail-link">
        <img src={thumbnail} alt="miniaturka" />
      </Link>
      <Heading variant="h3" margin="medium" className="title">
        <Link to={`/aktualnosci/${slug}`}>{title.rendered}</Link>
      </Heading>
      <span className="date">{moment(date).format('LL')}</span>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(excerpt.rendered) }}
        className="excerpt"
      />
      <Link to={`/aktualnosci/${slug}`}>
        <MainButton>Zobacz więcej</MainButton>
      </Link>
    </SC.Wrapper>
  );
};

NewsItem.defaultProps = {
  newest: false,
};

NewsItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  newest: PropTypes.bool,
};

export default NewsItem;
