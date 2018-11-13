# Proces 


## Week 1


### Day 1 | 29 October 2018

Today started off with another kick-off by Titus and Laurens. Then Mark gave us a short lecture about Oba and their house and technical rules. Followed by a lesson about higherfunctions, arrays and strings, which was very useful. Especially higherfunctions, because it allows you to write more readable code and a lot shorter. 

Then we tried to talk to the Oba API with an package from [Rijk van Zanten](https://github.com/rijkvanzanten/node-oba-api) on github, however it did not go as planned. Eventually we decided to put his code directly in to the [index.js](./index.js) file, because otherwise it did not work properly. I put the secret and public key into a .env file, because it cannot be published on github. .env is obviously stored in .gitignore. By importing .env into index.js you could access both keys. Right now I can only use different search words, which in turn will return matching results. 


### Day 2 | 30 October 2018

Today I worked on accessing more data than just using the search endpoint in the API, like details and availability. There are more endpoints, but don't think they could provide me with more useful data for my research questions. Writing the functions to get different endpoint I spent the majority of my time on. Especially because I could no longer write spaghetti code, but had to make my code more functional. Right now it is still a bit spaghetti and I know I could write it shorter, but I also had to come up with some research questions before the end of the day. 

So after I could access a lot more of the data than yesterday, I resort to spitting through the data. The data that came back with the details endpoint was the most useful for me. 
I've come up with the following questions:

* Zit er een publicatie verschil tussen mannelijke en vrouwelijke auteurs, door de jaren heen?

* Hebben bepaalde uitgevers in specifieke jaren meer uitgegeven, dan in andere jaren?

* Zijn er meer boeken of tijdschriften over technologie uitgegeven in de afgelopen vijf jaar?

* Hoeveel boeken worden er vertaald tegenover boeken, die wel in de oorspronkelijke taal gehouden worden?

* Bevinden boeken van een specifieke auteur zich vaker op een bepaalde locatie, dan andere locaties?


### Day 3 | 31 October 2018

Today we discussed my first question in class and as a result came up with new questions! Then we also got the chance to discuss our questions with fellow classmates which helped with to look at things from another perspective. Obviously I also realized I formed a lot of 'yes' or 'no' questions, so I had to rephrase those, to make them sound better, but also to specify those question, as they are now quite abstract. 

Then I did some more research in the data to find more deeper aspects to those question and to refine them. This part I really struggled with, because there are a lot of different variables in the dataset. Thankfully some classmates wrote some code, which made it a lot easier to browse through the data and another classmate wrote every meaning to the variables in the data. This made it all a lot clearer for me. 

Afterwards I tried to implement my code through theirs, but I'm still struggling on that part. Moreover because I'm not exactly sure if I should implement my code through theirs... This is also a side effect, because I understand a large part of their code, but not all. Then I tried to search with more search words, unfortunately it broke... It is possible to make this work, so it's something I will keep working on until it works. 

Around noon Laurens en Titus gave us lectures about how to get certain parts out of the API and how you can use promises to access information at the same time out of different endpoints. 

**Research questions**

* Hoe is de verhouding qua publicatie tussen mannelijke en vrouwelijke auteurs veranderd, door de jaren heen?
    * Zit er een verschil tussen uitgevers in de bibliotheek, die meer werk publiceren van mannelijke auteurs dan vrouwelijke?
    * Zijn er uitgevers in de bibliotheek, die meer werk zijn gaan publiceren van vrouwelijke auteurs en uitgevers die nog steeds meer mannelijke auteurs vertegenwoordigen door de jaren heen?
    * Heeft de oba meer vrouwelijke, dan mannelijke auteurs in hun catalogus en is dit in verband met het aantal uitgevers die zich binnen de Oba bevinden?
    * In de periode dat de feministsche golf op gang kwam, zijn er toen meer boeken uitgekomen, die geschreven zijn door vrouwen of meer boeken over het feminisme zelf?

* Zijn er in bepaalde jaren meer boeken uitgegeven door specifieke uitgevers en hoe is dit gerelateerd aan gebeurtenissen in die periode?
    * Geven uitgevers meer boeken uit van een bepaald genre en is dit gerelateerd aan bepaalde periodes?

* Zijn er meer boeken of tijdschriften over technologie uitgegeven in de afgelopen vijf jaar en worden er meer coverimages gebruikt?
    * Worden er steeds meer coverimages gebruikt door de jaren heen en is er een verband met de uitgevers?

* Hoeveel boeken worden er vertaald tegenover boeken, die wel in de oorspronkelijke taal gehouden worden is er een verband met de uitgevers?

* Bevinden boeken van een specifieke auteur zich vaker op een bepaalde locatie, dan andere locaties en is dit in verband met het jaar van uitgave?
    * Zijn deze boeken ook gesorteerd op geslacht?


### Day 4 | 1 November 2018

**Hypothesis**
Uitgevers publiceren vaker boeken van mannelijke auteurs, dan vrouwelijke auteurs.

**Roadmap**

1. Find out how facets work.
2. Sort through the data to find if all variables are accessable.
    * Make sure to only get all the books in the Api.
    * All the books need to be in dutch.
    * Find all the authors.
    * Find the different publishers.
    * Sort through all the publication years of these authors.
    * Use another Api with the most popular male and female firstnames.
3. Try to use more keySearch words, to make the results more clearer. 
4. Store results in a New Object

On this day I completed step one and two, but didn't get to step three and four. I spend the day mainly trying to get all the data from the api, that I needed to answer my research question. Tim did explain to me how I should go about completing step three and four. I understand the logic of it and know what needs to be done, all that remains to be done is writing the code, which I reckon is one of my weaknesses. 


### Day 5 | 2 November 2018

On this day I continued working on step three and four, with help from Maikel, I finally managed to complete those tasks around midday. Then we got a lecture about Observable and D3, which was awesome! I can't wait to work with D3, because it looks so cool! Observable is also mighty handy, because you have these examples which can be edited and it's amazing! The remainder of the day I helped Jessie and Linda with their code to make sure they would only get their needed results out of the Api and browsed through Obeservable. 


## Week 2


### Day 6 | 5 November 2018

Today we got another lecture by Rejo of Bits of Freedom, the talk was quite long, but very interesting. Afterwards I gained a lot of new insights into the privacy problem, because it will continue to be a problem when do not decide to choose another path. Afterwards together with Jessie and some help from Daniël I tried to get more than 20 results from the Api. The wrapper that returned more than 20 results was written by Wouter and very understandable code! Also, it worked! I also made some sketches about what I want my visualization to look like, but in the end I had hard time coming up with something creative. The only thing I thought would be nice to create with D3, will probably be a step too far, at the moment. But who knows, maybe I will create it, when I aquire the right skills. For now I just stayed with an old trusty line chart.

### Day 7 | 6 November 2018

I started off with trying to sort the data and trying to get data of a certain timespan out of the Api. Because my research is going to be based on the last five years. Around midday I got all the data back, then together with Maikel we tried to change our datastructure so it could be easily implemented in D3. This was easier said than done obviously. We knew what had to happen, now only to realise it... 🤯

Afterwards the Api didn't work anymore, not that it actually broke, but my code didn't go together with the Api anymore. Maybe because of some changes they made in the Api and decided to update it? However blind coding was kinda out of the question, because then I really wouldn't have a clue as to what went wrong... Seemend like wasted time to me, so I decided to look up some D3 tutorials. By browsing through Observable and toying with the code and watching Youtube video's. 

### Day 8 | 7 November 2018

The Api problem was fixed thanks to Titus! In the end it was because we used a link that was on staging.
Together with Jessie we tried to link the gender to the author with Wouter's code. His functions were very understandable and the new datastructure for names is a blessing and easy to use! We spent the majority of the morning doing this. 
Then I felt like I was running out of time, because I knew I had to use the data for my visualization, but I hadn't yet acquired all the data and it also needed to be formated. D3 is quite difficult, so I really wanted to get started. However that would mean I had to set the data by hand and use that instead of requiring the data dynamically. 
Very though decision indeed... On a whim I decided I get my data dynamically and luckily Maikel wanted to help with that. First I browsed through some graphs and in the end decided to make a bar chart instead of a line chart, because using a line chart wouldn't truly represent the real data. 
First I wrote what needed to happen and after that we managed step by step the code that would run this data dynamically 🙌.

### Day 9 | 8 November 2018

Because my code example for a bar chart was written in D3 v.3 I had to rewrite my code to get it working in v.5. With some help from Linda I managed to do this, by first writing the code to v.4 and then to v.5. I also helped Jessie to better understand the code that we wrote and tried to help May with her bar chart. I also went in search for a problem Maikel had trouble with and then added comments to my code. Because the bar chart was written in a HTML file I seperated those to make it more readable/presentable. I also added some tooltips to the code, to make the data visualization more readable. And then fixed my ReadMe!

### Day 10 | 9 November 2018

Assessment day!