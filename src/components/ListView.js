import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ListItem from './ListItem';
import ListNav from './ListNav';
import './ListView.css';

const ListView = (props) => {
  const pageSize = 20;
  let location = useLocation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [result, setResult] = useState([]);

  const urlRoute = ({ pathname }) => {
    let route;
    switch (pathname) {
      case '/':
        route = '/topstories';
        break;

      case '/show':
        route = '/showstories';
        break;

      case '/ask':
        route = '/askstories';
        break;

      case '/jobs':
        route = '/jobstories';
        break;

      case '/top':
        route = '/topstories';
        break;

      case '/new':
        route = '/newstories';
        break;

      default:
        route = '/notFound';
        break;
    }
    return route;
  };

  useEffect(() => {
    fetchList(urlRoute(location)).then((list) => {
      fetchDetails(list).then((items) => {
        setResult(items);
      });
    });
  }, [page]);

  const fetchList = async (route) => {
    const list = [];
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0${route}.json?print=pretty`
    );
    setTotalPages(Math.ceil(data.length / pageSize));
    data
      .slice((page - 1) * pageSize, page * pageSize)
      .map((item) => list.push(item));
    return list;
  };

  const fetchDetails = async (list) => {
    const promises = list.map(async (item) => {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
      );
      return {
        item,
        by: data.by,
        title: data.title,
        score: data.score,
        comments_count: data.descendants,
        time: data.time,
        url:
          data.url != null
            ? data.url
            : `https://news.ycombinator.com/item?id=${item}`,
      };
    });
    const resultList = await Promise.all(promises);
    console.log(resultList);
    return resultList;
  };

  return (
    <div className='view'>
      <ListNav totalPages={totalPages} page={page} setPage={setPage} />
      <div className='list-view'>
        {result.map((listItem) => (
          <div key={listItem.item} className='list'>
            <ListItem item={listItem} />
          </div>
        ))}
      </div>
      <ListNav totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default ListView;
