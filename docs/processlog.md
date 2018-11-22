# Proces 


## Week 1


### Day 1 | 12 October 2018

First we had another kick off, with a presentation about D3. The following weeks we will build another graph with D3, but this time interaction will be added. We could use our other graph and build on it, but I wanted to tackle some new data that could lead to some new interesting insights. 

After that we had another presentation by Emma, who worked on a datavisualisation with R. Unfortunately she didn't dive into the code, to see what variables she used to visualise her data. But she did do some explaining about her research and user tests. This was a lot of information to take in and when I say a lot I mean a lot... lot..., especially on monday morning. The things I did manage to catch were very useful, for our own data visualisation. But for me it felt like an explosion of information, where I wasn't sure about the things that were revelant for our own data visualisation.

The rest of the day I spent browsing through the data again and starting from scratch with the Api. From there I want to build my data like last time, so it can be loaded dynamically and also will be in the right format for D3. 

### Day 2 | 13 October 2018

Today I started with a general idea about the data I wanted to use. First I wanted to compare the number of pages with the number of cover images through the years. After that I started sketching and decided what I wanted my interaction to look like and how it would work. In the end I threw this idea out the window and started all over again. But this time with movies. To compare the total minutes of movie genres throughout the years. And to zoom in on a certain genre, to see wich movies might have a longer character title to the duration of that movie. Where the data could also be viewed in certain periods. Then a lot of sketching happened again. 

In the meantime we also had een standup, wich was very insightful into what everyone else was going to visualise and the different variables they were going to use for that. 

My goal for today was to get all the data out of the Api. However duration was enveloped in some other data, thus I had a hard time trying to get the specific data I wanted to use. By the end of the day I unfortunately hadn't completed this, but will resume first thing in the moring. Well after another presenation that is... 😇



### Day 3 | 14 October 2018

In the morning we had a very educating presentation from the Correspondent. I absolutely loved this! After that it was back to coding and trying to get the data. Around midday I finally managed! I also worked on my concept, because I got to discuss my concept with some classmates and Titus. The feedback was very insightful, but I had a lot of changes to make. So my research continued. In the end I ended up with imdb, for one it contains so much information about so many movies on the internet and secondly their data was publicly accessable. And it's TSV! Something we got a lot of examples from in everyone's explanation. 

One downside though. I have to connect multiple files to one another to get the specific data, because they broke it up in chunks to perserve file size. However these files still add up to 2GB combined. That is a lot of memory I have to work with. But this was a thing for tommorrow. 


### Day 4 | 15 November 2018

I kinda screwed up badly in the morning, because I commited these large files to github and afterwards added them in my gitignore. Ofcourse I wasn't able to push my commits anymore, because I had reached the repository's upload limit. After some help from Titus I was able to uncommit these changes and continue linking the files togheter. I had to up my node working memory to 8GB, because it normally works with 1GB. However node wasn't able to resolve those large files. And I had to test my code so I resolved to using the following command. ```node --max-old-space-size=8192 dataGenerator.js ``` This kinda freaked me out, because I had never done this before. Of course that wasn't my only problem sometimes the editor crashed while looking through the files. All in all it wasn't very pleasant to work with. Around two o'clock I decided to sharpen my concept so I could present this later that day to my fellow classmates. By the end of the day my files still weren't connected to eachother. What a waste...😩

Also my idea might be a little bit to complicated to realise for me. However I still really want to try, because it might be really sick! At least by my standards. I also decided not to look at the average rating anymore, because then all the lines might be crossing one another at the same point, which makes the data unreadable. So I decided to look up 10 most anticpated movies per year. And to visualize those still as a scatter plot. 


### Day 5 | 16 November 2018

Thanks to Maikel I was finally able to get the right data. I tested this with smaller file sizes, so node could easily resolves those. In the end I connected the right nameId to the name of the producer of a movie and the title Id to the title of the movie to get that specific rating. I also had to make a decision about the data, because it took me so much time I conjured a static datafile with the movie data I would like to have in the end. So I could get a move on with D3, want time is of the essence. This is where I spent the most time on that day, simultaneously on getting the data. Alas time flew by so I didn't get as much work done as i would have hoped. But did get a useful tutorial by Tim about d3.nest(). Especially the rollup function is very useful I think, alas not this time for me. 




## Week 2


### Day 6 | 19 November 2018

First we had a lecture from Justus about clean code. I really learned a lot from this and how I should refractor my code in the future. Which is an important step I always don't have enough time to complete. In the morning I tried to get the imdb data with all the files. Ofcourse this didn't work in one go, so by half past 12 I finally managed to start the terminal and collecting the data by writing this to an seperate [JSON file](). It took **THREE HOURS** 😱 to collect all the data. After that I tried opening the data in VS CODE, and let the editor completely crash. I really had to open the large file tho, to check if the data was succesfully rendered as I intended to. I tried opening it in Atom, Texteditor and in the end in the browser. In the browser it finally decided to load without crashing. However it took a lot of time to make it appear even there. I'm afraid what will happen when I will connect the Oba Api with it. 

After all the trouble I went to, ofcourse the data was incomplete, because of some checks I put in beforehand. So I have to check those again to make it finally work. However now I had only three days to complete my datavisualisation with interaction. So I decided to completely skip this. Damn...☹️ 

### Day 7 | 20 November 2018

In the morning I worked on my scatter plot. Around midday I finally had my scatter plot up and running with my static data file. After that I managed to style the graph and made sure you can view only the dots of a genre you would want to view, instead of all of them. This makes the graph a lot more userfriendly. I also added some transitions to make it all smoother. 🐙


### Day 8 | 21 November 2018

Today we first had a lecture by Nick who just graduated from CMD, with his project by Clever Franke. It was very insightful how to make an interaction user-friendly and also the different possibilities with D3. There were some complex visualisation, but so awesome! After that I tried to add the next step of interaction to my graph by adding a network graph. In the end with a lot of help from Maikel and a bit of help from May we managed to get the graph. But the styling on this graph was a nightmare. Which I just couldn't figure out. So i tried to work with a new example, however they changed the tree function in v4. and all the good examples where written in v3. I had a really hard time writing this to v4. So i tried to look for examples in v4. Alas by the end of the day I just didn't manage... Which kinda stressed me out. I had only one left to fix everything. From my graph to the data... And I really didn't see how I was going to make this work... 😥

### Day 9 | 22 November 2018



### Day 10 | 23 November 2018

Assessment day!