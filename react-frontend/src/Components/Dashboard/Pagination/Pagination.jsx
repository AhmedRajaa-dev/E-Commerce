import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.


export default function PaginatedItems({ itemsPerPage,data, setPage }) {
  const pageCount=data.length/itemsPerPage
  console.log(pageCount)

  return (
    <>
      
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e)=>setPage(e.selected+1)}
        pageRangeDisplayed={15}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageLinkClassName='pagination-tag-anchor mx-2 p-3  rounded-circle w-16 h-16 inline-bloke hover:bg-black'
        containerClassName='custom-pagination flex items-center justify-end'   
        activeLinkClassName='bg-red text-white'    
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
