# CRUD MongoDB Application

A full-stack CRUD application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

-  Create new users
-  Read/Display all users
-  Update existing users
-  Delete users
-  Responsive web interface
-  MongoDB integration
-  Deployed on Vercel

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Vercel

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crud-mongodb-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Deployment

### MongoDB Setup
1. Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>` in the connection string

### Vercel Deployment
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variable `MONGODB_URI` in Vercel dashboard
4. Deploy!

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number (required, min: 0),
  createdAt: Date,
  updatedAt: Date
}
```