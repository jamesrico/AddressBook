/* jshint jquery: true */
/* global async: false */

'use strict';

function hello() {
  return 'world';
}

  var FIREBASE_URL = 'https://myaddressbookapp.firebaseio.com/.json';

  $.get(FIREBASE_URL, function (contact) {
    Object.keys(contact).forEach(function (uuid) {
    addContactToTable(uuid, contact[uuid]);
    });
  });


  $('#submitcontact').on('click', newContactSubmitForm);


function newContactSubmitForm (evt) {

  var $trs = $('tr'),
      $FirstName = $('#firstname').val(),
      $LastName = $('#lastname').val(),
      $Email = $('#email').val(),
      $Twitter = $('#twitter').val(),
      $PhotoURL = $('#photoURL').val();

  var res = {FirstName: $FirstName, LastName: $LastName, Email: $Email, Twitter: $Twitter, PhotoURL: $PhotoURL};

  var url = FIREBASE_URL,
      jsonifiedData = JSON.stringify(res);

  console.log(url);
  console.log(jsonifiedData);

  $.post(url, jsonifiedData, function(res){ return res;});

  $('#newcontactform').submit( function (evt){
      evt.preventDefault();
      alert('Contact Submitted!');
      document.getElementById('newcontactform').reset();
  });

 };

function addContactToTable(uuid, res) {
};

$('tbody').on('click', '#removebutton', function (evt) {

  var $tr  = $(evt.target).closest('tr'),
      uuid = $tr.data('uuid'),
      friendName = $tr.find('tr').text();

  if (confirmContactRemoval(friendName)) {
    $tr.remove();
    deleteContactFromFirebase(uuid);
  }
});

function deleteContactFromFirebase(uuid) {
  var url = FIREBASE_URL + uuid + '.json';

  $.ajax(url, {type: 'DELETE'});
}

function confirmContactRemoval(contactName) {
  var confirmationText = 'Remove ' + friendName + ' from friend list?',
      isConfirmed      = window.confirm(confirmationText);

  return isConfirmed;
}


