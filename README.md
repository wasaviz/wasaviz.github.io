# Rain, wind, snow: how has climate changed in mainland France from 2010 to 2018?


![image](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/teaser.png)


### Context

This project was realized in the framework of our [Data Visualization class](https://lyondataviz.github.io/teaching/lyon1-m2/2018/), tutored by Aurélien Tarbard and Romain Vuillermot. It is part of the formation provided in the Lyon [Artificial Intelligence MASTER](http://master-info.univ-lyon1.fr/IA/#intro).

The code is avalable in the Wasaviz   [github-repository](https://github.com/wasaviz/wasaviz.github.io.git), and the visualisation can be seen in our [github page](https://wasaviz.github.io/).
You'll also find a video which show our visualisation at [visualisation-video](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/project_video.mp4).
   
### Dataset

Our [dataset](https://public.opendatasoft.com/explore/dataset/donnees-synop-essentielles-omm/information/?sort=date) comes from the OpendDataSoft website. The dataset gathers many weather features in the French territories since 2010. It was processed in order to filter the undeseried features and agregate them by weeks, mounths or years.

### Application

We designed an application composed by three connected visualisations :

  - A **map of France**, showing one indicator by weather station of our dataset. Those indicators contain 4 variables, each in a different color scale : temperature, wind, rain and snow. Their intensity increaases with the value of the variable. The min and max scale values can be seen in the bottom right hand corner. The values correspond to time point given by the gobal slider of the application.
  - A **projection in a plane formed by two variables**. It aims to reveal correlations between two features, at a given time point. Those variables can be changed, and the axis will be rescaled as needed. The temporal evolution of the stations can be shown by launching a movie from the current time point. 
  - A **line chart** that can be accessed from the two previous visualisations. It shows one of the 4 variables in time. The variable can be chosen by hovering over the corresponding part of an indicator of the map, or in the projection graph. A vertical line shows the position of the current slider.

The different visualisations are linked to each other, such as when a station is hovered over in a graph, it is also enlarged in the other one. 

### What we learnt

First of all, the different climates in France are visible : the temperatures are high is the southern places, whereas the rain levels are high in Bretagne, as well as the wind speed. The snow height is more important in the East regions.

Something else we noticed is the dramatic increase of rain episodes intensity in the second half of our timespan. It clearly appears in the rain line charts, but also in the movies of the projection graph involving rain levels.
![image](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/rain.PNG)


- Faire pull request pour l'envoyer sur la page du cours

![image](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/thumbnail.png)
