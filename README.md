# Crowdtracker

Track movement of groups of people:

* User : An individual user moving in a group
* Group: A group of people
* Location: A sampled user position represented by [geoJson](http://geojson.org/)
* Area: Show user locations within an geoJson polygon as described in [mongoDB](http://docs.mongodb.org/manual/core/2dsphere/)

## Install

* Install and start: [mongoDB](http://www.mongodb.org) 
* Install: [Node.js](http://nodejs.org)
* Recommended: [nodemon](http://nodemon.io)

Install node packages:

```
$ npm install
```


## Start crowdtracker server

```
$ node app.js
```
or

```
$ nodemon app.js
```


## Load testdata

```
$ cd testdata
$ npm install
$ node loadData.js testdata.json
```


## Query

Search for

* a user
* a group
* within an area
* or combined...

```
http://localhost:3000/location/
http://localhost:3000/location?user=nic
http://localhost:3000/location?group=wolves
http://localhost:3000/location?area=[[35,5],[45,6],[49,8],[35,10],[35,5]]
http://localhost:3000/location?user=nic&group=wolves&area=[[35,5],[45,6],[49,8],[35,10],[35,5]]
```


 

