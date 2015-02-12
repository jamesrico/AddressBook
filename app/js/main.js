<<<<<<< HEAD
/* jshint jquery: true */
/* global async: false */

'use strict';

=======
/* jshint node: true */

'use strict';
//////////****
////var $ = require ('jquery'),
    ///_ = require ('lodash'),
    ///Firebase = require('firebase');
>>>>>>> 31cc518f5e0915d151785b1cacfaddc75e2164b3

function hello() {
  return 'world';
}

<<<<<<< HEAD
/////created call to get firebase objects
$.get('https://myaddressbookapp.firebaseio.com/.json', function(res){
    if(res !== null) {
    Object.keys(res).forEach(function(uuid){
      addContactRow(uuid,res[uuid]);
    });
    } else {}
  });
//////added a click event new contact
///////added a click event that submitted and posted to account

$('#loginbutton').click(function (event){
  var FIREBASE_URL = 'https://myaddressbookapp.firebaseio.com/.json';
  var fb = Firebase(FIREBASE_URL);

event.preventDefault();

var usersFb;



if (fb.getAuth()) {
  usersFbUrl = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';
}

  var $loginForm = $(event.target.closest('form')),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};


  registerAndLogin(data, function (err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      location.reload(true);
    }
  })

$('#newcontact').toggleClass('hidden');



$('form').on('click', '#logout', function logout(){
  fb.unauth();
  location.reload(true);
})
})



  $('#loginbutton').click(function(evt){
  evt.preventDefault();
  $('#loginform').toggleClass('hidden');
})

$('#newcontactbutton').click(function(evt){
    evt.preventDefault();
    $('#newcontactform').toggleClass('hidden');
   });
  
$('#submitcontact').on('click', function(event){
  event.preventDefault();

  var $tr = $('<tr></tr>'),
    photoURL = $('#photourl').val(),
    firstName = $('#firstname').val(),
    lastName = $('#lastname').val(),
    ioEmail = $('#email').val(),
    ioTwitter = $('#twitter').val(),
    $newcontactinfo = $('<td><img src='+photoURL+'>/img</td><td>'+firstName+'</td><td>'+lastName+'</td><td>'+ioEmail+'</td><td>'+ioTwitter+'</td>'),
    url = 'https://myaddressbookapp.firebaseio.com/.json',
    data = JSON.stringify({photourl: photoURL, firstname: firstName, lastname: lastName, email: ioEmail, twitter: ioTwitter});

/////posted to firebase
  $.post(url, data, function(res){
      $tr.attr('data-uuid', res.name);
    });
////apppended to table
  $($tr).append($newcontactinfo);

  $('#tableofcontacts').append($tr);

  $('#newcontactform').toggleClass('hidden');
/////reset form
  this.form.reset();
//////reload page after appending
  location.reload();
 })

/////created a row for each contact and called to get function
function addContactRow(uuid, info){
  var $trcontact = $('<tr id="trcontact"></tr>'),
      $contactphoto = $('<td><img src='+info.photourl+'></img></td>'),
      $contactinfo = $('<td>'+info.firstname+'</td><td>'+info.lastname+'</td><td>'+info.email+'</td><td>'+info.twitter+'</td><td>'),
      $rmvbutton = $('<td><button id="removebutton">Remove</button></td>');
////appended to table
  $trcontact.append($contactphoto);
  $trcontact.append($contactinfo);
  $trcontact.append($rmvbutton);

  $trcontact.attr('data-uuid', uuid);
  $('#tableofcontacts').append($trcontact);

////click event for the remove button
$('tbody').on('click', '#removebutton', function (evt) {

  var url ='https://myaddressbookapp.firebaseio.com/'+uuid+ '.json',
      $tr = $(this).closest('tr');

  $tr.remove();
  $.ajax(url, {type: 'DELETE'});
})
}

///////now i need to create a login and register page///

=======
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

<<<<<<< HEAD:app/js/main.js
  $trcontact.attr('data-uuid', uuid);
  $('#tableofcontacts').append($trcontact);
  }
=======
  return isConfirmed;
}


>>>>>>> parent of 3be9bfb... started anew app and reconstructed everything:public/js/main.js
>>>>>>> 31cc518f5e0915d151785b1cacfaddc75e2164b3
