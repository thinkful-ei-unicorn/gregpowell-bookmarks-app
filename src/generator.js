/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
import Store from './Store';

  function generateBookmarksListHTML(arrayOfBookmarks, filterValue) {
    return mapFilteredArrayOfBookmarksToHTML(
      filterArrayOfBookmarks(arrayOfBookmarks, filterValue)
    );
  }

  function generateSingleBookmarkListHTML(bookmark) {
    
    let hiddenStatus = Store.checkIfShouldBeHidden(bookmark);

    return runGeneratorFunctions(bookmark, hiddenStatus);
  }

  function runGeneratorFunctions(bookmark, hiddenStatus) {
    return `
    ${generateLiItemWithDataID(bookmark)}
    ${generateBookmarkHeader(bookmark)}
    ${generateDivWithClassHTML(hiddenStatus)}
      ${generateBookmarkDescriptionHTML(bookmark)}
      ${generateBookmarkURLHTML(bookmark)}${generateBookmarkEditButtonHTML()}
      ${generateDeleteButtonHTML(bookmark)}
    ${generateAsideLiClosingTags()}
    `;
  }

  function generateLiItemWithDataID(bookmark) {
    return `<li class='bookmark-item js-bookmark-item' data-id=${bookmark.id}>`;
  }

  function generateAsideLiClosingTags() {
    return `</aside>
    </li>`;
  }

  function generateDivWithClassHTML(hiddenStatus) {
    return `<aside class='bookmark-body ${hiddenStatus}' role="complementary">`;
  }
  // HTML for titles
  function generateBookmarkHeader(bookmark) {
    return `<section class='bookmark-header js-bookmark-header'><button class='header-button'>${
      bookmark.title
    } ${generateBookmarkRatingHTML(bookmark)}</button></section>`;
  }

  // generating HTML for URLs
  function generateBookmarkURLHTML(bookmark) {
    return `<a href='${bookmark.url}'><button class="js-btn-visit" aria-label="Visit site">VISIT</button></a>`;
  }

  
  //function generateBookmarkVisitButtonHTML() {
  //  return '<button class="js-btn-visit" aria-label="Visit site">VISIT</button>';
  //}

  // edit 
  function generateBookmarkEditButtonHTML() {
    return '<button class="edit-btn js-btn-edit" aria-label="Edit bookmark">EDIT</button>';
  }

  // delete 
  function generateDeleteButtonHTML() {
    return '<button class="bookmark-button js-btn-delete" aria-label="Delete bookmark">DELETE</button>';
  }

  // descriptions
  function generateBookmarkDescriptionHTML(bookmark) {
    return checkIfBookmarkHasDescription(bookmark)
      ? `<p>Description: ${bookmark.desc}</p>`
      : '';
  }

  // checking if a bookmark has a description
  function checkIfBookmarkHasDescription(bookmark) {
    if (bookmark.desc) return true;
    return false;
  }

  // HTML for ratings
  function generateBookmarkRatingHTML(bookmark) {
    return checkIfBookmarkHasRating(bookmark)
      ? `| ${generateStarsHTML(bookmark.rating)}`
      : '';
  }

  // Function for checking if bookmark has a rating
  function checkIfBookmarkHasRating(bookmark) {
    if (bookmark.rating) return true;
    return false;
  }

  // FA star HTML rating times
  function generateStarsHTML(rating) {
    const ariaLabel = `<span aria-label="rating: ${rating} stars">`;
    const arrayOfStarsHTML = [ariaLabel];
    const closeSpan = '</span>';

    for (let i = 0; i < rating; i++) {
      generateStarHTML(arrayOfStarsHTML, rating);
    }
    arrayOfStarsHTML.push(closeSpan);
    return arrayOfStarsHTML.join('');
  }

  // single FA star and pushing to a given array
  function generateStarHTML(array) {
    array.push('<i class="fa fa-star" aria-hidden="true"></i>');
  }

  // Filter an array of bookmarks based on rating
  function filterArrayOfBookmarks(arrayOfBookmarks, filterValue) {
    return arrayOfBookmarks.filter(bookmark => bookmark.rating >= filterValue);
  }

  // Map an array of store objects to HTML
  function mapFilteredArrayOfBookmarksToHTML(arrayOfBookmarks) {
    return arrayOfBookmarks.map(generateSingleBookmarkListHTML);
  }
  // Generate and return HTML for new bookmark form
  function generateUpdateBookmarkForm() {
    return `
      <form id='js-edit-form'>
      <fieldset>
      <legend>Update Bookmark</legend>
        <div class='col-6'>
          <!-- Title -->
          <label for='js-form-title'>Title</label>
          <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='Amazing programming article'></li>
          <!-- Description -->
          <label for='js-form-description'>Description</label>
          <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="I can't believe its not PHP!"></textarea>
        </div>
        <div class='col-6'>
        <!-- URL -->
          <label for='js-form-url'>URL</label>
          <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>
          <!-- Rating -->
          <label for='js-form-rating' id='rating-label'>Rating: </label>
          <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </div>
        <!-- Add/Cancel button -->
        <div class='add-btn-container col-12'>
          <button type='submit' id='js-update-bookmark' class='add-button'>UPDATE BOOKMARK</button>
          <button type='button' id='js-cancel-bookmark'>CANCEL</button>
        </div>
        </fieldset>
      </form>
      `;
  }

  // Generate and return HTML for new bookmark form
  function generateNewBookmarkFormHTML() {
    return `
    <form enctype="multipart/form-data" id='js-new-item-form'>
    <fieldset>
    <legend>New Bookmark</legend>
      <div class='col-6'>
        <!-- Title -->
        <label for='js-form-title'>Title</label>
        <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='Amazing programming article'></li>
        <!-- Description -->
        <label for='js-form-description'>Description</label>
        <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="I can't believe its not PHP!"></textarea>
      </div>
      <div class='col-6'>
      <!-- URL -->
        <label for='js-form-url'>URL</label>
        <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>
        <!-- Rating -->
        <label for='js-form-rating' id='rating-label'>Rating: </label>
        <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
          <option value='5' selected>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
      </div>
      <!-- Add button -->
      <div class='add-btn-container col-12'>
        <button type='submit' id='js-add-bookmark' class='add-button'>ADD BOOKMARK</button>
        <button type='button' id='js-cancel-bookmark'>CANCEL</button>
      </div>
      </fieldset>
    </form>
    `;
  }

  export default {
    generateUpdateBookmarkForm,
    generateNewBookmarkFormHTML,
    generateBookmarksListHTML
  };