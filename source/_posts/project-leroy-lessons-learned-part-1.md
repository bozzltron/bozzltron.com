---
title: Project Leroy - Lessons Learned Part 1
categories:
  - Technology
tags:
  - ai
hero: /images/posts/hero-leroy.jpg
hero_title: ''
date: 2020-09-27 13:19:04
---

Leroy, my first AI project, has presented a number of new technical challenges.  Here are my lessons learned presented in a multi-part series.

<!-- more -->

## Object detection Versus Classification
My first iteration of Project Leroy started with classification.  Classification for Leroy was taking an entire frame from his cameras video stream and trying to classify it as a type of bird.  The results were very inconsistent.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m 91 percent sure this is a Male Northern Cardinal. <a href="https://twitter.com/hashtag/ai?src=hash&amp;ref_src=twsrc%5Etfw">#ai</a> <a href="https://t.co/xBhWZDFbzS">pic.twitter.com/xBhWZDFbzS</a></p>&mdash; ProjectLeroy (@ProjectLeroy) <a href="https://twitter.com/ProjectLeroy/status/1288564703778820096?ref_src=twsrc%5Etfw">July 29, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><caption>Classification fail.</caption>
<br /> <br />
It makes sense why classfication was not effective because when we bird warch as humans we are not looking at everything our eye sees and trying understand it as one type of thing.  Instead we understand that what we're looking at is a composition of many little things.  Of those things, we look for birds in particular and when we spot one, we try and understand what type of bird it is.  This led my to update Leroy to achieve his goal in two steps.  First object detection and second classification.
<br /> <br />
<video controls muted="muted">
  <source src="/images/posts/training.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
<caption>My daughter helped me test out object detection with her stuffed chicken Gary.</caption>
<br /> <br />

Once Leroy has detected an objected the results include the level of confidence and bounding box coordinates.  With this information, I am able to set a threshold on when to proceed with actually capturing a photo.  I'm constantly tweaking this, but for now 40% is pretty good.  Once Leroy hits that threshold, he uses the bounding box to save only that part of the frame, like a cutout of the original photo.  That cutout is what I run through classification.  The results have been much more accurate.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m 78% sure I see a bird and 47% sure its Haemorhous mexicanus (House Finch) <a href="https://twitter.com/hashtag/ai?src=hash&amp;ref_src=twsrc%5Etfw">#ai</a> <a href="https://twitter.com/hashtag/GoogleCoral?src=hash&amp;ref_src=twsrc%5Etfw">#GoogleCoral</a> <a href="https://t.co/pxSW6JMTGj">pic.twitter.com/pxSW6JMTGj</a></p>&mdash; ProjectLeroy (@ProjectLeroy) <a href="https://twitter.com/ProjectLeroy/status/1298632153358639104?ref_src=twsrc%5Etfw">August 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
<br /><br />

The models I am using for object detection and classification respectively are: 
1. ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite
2. mobilenet_v2_1.0_224_inat_bird_quant_edgetpu.tflite.

Both are provided by the [Google Coral's model page](https://coral.ai/models/).