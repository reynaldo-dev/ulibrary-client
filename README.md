# ULibrary_client
Focus fullstack technical test (ULibrary) 

### Tech Stack  
- React js
- Tailwind
- Daysi UI
- Redux
- Redux toolkit
- Formik
- Axios
- Typescript
- React router dom v6

  
    
 ### Modules  
 - Users (by role)
 - Auth 
 - Borrows (soon)
 - Books  
 - Protected routes and api requests by role
 - Code spliting and lazy loading
   

## ENV
- Create an ```env``` file based in the ```.example.env```
- This is the API url on live https://ulib-api.onrender.com
### Instalation
 
 ```
 shell
 
 npm install  
 npm run dev  
 
```

### Deploy  
https://euphonious-halva-26daaf.netlify.app
  
    
### Auth  
```
librarian : {
 email      : johndoe.ulib@ulib.com
 first_name : John
 last_nme   : Doe
}


student : {
 email      : josemoran.ulib@ulib.com
 first_name : Jose
 last_name  : Moran
}
```



### What a librarian can do
- Add new books
- Add new users
- Confirm books return when a borrow is with the "To return" state and when he comfirm the return of a borrow, the stock of that book will increase


### What a student can do
- See the books to request one book
- See hi´s borrows store
- Request a book, when the request is done, the stock of that book will decrease
- Mark one borrow with the "To return" state, this will help to the librarian to confirm the return of that book and increase the stock.

 

