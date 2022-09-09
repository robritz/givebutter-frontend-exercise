# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

A phase 1 update could be to store the pokemon list in an object and perform the filter on that object versus making a fetch for the list on each search keystroke. There may be some hangups with useEffect fetching data on pageload, so I would perform the caching on the first search and make it available for subsequent searches.

If we know the data is only updated say, once a day at a specific time, we could run a cron job to fetch the data and store it in our database. 

Caching each request for pokemon details for repeated retrieval would also help with performance.

- Is there anything you would consider doing if we were to go live with this app?

I would add security checks around the form input to prevent folks and/or bots from running JS from our app. 

- What was the most challenging aspect of this work for you (if at all)?

I was a little rusty on Promises! It was fun to dig up chaining the details and evolution calls to simplify that process. I would love some feedback on whether this approach works well or needs some tweaking. 

I noticed the use of BEM naming conventions, which I'm familiar with but not well versed in. I enjoyed diving into that process and looking for clues into how the team is using them in this instance.


Thank you so much for this opportunity! This was a really fun exorcise, I enjoyed it. Cheers!