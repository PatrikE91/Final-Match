It'll take a bit of research, but essentially you want to figure out the implementation of these steps:

1. User interacts with a file input on the client, selects a file to upload
2. Client sends that file in the request to whatever endpoint (e.g. /register)
3. Backend controller saves that file to the images directory, giving it a name like {username}_profile_image.jpg
4. Backend saves {username}_profile_image.jpg into the profileImgUrl property on the database User model
5. When the client makes a request to get the user's data, the response will look something like:
{
  "status": "success",
  "data": {
    "id": 42,
    "username": "ricksanchez",
    "profileImgUrl": "ricksanchez_profile_image.jpg"
  }
}

6. To display that profile image in the app, the client would do something like:
<img src={`http://localhost:4000/images/${user.profileImgUrl}`} />