import React from 'react';
import './ListItem.css';

const hostName = (url) => {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
};

const timeAgo = (time) => {
  const timeDifference = Date.now() / 1000 - Number(time);
  if (timeDifference < 3600) {
    return pluralize(~~(timeDifference / 60), ' minute');
  } else if (timeDifference < 86400) {
    return pluralize(~~(timeDifference / 3600), ' hour');
  } else {
    return pluralize(~~(timeDifference / 86400), ' day');
  }
};

const pluralize = (time, label) => {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
};

const ListItem = ({ item }) => {
  const { title, url, score, time, comments_count, by } = item;

  return (
    <div className='list-item'>
      <div className='item-header'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
        <span className='host'>({hostName(url)})</span>
        <p className='meta'>
          {score} points | by {by} {timeAgo(time)} ago | {comments_count}{' '}
          comments
        </p>
      </div>
    </div>
  );
};

export default ListItem;
