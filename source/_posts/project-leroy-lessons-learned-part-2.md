---
title: Project Leroy - Lessons Learned Part 2
categories:
  - Adventure
tags:
  - ai
hero: /images/posts/hero-leroy.jpg
hero_title: ''
date: 2020-09-27 18:48:37
---

<!-- more -->


How to not crash a Raspberri Pi.

<!-- more -->
## Resilience on Raspberry Pi
Currently, I'm running Leroy on a Raspberry Pi 3.  The compute power needed for computer vision demanding for a small device.  I found there were many fail safes I needed to put in place to ensure Leroy would not crash and potentially miss visitations. 

### 1. Ensure python properly handles exceptions.
Leroy's computer vision code runs on python using the opencv library.  The code runs an infinite loop capturing frames from a video stream and looking for birds using object detection and classification.  I handle exceptions at the loop level to to keep Leroy running in spite of issues during processing.  I handle exceptions at the main program level as a catch all.  Logging is key.  With this heavy of a load on Raspberry Pi, its easy for it to crash.  If you're not logging then you are losing information you need to stabilize.  

### 2. Check for adequate disk space before saving images
When a machine get's low on disk space it can become unusable.  Leroy is designed to run offline, so there is not process, as of now, to sync photos to the cloud to maintain space locally.  If left unchecked, Leroy could fill his own disk and crash.  I put checks in his code every time he goes to save a photo to makes sure disk space is less than 95%.

### 3. Optimizing Image Size
Leroy presents a dilemma when it comes to processing images.  As bird watcher, I want the highest resolution image I can get.  As an engineer, I want the smallest.  The smaller the photo the faster Leroy will be at detecting birds and less prone to crashing under the stress of data processing.  PiCamera version 1 is a 5 megapixel camera.  Version 2 is a 8 megapixel.  At full resolution, this is way too much data to run through an object detection model.  Believe me, I tried.

How do we get the best of both worlds?

Resizing.  Leroy can now capture 8MP images while resizing the frame on-the-fly down to a 400px width for object detection.  This took some serious trial and error.  

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m 64% sure this is Haemorhous mexicanus (House Finch) <a href="https://twitter.com/hashtag/ai?src=hash&amp;ref_src=twsrc%5Etfw">#ai</a> <a href="https://twitter.com/hashtag/GoogleCoral?src=hash&amp;ref_src=twsrc%5Etfw">#GoogleCoral</a> <a href="https://t.co/8Ushabf7Kh">pic.twitter.com/8Ushabf7Kh</a></p>&mdash; ProjectLeroy (@ProjectLeroy) <a href="https://twitter.com/ProjectLeroy/status/1310334811714838529?ref_src=twsrc%5Etfw">September 27, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

How do you get a bounding box for a full-size image when its coordinates came from the resized image? 

The bounding box is returned as a percentag of width and height.  Simply taking that percentage and multiplying it by the width, if its an x coordinate, or height, if its a y coordinate, will translate the box to whatever size image you are working with.  In order for this to work, you have to maintain aspect ratio.  For PiCamera that is 4:3. 

### 4. Run Leroy as a linux service
Running Leroy as a registered linux service allows me to configure the service to bounce back if it goes down.  In the future, I hope to capture this same resilience using docker, which also has the ability to restart the container if it goes down.

### Conclusion
All of these things put together allows Leroy to run 24/7 detecting and classifying birds, capturing 8MB stills completely offline until the disk is nearly complete.  This opens up the possiblity of running off of battery power in remote locations, which I plan to do.