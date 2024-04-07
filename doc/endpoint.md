# Endpoint

This is endpoints for dentist booking application

## User `/auth`

### Register `POST /register`

register new user to system

### Login `POST /login`

set token cookie to user's request

### User's info `GET /me`

get basic information of logged in user

### Logout `/GET logout`

delete token cookie to user's request

## Clinic `/clinics`

### Get all `GET /`

get all clinics

## Dentist `dentists`

### Get all `GET /`

get all + avg rating for each dentist

### Get one `GET /:id`

get info by id

### Create dentist `POST /`

create new dentist in system

### Update `PUT /:id`

update dentist info

### Delete `DELETE /:id`

delete dentist

## Appointment `/appointments`

### Get all `GET /`

get all appointment of user

### Get one `GET /:id`

get single appointment

### Create appointment `POST /`

add new appointment

### Update appointment `PUT /:id`

update appointment

### Delete appointment `DELETE /:id`

delete appointment

## Review `/review`

### Add review `POST /`

add new review

### Get all `GET /`

get all review of dentists

### Update review `PUT /:id`

update review

### Delete review `DELETE /:id`

delete review
