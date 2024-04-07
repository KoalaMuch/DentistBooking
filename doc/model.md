# Model

This is mongoose schema for dentist booking application

## User

| Field    | Type              |
| -------- | ----------------- |
| name     | string            |
| tel      | string            |
| email    | string            |
| password | string            |
| role     | ["user", "admin"] |

## Clinic

| Field      | Type   |
| ---------- | ------ |
| name       | string |
| address    | string |
| district   | string |
| province   | string |
| postalcode | string |
| tel        | string |
| region     | string |

## Dentist

| Field           | Type                     |
| --------------- | ------------------------ |
| name            | string                   |
| yearOfExp       | int                      |
| areaOfExpertise | []string                 |
| clinic          | mongoose.schema.objectId |

## Appointment

| Field     | Type                     |
| --------- | ------------------------ |
| apptDate  | Date                     |
| user      | mongoose.schema.objectId |
| dentist   | mongoose.schema.objectId |
| createdAt | Date                     |

## Review

| Field   | Type                     |
| ------- | ------------------------ |
| user    | mongoose.schema.objectId |
| dentist | mongoose.schema.objectId |
| rating  | int                      |
| comment | string                   |
