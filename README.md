### Instructions to run locally

```
$ npm install
$ sls offline
```

### To Test It Locally

- Make the following request (replace `{{URL}}` with the page you want to get content for)

```
curl -H "Content-type: application/json" -d '{"src":"es", "tgt":"en", "service":1, "texts":["Hola","Mundo"]}' -X POST http://localhost:3000/translate
```

### To Deploy on AWS

- Add your profile in `serverless.yml` and run

```
$ sls deploy
```

- Make the following request (replace `{{URL}}` with the page you want to get content for and `{{lambda_url}}` with your lambda url)

```
curl -H "Content-type: application/json" -d '{"src":"es", "tgt":"en", "service":1, "texts":["Hola","Mundo"]}' -X POST {{lambda_url}}
```
