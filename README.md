# Backend Node

## Info

A simple Apartment Management System, for Clerks as users, to maintain Apartments
in a Gated Community. 

## Routes

Below are the different routes of the RESTful API:

### Admin Routes

1. **POST /admin/login** : _Login as admin_
2. **POST /admin/logout** : _Logout as admin_
3. **GET /admin/users** : _Get all the users_
4. **POST /admin/users** : _Add a new user_
5. **GET /admin/users/:id** : _Get a user by id_
6. **PUT /admin/users/:id** : _Update a user by id_
7. **DELETE /admin/users/:id** : _Delete a user by id_

### User Routes

1. **POST /user/login** : _Login as user_
2. **POST /user/logout** : _Logout as user_

### Appartment Routes

The Appartment routes can be accessed by both the admin and user.
Admin can create an appartment with any userid, can view all the appartment, update and delete any appartment.
The user can create an appartment with its own userid, view all the appartments created by him, update and delete the appartments created by him.

2. **GET /appartment** : _Get all the appartments_
3. **POST /appartment** : _Add a new appartment_
4. **GET /appartment/:id** : _Get an appartment by id_
5. **PUT /appartment/:id** : _Update an appartment by id_
6. **DELETE /appartment/:id** : _Delete an appartment by id_

