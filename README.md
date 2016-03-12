# A complete Calendar Example

## Calendar

1. Calendar with:
 - 3 view (month, week and day)
 - Realtime
 - Account.
 - Mode Editor
2. an interface for the administration with:
 - Authorisation
 - user and role management
 - events, rooms and exceptions management,

 ### Roles :
 - admin : everything (admin & calendar)

 ### Events:
 - a title
 - a description(optional)
 - room
 - dates (start end end)

### How to Start

```sh
npm install
```

```sh
sails lift
```

After first run, go to config/policies.js and replace this,
```

  'home': ['doInFirstInstall']// comment this after first run.
  // 'home': true

```
by this
```

  // 'home': ['doInFirstInstall']// comment this after first run.
  'home': true

```




### Dependencies
- [sails 0.12.1](http://sailsjs.org)
- [react 0.14](https://github.com/facebook/react)
- [react-router](https://github.com/rackt/react-router)
- [react-motion](https://github.com/chenglou/react-motion)
- [newforms](https://github.com/insin/newforms)
- [newforms-bootstrap](https://github.com/insin/newforms-bootstrap)
- [sails-hook-babel](https://github.com/artificialio/sails-hook-babel)
- [sails-hook-passport](https://github.com/jaumard/sails-hook-passport)
- [webpack](https://github.com/webpack/webpack)


## TODO
- Homepage
- flash message
- secure registering
- fix bug admin exception on update
- add a contact member
- add picto for to know whose event i can update
- externalise components (timepicker, datepicker, datetimepicker, et calendar) and admin
- test
- prepare deploy strategy
- better first install



a [Sails](http://sailsjs.org) application
