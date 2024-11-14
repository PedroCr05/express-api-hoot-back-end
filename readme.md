# User Stories

- As a guest, I should be able to create an account.
- As a guest with an account, I should be able to log in to my account.
- AAU, I should be able to create a hoot post.
- AAU, I should be able to read a list of all hoots.
- AAU, I should be able to view information about a single hoot post along with its associated comments.
- AAU, I should be able to add a comment to a specific hoot.
- As the author of a hoot, I should be able to update that hoot.
- As the author of a hoot, I should be able to delete that hoot.

---

## Chart

| HTTP Method | Controller    | Response | URI                     | Use Case          |
| ----------- | ------------- | -------- | ----------------------- | ----------------- |
| POST        | create        | 200      | /hoots                  | Create a hoot     |
| GET         | index         | 200      | /hoots                  | List hoots        |
| GET         | show          | 200      | /hoots/:hootId          | Get a single hoot |
| PUT         | update        | 200      | /hoots/:hootId          | Update a hoot     |
| DELETE      | deleteHoot    | 200      | /hoots/:hootId          | Delete a hoot     |
| POST        | createComment | 200      | /hoots/:hootId/comments | Create a comment  |
