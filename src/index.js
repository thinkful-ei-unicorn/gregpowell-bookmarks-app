/* eslint-disable no-undef */
/* eslint-disable strict */
/* Bookmarks, API */
import $ from 'jquery';
import Store from './Store.js';
import API from './API.js';
import bookmarks from './bookmarks';
console.log(bookmarks)

$(function() {
  
  bookmarks.bindEventListeners();
  
  API.getBookmarks(bookMarks => {
    
    bookMarks.forEach(bookmark => Store.addBookmark(bookmark));
    
    bookmarks.render();
  });
});