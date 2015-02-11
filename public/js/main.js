/* jshint jquery: true */
/* global async: false */


'use strict';


function hello() {
  return 'world';
}

$.get('https://myaddressbookapp.firebaseio.com/.json', function(res){
    if(res !== null) {
    Object.keys(res).forEach(function(uuid){
      addContactRow(uuid,res[uuid]);
    });
    } else {}
  });

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


  $.post(url, data, function(res){
      $tr.attr('data-uuid', res.name);
    });

  $($tr).append($newcontactinfo);

  $('#tableofcontacts').append($tr);

  $('#newcontactform').toggleClass('hidden');

  this.form.reset();
 })

function addContactRow(uuid, info){
  var $trcontact = $('<tr></tr>'),
      $contactphoto = $('<td><img src='+info.photourl+'></img></td>'),
      $contactinfo = $('<td>'+info.firstname+'</td><td>'+info.lastname+'</td><td>'+info.email+'</td><td>'+info.twitter+'</td><td>'),
      $rmvbutton = $('<td><button id="removebutton">Remove</button></td>');

  $trcontact.append($contactphoto);
  $trcontact.append($contactinfo);
  $trcontact.append($rmvbutton);

  $trcontact.attr('data-uuid', uuid);
  $('#tableofcontacts').append($trcontact);
}
