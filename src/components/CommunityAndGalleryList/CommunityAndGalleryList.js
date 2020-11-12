import React from 'react';
import PropTypes from 'prop-types';
import decodeEntities from 'parse-entities';
import * as SC from './CommunityAndGalleryList.sc';

const ComumunityAndGalleryList = (props) => {
  const { mainPath, overlayText, items } = props;

  const itemList = items.map((item) => (
    <SC.Panel key={item.id} to={`${mainPath}${item.slug}`}>
      <div className="image-wrapper">
        <div className="image-overlay" />
        <div className="image-overlay-content">{overlayText}</div>
        <img src={item.acf.thumbnail} alt={decodeEntities(item.title.rendered)} className="image" />
      </div>
      <span className="panel-title">{decodeEntities(item.title.rendered)}</span>
    </SC.Panel>
  ));

  return <SC.List>{itemList}</SC.List>;
};

ComumunityAndGalleryList.propTypes = {
  mainPath: PropTypes.string.isRequired,
  overlayText: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default ComumunityAndGalleryList;
