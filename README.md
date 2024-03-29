# ProNote - MoyianeGeomonique

This project is documented in English, but meant for French students using ProNote.
We're all tired of insignificant averages of our grades. That's why we introduce the memey Geomonic Meandian !
It's basically just a fancy mix of the classic average, the geometric average, the harmonic mean, as well as the median. It is meant to be more representative of the student's actual results.

## Installation

First, you need a few dependencies (on top of [node.js](https://nodejs.org/en/)):
```bash
$ npm i --save @dorian-eydoux/pronote-api
$ npm i dotenv
```

Then, you need to setup a .env file like so, in the same directory as the main JS file:
```
URL=https://some-address.probably-index-education.net/pronote/
LOGIN=xxxxx.xxxxx
PASSWORD=xxxxxxxx
CAS=xxxxxx
```
If you aren't too sure about all the settings, [please refer to this documentation](https://github.com/Litarvan/pronote-api).

## Usage

From there on, usage is extremely simple, in the terminal, type:
```bash
$ node ./moyiane_geomonique
```
or you can specify a trimestre
```
$ node ./moyiane_geomonique Trimestre 2
```

It will output a table like so:
```js
NAME name
┌─────────────────────────────┬───────────┐
│           (index)           │  Values   │
├─────────────────────────────┼───────────┤
│           Student           │   18.45   │
│         Classmates          │   14.85   │
│ Theoritical Perfect Student │   19.59   │
│      Relative to Best       │ '94.64 %' │
└─────────────────────────────┴───────────┘
```
> For reference, the "perfecy student" isn't a single person, it is the best grade of every single test attended by the student, and the % of the relative grade is the GMD of the percentage of that best grade.
