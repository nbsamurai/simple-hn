import React from 'react';
import './ListNav.css';

const ListNav = ({ page, setPage, totalPages }) => {
  const changePage = (pageDir) => {
    if (pageDir === 'prev' && page !== 1) {
      setPage(page - 1);
    } else if (pageDir === 'next' && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className='list-nav'>
      <button
        type='button'
        className={page === 1 ? 'nav-button-disabled' : 'nav-button'}
        onClick={() => changePage('prev')}
      >
        &lt; Prev
      </button>
      <span>
        {page}/{totalPages}
      </span>
      <button
        type='button'
        className={page === totalPages ? 'nav-button-disabled' : 'nav-button'}
        onClick={() => changePage('next')}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default ListNav;
