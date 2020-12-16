/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */

  // Base url for API
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gabriel';

  
  function getBookmarks(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }

  // POST to DB
  function createNewBookmark(bookmarkObject, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmarkObject),
      success: callback,
      error: errorCallback
    });
  }

  // DELETE request to the DB
  function deleteBookmark(id, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
      error: errorCallback
    });
  }

  // updating new bookmark
  function updateBookmark(id, updateObject, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateObject),
      success: callback,
      error: errorCallback
    });
  }

  export default {
    createNewBookmark,
    deleteBookmark,
    getBookmarks,
    updateBookmark
  };
