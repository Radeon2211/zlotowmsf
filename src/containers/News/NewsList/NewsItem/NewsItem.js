import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pl';
import { Link } from 'react-router-dom';
import * as SC from './NewsItem.sc';
import Heading from '../../../../components/UI/Heading/Heading';
import Button from '../../../../components/UI/Button/Button';

moment.locale('pl');

const NewsItem = (props) => {
  const { data, newest } = props;
  const { title, acf: { thumbnail }, date, excerpt, slug } = data;

  return (
    <SC.Wrapper newest={newest}>
      <Link to={`/aktualnosci/${slug}`} className="thumbnail-link">
        <img src={thumbnail} alt="miniaturka" />
      </Link>
        <Heading variant="h3" margin="medium" className="title">
          <Link to={`/aktualnosci/${slug}`}>{title.rendered}</Link>
        </Heading>
      <span className="date">{moment(date).format('LL')}</span>
      <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} className="excerpt" />
      <Link to={`/aktualnosci/${slug}`}>
        <Button>Zobacz więcej</Button>
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
