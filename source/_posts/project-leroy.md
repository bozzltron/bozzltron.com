---
title: Project Leroy
categories:
  - Techonology
tags:
  - ai
hero: /images/posts/hero-project-leroy.jpg
hero_title: ''
date: 2020-07-25 13:43:15
---

My first Artificial Intelligence project.

<!-- more -->

I've had the idea for Project Leroy for some time.  The pandemic has provided the time.  The inspiration came from my Grandfather Leroy.  He and my Grandmother loved birds.  I remember visiting Grandma and Grandpa's house seeing bird watching books by the window.  Just outside were collection of different feeders.  They also enjoyed cuckoo clocks.  They had one in their home to sang a different song every hour.

Project Leroy is applying Artificial Intelligence to bird watching.  The goal is to be able to indentify any bird species that comes to the feeder. 

![Raspberry Pi 3, Google Coral, Camera Module](/images/posts/project-leroy.jpg)

The first step was getting the hardware.  I already had a Raspberry Pi 3 laying around for the main system.  I picked up the Google Coral USB module for the model processing.  Lucky enough, Google Coral had a [bird feeder example project](https://coral.ai/projects/bird-feeder/#project-intro) that became my starting point for the code.  Last addition was the Raspberry camera module.

The second step was setting up the software.  Upgrading the raspberry pi from python 2 to python 3.  Installing the Google Coral example project and the like.

The third step was using a prebuilt model to see what I could identify.  It came with ability to identify 1000 different objects.  I ran the program and watched the logs to see what it was picking up.  I was able to verify birds using my kids stuffed animal in the shape of a chicken. 

The fourth step was getting birds in front of the camera.  I setup a feeder, but it takes time for bird to start using it.  I tried moving the camera to place in my yard that had frequent bird visits, but it yielded nothing.  I learned that for a bird to be recognized it had to be really close to the camera.

Sparrows started showing up a the feeder.  While they were feeding I captured several hundred photos that I coud use to train the model.  I also took photos of the feeder with no birds on it so the model could tell the difference.  This took some trial and error.  The same photos at different times of day had different shadows and coloring that could fool the model.  For example, if I only used feeder photos when the sun overhead, a feeder with an afternoon shadow may be categorized as a bird.  My training data eventually had the feeder and several bird feedings from throughout the day.

The fifth step, was updating the code to ony save the best photos.  I found around 80% accuracy on the sparrow where good photos.  Even as high as 70% would still give me false positives.  This will improve as I get better and tuning the model.  My guess is that any bird will get categorized as a sparrow initially.  But with each new species I can create a new category with its on training data and slowly expand to all specifies that use the feeder.

This is just the begining, but I am excited.  It will provide insights in to the local bird ecosystem.  When birds feed, what species are around, and what seasons certain species are more prevalant.  

A final touch on my first iteration was to add a Twitter account.  When I get a photo that registers with above 90% accuracy the code will autonomously post a photo to the [Project Leroy twitter account](https://twitter.com/ProjectLeroy).

You can find the Project Leroy code on [Github](https://github.com/bozzltron/project-leroy).

I leave you with Project Leroy's first autonomous tweet!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m 88 percent sure this is a Sparrow. <a href="https://twitter.com/hashtag/ai?src=hash&amp;ref_src=twsrc%5Etfw">#ai</a> <a href="https://t.co/YGpZsiHvC4">pic.twitter.com/YGpZsiHvC4</a></p>&mdash; ProjectLeroy (@ProjectLeroy) <a href="https://twitter.com/ProjectLeroy/status/1287186343089643520?ref_src=twsrc%5Etfw">July 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
