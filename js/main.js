"use strict";

jQuery(document).ready(function($) {
  console.log('ready!');
  const totalElementsOnPage = document.querySelectorAll("body *");
  const navButton = document.querySelector("button");
  const objCB = {
    albumId: 100,
    id: 5001,
    title: "After the button was clicked we added a new box to the page",
    url: "https://placehold.it/300x300",
    thumbnailUrl: "https://placehold.it/300x300",

  }

  // Create scroll event listener
  // on scroll function to add class to elements
  window.onscroll = function (e) {
    if (window.scrollY > 50) {
      for (let i = 0; i < totalElementsOnPage.length; i ++) {
        totalElementsOnPage[i].classList.add("has-scrolled");
      }
    } else if (window.scrollY < 50) {
      for (let i = 0; i < totalElementsOnPage.length; i ++) {
        totalElementsOnPage[i].classList.remove("has-scrolled");
      }
    }
  }

  // Dynamically created blocks
  let blocksContainer = $('[data-ajax-loaded]');
  let dataNum = blocksContainer.attr("data-ajax-loaded");

  function createBlock(data) {
    // let innerHTML = '';
    let newBlock = $('<figure>', { class: 'content-blocks--item' });
    let newBlockBody = $('<figcaption>', { class: 'content-blocks--body' });
    let img = $('<img>', { src: data.thumbnailUrl });
    let header = $('<h3>', { text: data.title });
    let copy = $('<p>', { html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ad dolores recusandae amet eos inventore debitis repellat temporibus maiores natus.' });
    
    blocksContainer.append(newBlock);
    newBlock.append(img);
    newBlock.append(newBlockBody);
    newBlockBody.append(header);
    newBlockBody.append(copy);

  }

  // Ajax request to JSONplaceholder for photos
  $.ajax('https://jsonplaceholder.typicode.com/photos')
    .done(function(response) {

      for (let i = 0; i < dataNum; i ++) {
        let data = response[i];
        blocksContainer.append(createBlock(data));
      }

    });

  // Create Button click event listener
  function buttonClick() {
    alert("Button has been clicked");
    createBlock(objCB);
  }

  navButton.addEventListener('click', buttonClick, false);

});