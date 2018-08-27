

//*******************  destructuring OBJECT ************************************************
//const person = {
//  name: 'Dennis',
//  age: '25',
//  location: {
//    city: 'Chandler',
//    temp: 88
//  }
//};

//const { name:firstName = 'Anonymous', age } = person;
//const { city, temp:tempature } = person.location;

//console.log(`${firstName} is ${age}.`);

//console.log(`It's ${tempature} in ${city}.`);

//const book = {
//    title: 'Ego is the Enemy',
//    author: 'Ryan Holiday',
//    publisher: {
//        name: 'Penguin'
//    }
//}

//const { title, author } = book;

//const { name:publisherName = 'Self-Published'} = book.publisher;

//console.log(`'${title}' was written by ${author} and the Publisher is ${publisherName} `);

//*******************  destructuring ARRAY ************************************************
//const address = ['2101 W Flint Street', 'Chandler', 'AZ',  '85224']

//const [, city = 'Nashville', , ] = address;

//console.log(`You are in ${city}`);

const item = ['Coffee(hot)', '$2.00', '$2.50', '2.75'];
const [itemName, , , large = '$4.00'] = item;

//console.log(`A medium Coffee cost ${medium}`);
console.log(`A large ${itemName} cost ${large}`);
