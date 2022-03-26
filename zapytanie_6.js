var ja = {
    sex: 'Male',
    first_name: 'Bartosz',
    last_name: 'Włodarczyk',
    job: 'Junior Backend Developer',
    email: 's25762@pjwstk.edu.pl',
    location: {
      city: 'Warsaw',
      address: { streetname: 'Odkryta', streetnumber: '58' }
    },
    description: 'a very handsome dude',
    height: '184.0',
    weight: '86.0',
    birth_date: '1998-07-04T04:20:00Z',
    nationality: 'Poland',
    credit: [
      {
        type: 'bankcard',
        number: '3582705681371112',
        currency: 'PLN',
        balance: '999999999999999.99'
      }
    ]
  }
db.people.insertOne(ja)