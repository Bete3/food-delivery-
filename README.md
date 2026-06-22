# food-delivery-

## MongoDB Atlas user data

Your app stores users in MongoDB Atlas in the `users` collection. Each document should look like this:

```json
{
	"name": "Ali",
	"email": "ali@example.com",
	"password": "$2a$10$hashed-password-here"
}
```

Put import data in `backend/users.json`.

Example file:

```json
[
	{ "name": "Ali", "email": "ali@example.com", "password": "TempPass123!" },
	{ "name": "Sara", "email": "sara@example.com", "password": "TempPass123!" }
]
```

Import it into Atlas with:

```powershell
cd "c:\Users\hp\OneDrive\Desktop\food delivery\backend"
npm run import:users
```

## Frontend endpoints

The frontend already sends requests to these endpoints:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

The frontend base URL comes from `NEXT_PUBLIC_API_URL`. If that is not set, it defaults to `http://localhost:5000`.

Example frontend env file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Backend env file example:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret
CLIENT_ORIGIN=http://localhost:3000
```

## Updating data from the frontend

After login, the frontend stores `userToken` in `localStorage`. Send that token as a Bearer token when calling the profile endpoint:

```ts
const token = localStorage.getItem('userToken');

await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'}/api/auth/profile`, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
	body: JSON.stringify({
		name: 'New Name',
		email: 'new@example.com',
		password: 'NewPass123!'
	}),
});
```

The backend will update the MongoDB Atlas `users` document for the signed-in user and return a fresh token.