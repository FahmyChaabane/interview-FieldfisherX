# Task

## Practical: Write code

Please code ONE of the two scenarios, upload your code to a public Git repository (e.g. use GitHub or GitLab) and share the URL to the aforementioned public Git repository with us.
Please use NodeJS for the backend and ReactJS for the frontend. Please us Typescript.

Please don’t spend more than 3 hours on this. This does not have to be perfect and/or complete. It should run (= ‘npm start’ should start the frontend/backend) and the code should be “understandable” without comments.

The purpose of this task is to get a general feeling for your programming skills and create the basis for a productive talk where we dive deeper in possible technical challenges that we actually face(d).

## Situation

We have a platform that manages court cases for us. When a new court case comes in, we have to add it to the database. For this task we use our platform.
The new scenario has arisen and we need to rework our add case wizard. To create a new case, we now need to capture additional information.

## Scenario: Backend

Please write a backend using NodeJS that accepts two routes:
parameter format json

### `POST` query named `/api/case` Route

This query has the following parameters:

```
customerName:string
startDate: date
isFinished: boolean
```

The query handler should accept these parameters and save them to a text file. It should also add a new parameter named `fxFileId` of type string that has the following structure:
`[customer_name]-[last-two digits of current year]-[4 arbitrary characters]`, e.g. `Facepalm-23-1234`, `TiffaniesCar-23-5cbf`. Before a new case is stored, the new `fxFileId` is generated. **Important**, each `fxFileId` has to be unique.

### `GET` query named `/api/allcases` Route

This query returns all cases.

The query handler retrieves all cases from file and returns them.

I will use Postman to query the backend.

## Scenario 2: Frontend

Please write a frontend using React. The frontend should have two pages:

### Page(s) where users add new case

The frontend should have a dialog that consists of multiple sub-pages. On each sub-page you enter one of the parameters to create a new court case. Here are the parameters:

```
customerName:string
startDate: date
isFinished: boolean
```

For example, on the first page there is an input plus label for parameter `customerName` and a `next` button. After the user clicks `next`, (s)he gets to the next sub-page where the next parameter
is entered. On the last sub-page (=where the last parameter is entered), there is a `finish` button. On clicking `finish` a request is "sent" to the backend with the correct parameters. The
aforemetioned request is actually saved to a file in form of a new case. **Important**, only save new case to file after ALL parameter have been entered. The file may look like the following:

```
customerName:'LisasLatschen', startDate: '01.01.2023', isFinished: false
customerName:'PaulsPatterns', startDate: '01.12.2022', isFinished: true
...

```

### Page that lists all cases in table

This page shows all cases.
The page shows a table with all cases and their parameters that it loads from file.

I will use my browser to run the client.

## Questions/Comments

If you have any questions, please don't hesitate to ask paul.schmieder@fieldfisher.com
