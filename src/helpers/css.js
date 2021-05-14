import React from 'react';
import PropTypes from 'prop-types';

function genClassString(styles) {
  return (classStr) => {
    let arr = String(classStr).trim().split(' ');
    let result = '';
    arr.forEach(v => {
      // if cn('@x'), use original 'xx' as classname.
      if (v.indexOf('@')===0) {
        result += v.substr(1);
      } else {
        result += styles[v] || '';
      }
      result += ' ';
    });
    return result;
  };
}

function genClassName(styles){
  const cn = genClassString(styles);
  return (classStr) => {
    return {
      className: cn(classStr)
    }
  }
}

const getImageURL = src => {
  let finalSrc = '';
  if (String(src).match(/(http.*)?\/\//)) {
    finalSrc = src;
  } else {
    if (!process.env.HOMEPAGE_IMG_URL) {
      process.env.HOMEPAGE_IMG_URL = 'https://stage-drupal.car.co.uk/s3fs-public/img';
    }
    finalSrc = process.env.HOMEPAGE_IMG_URL + src;
  }
  return finalSrc;
};

const ImageHolder = ({ width, height, className, bgColor, textColor, text, src, alt, lazy }) => {
  if (src) {
    return (
      <img
        data-src={lazy ? getImageURL(src) : null}
        src={lazy ? null : getImageURL(src)}
        className={`${className} ${lazy ? 'lazyload' : ''}`}
        alt={alt || ''}
        style={{
          width: `${Number.isNaN(Number(width)) ? width : `${width}px`}` || null,
          height: `${Number.isNaN(Number(height)) ? height : `${height}px`}` || null,
        }}
      />
    );
  }
  bgColor = bgColor || 'CCCCCC';
  textColor = textColor || '000000';
  text = text || '';
  return (
    <img
      src={`https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}/?text=${text}`}
      className={className}
      alt={`${width}x${height}`}
    />
  );
};

ImageHolder.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  lazy: PropTypes.bool,
};
ImageHolder.defaultProps = {
  lazy: true,
};

const innerHTML = html => {
  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
};

function firstLetterUpperCase(str) {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
}

function lazyLoadBackgroundImage(refArr) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // eslint-disable-next-line no-param-reassign
          (entry.target).style.backgroundImage = entry.target.getAttribute('data-background-image');
        }
      });
    },
    { rootMargin: '10px 10px 200px 10px' },
  );
  if (refArr.current && Array.isArray(refArr.current)) {
    refArr.current.forEach(v => {
      observe(v);
    });
  } else {
    observe(refArr.current);
  }

  function observe(element) {
    if (!element) return;
    if (window && window.IntersectionObserver) {
      observer.observe(element);
    } else {
      element.style.backgroundImage = element.getAttribute('data-background-image');
    }
  }
}
export { ImageHolder, innerHTML, getImageURL, firstLetterUpperCase, lazyLoadBackgroundImage, genClassString, genClassName };