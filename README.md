# Introduction
DKB coding challenge result by Wolf-Jaromir Loyal done on 07.08.2022
Thanks for checking my coding-challenge, I hope you find it satisfying!
I learned a lot of new stuff and found vue to be an intresting alternativ to angular and react.
## Store Decision
My initial draft idea contained using the vuex as a statemanagement for the application.
In this case the CardDisplay.vue would have dispatched an event to the store with the id of the clicked instance of CardDisplay.vue. The TransactionApplication.vue would then subscribe to that to refresh the amount field and adapt the cardhighlighting.
However I abbandond the idea in order to have CardDisplay and TransactionDisplay simply as presentation (or "dumb") components and the only logic inside TransactionApplication.vue. For a small use case like this a store might have been overengineered in a certain way, but netherless probably also intresting to show its usage.
## Known TODOs
Unfortunately in order to keep in the 4-5 hours timelimit I had to cut a few things short, which I would have liked to improve  :(
- Fix typescript issues (including accessability issues, but also variable typings in the filtering of transactions)
- Wrap json data import at least in a service that mimicks async rest calls, possibly with axios for easy replacement with real api (example: https://stackoverflow.com/questions/62032787/loading-json-files-with-axios-get-from-static-directory)
  - possibly some parts of the data block of TransactionApplication would have need adjustments for async behaviour
- Add (more) tests