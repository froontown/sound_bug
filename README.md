# SoundBug

SoundBug is a two-week project from my time at the bootcamp, Launch Academy. The goal of SoundBug during these two weeks was to construct a simple sharing/review site where Users can add a song title, artist, and description. Other Users can log in and upvote or downvote them. The React.js based front end eliminates the need to refresh the main song list with each vote cast.

Tech I've used for SoundBug include:

* Ruby on Rails
* React.js
* CarrierWave/Fog
* JavaScript
* Foundation

Further goals for SoundBug:

* Implement Wavesurfer.js to allow Users to upload songs
* Build JavaScript instruments so Users can rock out with an instrument through the app
* Other ideas pending

## Demo

Check it out at: [SoundBug] (https://soundbug.herokuapp.com/)

## Setup

SoundBug was built using Ruby v 2.2.5p319 and developed with Ruby on Rails 5.0.

## Get Rails set up!

```
git clone https://github.com/froontown/sound_bug.git
cd sound_bug
bundle install
rake db:create
rake db:migrate
```

## Get webpack set up!

```
npm install
```

SoundBug uses Amazon Web Services to upload images, (and eventually, songs Users can share once I figure out Wavesurfer.js.) You're going to need to create a .env file in your root directory, (add it to your .gitignore if you're going to go live with this stuff,) and add your keys to that .env file like so:

```
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
S3_BUCKET=<YOUR_S3_BUCKET>
```

You're going to need at least two tabs in terminal.

Tab 1:

```
npm start
```

Tab 2:

```
rails s
```

Finally, go to your browser and go to the following URL:
```
localhost:3000
```

Create an account, log in, and start adding songs to your hearts content!

## .gif Demo: ![Alt Text](app/assets/images/SoundBug.gif)


### Known Issues:

* Search Bar stopped working once I added React
* Can't get Wavesurfer.js to work yet
* Top Bar disappears unless User shrinks window to medium sized first for some reason, (googling says this might be a bug in Foundation 5)
* Songs made prior to implementing React.js are broken, (DB probably needs to be dropped and recreated)
