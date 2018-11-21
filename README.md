# Frontend Data

## Partner: Oba 
**In this project we had to build an data visualisation with D3. The most important part is making this data visualisation interactive and making sure it's meaningful. The data visualisation is based on data from the oba Api.**


## Table of Contents
* [End product](#end-product) 
* [How to install](#how-to-install) 
* [Oba Api](#the-data) 
* [Concept](#concept)
* [Learning process](#learning-process)
* [Credits](#credits)
* [Resources](#resources)
* [Packages](#packages)
* [License](#license)

## How to install

## Oba Api

Another project with Oba, with the same dataset like [last time](). 
The variables I would like to take a look at are

* All english movies
* Five genres
    * Humor
    * Avontureroman
    * Romantisch verhaal
    * Sciencefiction
    * Sprookjes
* The movies of the last ten years
* Duration of those movies. 


## Concept

This time I decided not to do books, but movies. While Oba is a public library they also have a large assortiment of movies. 

My first concept was looking at the duration time per genre, to see if this would change over time and if there is a connection to title length. But after a talk with my teacher and some fellow classmates, I decided this wasn't interesting enough to visualize. 

I want to focus on five genre's to visualize my data, to see if movies are getting better ratings with time and if it is genre **Afhankelijk**. Ratings are not included within the Api, so I have to connect another dataset to it. Imdb has a large assortiment of movies and valid ratings. 

![Visualisatie](./docs/images/Visualisatie.png)

After another presentation, this might be a tad bit too difficult for me to realize. So I had to make some design decisions. In the end I decided to only pick 10 movies per year. And to visualize every movie seperate, because when calculating an average all the movies might be ending up on the same line. And then the difference between genre's wouldn't be really shown differently. 


## Learning process

Getting the data first hand was not a problem, because I had done this before. However by changing my concept I also had to get data from Imdb. These were very large files and an aboslute nightmare to work with. There are four datasets, that are conected to each other through id's. But I can't do anything with an movie Id, so I had to get the names and movie titles that belonged to those specific id's. I also had to up my working memory of node to 8GB. It took me two days to write the right code and on the third day I was finally able to get the data. After three hours of waiting I got the right data out of the right files. However because of some mistakes I made it didn't get all the movies. Especially popular ones where missing. So I decided to give up on that one and make a dataset, manualy. So I could get a move on with D3. 

My first graph I had up and running in a day, however adding interaction with two graphs ended up being more diffult than I had imagined. Gosh this took so much time.

## Credits

## Resources

## Packages

## License
This repository is licensed as [MIT](license) by [Chelsea Doeleman](https://github.com/chelseadoeleman), 2018