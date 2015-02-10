/* jshint mocha: true, expr: true, strict: false, undef: false */
'use strict';

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('DOM', function () {

describe('firebase', function (newcontact) {
  it('should submit the form to firebase', function () {
    var newcontacts = [
                        {FirstName: 'Kobe', LastName: 'Bryant', Email: 'blackmamba24@gmail.com', Twitter: 'blackmamba24', PhotoURL: 'nba.com/lakers/kobe'},
                        {FirstName: 'Michael', LastName: 'Jordan', Email: 'airjordan23@gmail.com', Twitter: 'airjordan23', PhotoURL: 'nba.com/mj'}        
                      ],
        $tbody = $('tbody'),
        $trs;

    $tbody.append('<tr><td>Kobe</td><td>Bryant</td><td>blackmamba24@gmail.com</td><td>blackmamba24</td><td>nba.com/kobe</td></tr>');
    $tbody.append('<tr><td>Michael</td><td>Jordan</td><td>airjordan23@gmail.com</td><td>airjordan23</td><td>nba.com/mj</td></tr>');

    $trs = $('tr');

    newContactSubmitForm(newcontacts);

    $($($trs[0]).find('td')[0]).text().should.equal('Kobe');
    });
  });
});
