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


# Pluie, Vent, Neige: Comment le climat a-t-il changé en France métropolitaine de 2010 à 2018?

Une visualisation de 4 indicateurs de temps et leurs évolutions en France, par régions, de 2010 à 2018.

![image](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/all.PNG)

Le code est disponible sur wasaviz [github-repository](https://github.com/wasaviz/wasaviz.github.io.git), et la visualisation est visible sur notre [github page](https://wasaviz.github.io/).
Vous pouvez aussi trouver une vidéo de notre présentation sur la [visualisation-video](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/project_video.mp4).
   
### Les Données

Nos [données](https://public.opendatasoft.com/explore/dataset/donnees-synop-essentielles-omm/information/?sort=date) proviennent du site OpenDataSoft. Le jeu de données comporte un certain nombre d'indicateurs météorologiques sur le territoire français depuis 2010. Un pré-traitement des données a été réalisé, afin de ne garder que les indicateurs utilisés, ainsi qu'une agrégation par semaine, mois, ou années.

### Application

Nous avons designé une application composée de trois visualisations inter-connectées : 

  - Une **carte de la France**, montrant un indicateur par station météo de notre jeu de données. Ces inicateurs contiennent 4 vaiables, chacune ayant une échelle de couleur différente : température, vent, pluie et neige. Leur intensité varie avec la valeur de la variable. Les bornes min et max utilisées pour chaque indicateur peuvent être retrouvées en bas à droite. Les valeurs correspondent à la période temporelle donnée par le slider de l'application.
  - Une **projection dans le plan de deux varaibles**. Le but est de montrer les corrélations entre deux indicateurs, à un moment donné. Les variables choisies peuvent être changées, et les axes seront mis à l'échelle si besoin est. L'évolution au cours du temps des stations peut être visualisé en lançant une vidéo sur la période temporelle demandée. 
  - Un **line chart** peut être utilisé grâce aux deux visualisations précédentes. Il montre l'évolution d'une des quatre variables dans le temps. La variable peut être choisie en passant le curseur sur l'indicateur voulu sur la carte, ou sur la projection. Une ligne verticale montre la position du slider courant.

Les différentes visualisations sont inter-connectées, c'est à dire que lorsque une station est sélectionnée sur une des visualisations, elle l'est aussi sur les autres. 

### Ce que nous avons appris

Tout d'abord, les changements climatiques en france sont visibles : la température est importante sans les régions du Sud, tandis qu'il semble beaucoup pleuvoir en Bretagne et qu'il vente fort. Le niveau de neige est plus important dans les régions de l'Est.

Nous avons aussi observé une augmentation importante des averses depuis 2014. On peut l'observer très clairement sur le line chart, mais aussi sur le film projeté de l'évolution des averses.

![image](https://github.com/wasaviz/wasaviz.github.io/blob/master/Images_video/rain.PNG)

### Contact

CASSAN Océane : oceane.cassan@etu.univ-lyon1.fr

COTTET Clément : clement.cottet@etu.univ-lyon1.fr

TEITGEN Raphaël : raphael.teitgen@etu.univ-lyon1.fr

VERKIN Louise : louise.verkin@etu.univ-lyon1.fr
