import React from 'react';
import PropTypes from 'prop-types';
import decodeEntities from 'parse-entities';
import Heading from '../../../components/UI/Heading/Heading';
import * as SC from './PriestList.sc';

const PriestList = (props) => {
  const { priests } = props;

  const priestList = priests.map(({ id, acf, title }) => (
    <SC.Priest key={id}>
      <div className="image-wrapper">
        <img src={acf.image} alt={decodeEntities(title.rendered)} className="image" />
      </div>
      <Heading variant="h4" align="center" margin="medium" data-test="name">
        {decodeEntities(title.rendered)}
      </Heading>
      <div className="info-row">
        <span className="info-name">Data urodzenia:&nbsp;</span>
        <span className="info-value" data-test="date-of-birth">{`${acf.dateOfBirth}r.`}</span>
      </div>
      <div className="info-row">
        <span className="info-name">Imieniny:&nbsp;</span>
        <span className="info-value" data-test="name-day">
          {acf.nameDay}
        </span>
      </div>
      <div className="info-row">
        <span className="info-name">Śluby zakonne:&nbsp;</span>
        <span className="info-value" data-test="religious-vows">{`${acf.religiousVows}r.`}</span>
      </div>
      <div className="info-row">
        <span className="info-name">Święcenia:&nbsp;</span>
        <span className="info-value" data-test="ordination">{`${acf.ordination}r.`}</span>
      </div>
    </SC.Priest>
  ));

  return <SC.List>{priestList}</SC.List>;
};

PriestList.propTypes = {
  priests: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default PriestList;
