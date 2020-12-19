# DSC_APP_BACKEND

## Authentication Using JWT

* Token should be stored in local storage (preferred) or cookies at the front-end and should be sent with every request to authenticate user.

* Token will be created and returned to user when logged in and will be valid for a week from the time of login.

* Algorithm used : SH256

## API Endpoints

- [ ] '/' - Home Page'
- [ ] '/auth/student/login' [POST]
- [ ] '/auth/student/register' [POST]
- [ ] '/auth/teacher/login' [POST]
- [ ] '/auth/teacher/register' [POST]
- [ ] '/profile' [GET] - User Profile
- [ ] '/profile/edit' [GET] - Start profile edit
- [ ] '/profile/edit' [POST] - Submit profile edit
- [ ] '/subject' [GET]
- [ ] '/subject' [POST] -> *(admin)* To add subject
- [ ] '/subject/:subCode' [GET]
- [ ] '/subject/:subCode/announcement' [GET] -  Announcements related to specified subCode
- [ ] '/subject/:subCode/announcement' [POST] - *(admin)* Announcements related to specified subCode
- [ ] '/subject/:subCode/notes' [GET] - All notes related to specified subCode
- [ ] '/subject/:subCode/notes' [POST] - *(admin)* To post notes
- [ ] '/subject/:subCode/notes/:noteId' [GET] - Get note with specified noteId
- [ ] '/subject/:subCode/assignment' [GET] - All assignment related to specified subCode
- [ ] '/subject/:subCode/assignment' [POST] - *(admin)* To post assignments
- [ ] '/subject/:subCode/assignment/:assignmentId' [GET] - Get assignment with specified assignmentId

