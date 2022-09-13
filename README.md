# Introduction
Coding challenge results by Wolf-Jaromir Loyal done on 07.08.2022
Thanks for checking my coding-challenge, I hope you find it satisfying!
I started out with literally zero knowledge of vue.js and I learned a lot of new stuff and found vue to be an intresting alternativ to angular and react.

## Initial Challenge
### Cards and Transactions Overview

The image in the folder gives a visual overview of how the page is intended to look like (as a minimum). 

The purpose of this task is to build a card and transactions overview page. The user should be able to select one of the cards, see it's transactions and be able to filter the transactions based on the amount.

Acceptance Criteria:

- User can select one of the cards
- The transactions of the selected card will be displayed
- The transactions have a same background color than the card
- There should be a filter field between the cards and the transactions
- The user can filter transactions by inputting amount to the filter fields. Transactions with the amount in the fields or greater should be left visible
- If the user changes a selected card and there is content in the filter fields, the content should be reset

### Implementation Details

Build the overview page as an App using Vue. The `data` folder contains example data which your app would realistically acquire from a REST interface.

For the purpose of this task, consider the following:
- The result should be in the format of a Vue project 
- provide a package.json and lockfile allowing to build and run it *locally*
- You can use Vue 2 or Vue 3, VueCLI or vite or a manual build, the choice is yours
- For the data, you can simply import them statically, though you can consider the asynchronous nature of REST calls and build your app accordingly
- Consider the usage of state management, routing, typescript, linters, testing

### Notes
There is no time limit on the task, but we want to be respectful of your time and recommend not to spend more than 4-5 hours.

## Solution
### Store Decision
My initial draft idea contained using the vuex as a statemanagement for the application.
In this case the CardDisplay.vue would have dispatched an event to the store with the id of the clicked instance of CardDisplay.vue. The TransactionApplication.vue would then subscribe to that to refresh the amount field and adapt the cardhighlighting.
However I abbandond the idea in order to have CardDisplay and TransactionDisplay simply as presentation (or "dumb") components and the only logic inside TransactionApplication.vue. For a small use case like this a store might have been overengineered in a certain way, but netherless probably also intresting to show its usage.

### Known TODOs
Unfortunately in order to keep in the 4-5 hours timelimit I had to cut a few things short, which I would have liked to improve  :(
- Fix typescript issues (including accessability issues, but also variable typings in the filtering of transactions)
- Wrap json data import at least in a service that mimicks async rest calls, possibly with axios for easy replacement with real api (example: https://stackoverflow.com/questions/62032787/loading-json-files-with-axios-get-from-static-directory)
  - possibly some parts of the data block of TransactionApplication would have need adjustments for async behaviour
- Add (more) tests
