# Proces 


## Week 1


### Day 1 | 12 October 2018

First we had another kick off, with a presentation about D3. The following weeks we will build another graph with D3, but this time interaction will be added. We could use our other graph and build on it, but I wanted to tackle some new data that could lead to some new interesting insights. 

After that we had another presentation by Emma, who worked on a datavisualisation with R. Unfortunately she didn't dive into the code, to see what variables she used to visualise her data. But she did do some explaining about her research and user tests. This was a lot of information to take in and when I say a lot I mean a lot... lot..., especially on monday morning. The things I did manage to catch were very useful, for our own data visualisation. But for me it felt like an explosion of information, where I wasn't sure about the things that were revelant for our own data visualisation.

The rest of the day I spent browsing through the data again and starting from scratch with the Api. From there I want to build my data like last time, so it can be loaded dynamically and also will be in the right format for D3. 

### Day 2 | 13 October 2018

Today I started with a general idea about the data I wanted to use. First I wanted to compare the number of pages with the number of cover images through the years. After that I started sketching and decided what I wanted my interaction to look like and how it would work. In the end I threw this idea out the window and started all over again. But this time with movies. To compare the total minutes of movie genres throughout the years. And to zoom in on a certain genre, to see wich movies might have a longer character title to the duration of that movie. Where the data could also be viewed in certain periods. Then a lot of sketching happened again. 

In the meantime we also had een standup, wich was very insightful into what everyone else was going to visualise and the different variables they were going to use for that. 

My goal for today was to get all the data out of the Api. However duration was enveloped in some other data, thus I had a hard time trying to get the specific data I wanted to use. By the end of the day I unfortunately hadn't completed this, but will resume first thing in the moring. Well after another presenation that is... 



### Day 3 | 14 October 2018

In the morning we had a very educating presentation from the Correspondent. I absolutely loved this! After that it was back to coding and trying to get the data. Around midday I finally managed! I also worked on my concept, because I got to discuss my concept with some classmates and Titus. The feedback was very insightful, but I had a lot of changes to make. So my research continued. In the end I ended up with imdb, for one it contains so much information about so many movies on the internet and secondly their data was publicly accessable. And it's TSV! Something we got a lot of examples from in everyone's explanation. 

One downside though. I have to connect multiple files to one another to get the specific data, because they broke it up in chunks to perserve file size. However these files still add up to 2GB combined. That is a lot of memory I have to work with. But this was a thing for tommorrow. 


### Day 4 | 15 November 2018

I kinda screwed up badly in the morning, because I commited these large files to github and afterwards added them in my gitignore. Ofcourse I wasn't able to push my commits anymore, because I had reached the repository's upload limit. After some help from Titus I was able to uncommit these changes and continue linking the files togheter. I had to up my node working memory to 8GB, because it normally works with 1GB. However node wasn't able to resolve those large files. And I had to test my code so I resolved to using the following command. ```node --max-old-space-size=8192 dataGenerator.js ``` This kinda freaked me out, because I had never done this before. Of course that wasn't my only problem sometimes the editor crashed while looking through the files. All in all it wasn't very pleasant to work with. Around two o'clock I decided to sharpen my concept so I could present this later that day to my fellow classmates. By the end of the day my files still weren't connected to eachother. What a waste...

Also my idea might be a little bit to complicated to realise for me. However I still really want to try, because it might be really sick! At least by my standards. I also decided not to look at the average rating anymore, because then all the lines might be crossing one another at the same point, which makes the data unreadable. So I decided to look up 10 most anticpated movies per year. And to visualize those still as a scatter plot. 


### Day 5 | 16 November 2018

Thanks to Maikel I was finally able to get the right data. I tested this with smaller file sizes, so node could easily resolves those. In the end I connected the right nameId to the name of the producer of a movie and the title Id to the title of the movie to get that specific rating. I also had to make a decision about the data, because it took me so much time I conjured a static datafile




## Week 2


### Day 6 | 19 November 2018



### Day 7 | 20 November 2018



### Day 9 | 22 November 2018



### Day 10 | 23 November 2018

Assessment day!