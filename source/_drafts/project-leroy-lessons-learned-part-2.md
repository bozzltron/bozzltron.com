---
title: Project Leroy - Lessons Learned Part 2
categories:
  - Technology
tags:
  - ai
hero: /images/posts/hero-leroy.jpg
hero_title: ''
---

How to not crash a Raspberri Pi.

<!-- more -->
## Resilience on Raspberry Pi
Currently, I'm running Leroy on a Raspberry Pi 3.  The compute power needed for computer vision is high.  I found there were many fail safes I needed to put in place to ensure Leroy would not crash and potentially miss visitations. 

### Ensure python properly handles exceptions.
Leroy's computer vision code runs on python using opencv.  Its essenially an infinite loop capturing frames form a video stream and looking for birds using object detection and classification.  I handle exceptions at the loop level to to keep Leroy running in spite of issues during processing.  I handle exceptions at the main program level as a catch all.  Logging is key.  Doing this kind of computation it easy for the Raspberry Pi to crash.  If you're not logging then you losing information on what went wrong.  

### Check for adequate disk space before saving images
When a machine get's low on disk space it can become almost unusable.  Leroy is designed to run offline, so there is not process as of now to sync photos to the cloud.  If left unchecked, Leroy could fill his own disk and crash.  I put checks in his code every time he goes to save a photo to makes sure disk space is more that 95%.

### Optimizing Object Detection
Leroy presents a dilemma when it comes to 
Resize the frames captured on the web cam to be small before running them through object detection to reduce the amount of compute power needed.

