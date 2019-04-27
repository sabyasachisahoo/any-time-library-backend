var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("atldb");

  var bookObj = [
    { 
    isbn: '9780679429227',
    title: "Midnight in the Garden of Good and Evil",
    author: "JOHN BERENDT",
    description: "Shots rang out in Savannah's grandest mansion in the misty,early morning hours of May 2, 1981.  Was it murder or self-defense?  For nearly a decade, the shooting and its aftermath reverberated throughout this hauntingly beautiful city of moss-hung oaks and shaded squares.  John Berendt's sharply observed, suspenseful, and witty narrative reads like a thoroughly engrossing novel, and yet it is a work of nonfiction.  Berendt skillfully interweaves a hugely entertaining first-person account of life in this isolated remnant of the Old South with the unpredictable twists and turns of a landmark murder case.",
    published_date: 'January 1994',
    price: "4",
    category: "fiction",
    publisher: "Random House",
    },
    { 
    isbn: '9780399132414',
    title: "Patriot Games",
    author: "TOM CLANCY",
    description: "While vacationing in London, CIA analyst Jack Ryan saves the Prince and Princess of Wales from a terrorist attack and gains the gratitude of a nation and the enmity of its most dangerous men",
    published_date: 'August 1987',
    price: "4",
    category: "fiction",
    publisher: "Putnam Adult",
    },
    { 
    isbn: '9780958350242',
    title: "Song Of The Whale : A Novel",
    author: "Barry Brailsford",
    description: "This, the second book of five in The Chronicles of the Stone, takes us into the world where the great migration canoes and the whales travelled the long tides together. Song of the Whale picks up the quest in Easter Island and carries it forward into the Islands of the Double Sea with the help of the whales. It speaks strongly of the role of the great Whale Nations, the mystery of their long journeys and how they are bound into our own story.",
    published_date: 'October 1997',
    price: "50",
    category: "fiction",
    publisher: "Counter Culture*",
    },
    { 
    isbn: '9780679429229',
    title: "Songs of Ice & Fire",
    author: "Gorge R.R Martin",
    description: "Watch Game of thrones",
    published_date: 'January 1988',
    price: "40",
    category: "fiction",
    publisher: "Game House",
    },
    { 
    isbn: '9780399132416',
    title: "Hunger Games",
    author: "TOM HARDY",
    description: "Watch Hunger Games: Series",
    published_date: 'August 1999',
    price: "30",
    category: "science-fiction",
    publisher: "HBO House",
    },
    { 
    isbn: '9780958350788',
    title: "The Spider Man",
    author: "Stan Lee",
    description: "Peter Paker got a  bite from spider & become Spider man",
    published_date: 'October 1985',
    price: "50",
    category: "fiction",
    publisher: "Counter Open*",
    },
  ];

  dbo.collection("books").insertMany(bookObj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});