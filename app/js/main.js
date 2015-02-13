/* jshint browser: true, jquery: true */

'use strict';


function hello() {
  return 'world';
}

var ref = new Firebase("https://myaddressbookapp.firebaseio.com");
////unhide signout and button and sign out of account

$('#loginform').on('click', '#loginbutton', function (event){
  event.preventDefault();
  $('#signout').toggleClass('hidden');
});

$('#loginform').on('click', '#signout', function (event) {
  ref.unauth();
  location.reload(true);
});

/////// now to create a login to store data and authenticate
//////added a click event new contact
///////added a click event that submitted and posted to account

$('#loginform').on('click', '#loginbutton', function (event){

  event.preventDefault();
/////create a new contact button that displays form and hides again
  $('#newcontact').toggleClass('hidden');
/////////create login and register



var fireBaseUrl = "https://myaddressbookapp.firebaseio.com";
var usersFbUrl;

if(ref.getAuth()){

  usersFbUrl = fireBaseUrl + '/users/' + ref.getAuth().uid + '/data';
  $.get(usersFbUrl + "/contacts.json", function(res){
    _.forEach(Object.keys(res), function(uuid){
      var newURL = usersFbUrl + "/contacts/" + uuid + ".json";
      $.get(newURL, function(info){
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
     });
    });
  });
}
})


$('#loginform').on('click', '#loginbutton', function (event) {
  registerAndLogin(data, function (err, auth) {
    if (err) {
      $('.error').text(err);
    } else {
      location.reload(true);
    }
  });

  var $loginForm = $(event.target),
      email      = $loginForm.find('[type="email"]').val(),
      pass       = $loginForm.find('[type="password"]').val(),
      data       = {email: email, password: pass};

  event.preventDefault();

  ref.authWithPassword(data, function(err, auth) {
     if (err) {
      $('.error').text(err);
    } else {
      location.reload(true);
    }
  });

function auth(obj, cb) {
  ref.createUser(obj, function(err) {
    if (!err) {
      fb.authWithPassword(obj, function (err, auth){
        if (!err) {
          cb(null, auth);
        } else {
          cb(err);
        }
      });
    } else {
      cb(err);
    }
    })
}
})
///////////created a button to show new contact form
$('#newcontactbutton').click(function(evt){
    evt.preventDefault();
    $('#newcontactform').toggleClass('hidden');
   });
//////make a new function that processes form and spits out a row
   //
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
    contacts = JSON.stringify({photourl: photoURL, firstname: firstName, lastname: lastName, email: ioEmail, twitter: ioTwitter});

/////posted to firebase
  $.post(url, contacts, function(res){
      $tr.attr('contacts-uuid', res.name);
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

  var url = usersFbUrl+ '/contacts/.json',
      $tr = $(this).closest('tr');

  $tr.remove();
  $.ajax(url, {type: 'DELETE'});
})
}

///////now i need to create a login and register page///

