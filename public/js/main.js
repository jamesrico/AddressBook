/* jshint jquery: true */
/* global async: false */

'use strict';


function hello() {
  return 'world';
}

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
