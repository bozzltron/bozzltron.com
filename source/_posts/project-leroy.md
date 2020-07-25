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

My first project using Artificial Intellgence.

<!-- more -->

I've had the idea for Project Leroy for some time.  With all the time at home during the pandemic, its providing more motivation.  The inspiration came from my Grandfather Leroy.  He and my Grandmother loved birds.  I remember visiting Grandma and Grandpa's house as a child seeing bird watching books by the window.  Just outside were collection of different feeders.  They also enjoyed cuckoo clocks.  They had one in their home to sang a different bird song every hour.

Project Leroy is applying Artificial Intelligence to bird watching.  The goal is to be able to indentify any bird species that comes to the feeder.  It uses a image categorizing machine learning model which is trained on data collected at a birder feeder to increase accuracy over time. 

![Raspberry Pi 3, Google Coral, Camera Module](/images/posts/project-leroy.jpg)

The first step was getting the hardware.  I already had a Raspberry Pi 3 laying around for the main system.  I picked up the Google Coral usb module for the model processing.  Lucky enough, Google Coral had a bird feeder project that became my starting point for the code.  Last addition was the Raspberry camera module.

The second step was setting up the software.  Upgrading the raspberry pi from python 2 to python 3.  Installing the Google Coral example project and the like.

The third step was using a prebuilt model to see what I could identify.  It came with ability to identify 1000 different objects.  I ran the program and watched the logs to see what it was picking up.  I was able to get verify birds using my kids stuffed animal in the shape of a chicken. 

The fourth step was getting birds in front of the camera.  I setup a feeder, but it takes time for bird to start using it.  I tried moving the camera to place in my yard that had frequent bird visits, but it yielded nothing.  I learned that for a bird to be recognized it had to be really close to the camera.

Finally, sparrows started showing up a the new bird feeder I setup.  While they were feeding I captured several hundred photos that I coud use to train the model.  I also took photos of the feeder with no birds on it so the model could detect a bird visit.  This took some trial and error.  The same photos at different times of day had different shadows and coloring that could fool the model.  My training data eventually had the feeder and several bird feedings from throughout the day.

The fifth step, was updating the code to ony save the best photos.  I found around 80% accuracy on the sparrow where good photos.  Even as high as 70% would still give me false positives.  This will improve as I get better and tuning the model.  My guess is that any bird will get categorized as a sparrow initially.  But with each new species I can create a new category with its on training data and slowly expand to all specifies that use the feeder.

This is just the begining, but I am excited.  It will provide insights in to the local bird ecosystem.  When birds feed, what species are around, and what seasons certain species are more prevalant.  

A final touch on my first iteration was to add a Twitter account.  When I get a photo that registers with above 90% accuracy the code will autonomously post a photo to the [Project Leroy twitter account](https://twitter.com/ProjectLeroy).

You can find the Project Leroy code on [Github](https://github.com/bozzltron/project-leroy).