# Promptron

Promptron is a web application designed to inspire creativity and facilitate the sharing of AI prompts for platforms like ChatGPT and Midjourney. Visitors can explore and share AI prompts, view prompts created by others, filter prompts based on the AI platform, and search for prompts using our intuitive search feature. Each prompt is tagged according to category, making it easy to find exactly what you're looking for.

## Features

* Home Feed: Explore prompts created by other users.
* Filter & Search: Filter the home feed based on AI platform and search for prompts using the search box.
* Categories: Prompts are tagged according to category for easy browsing.
* User Profiles: Visit user profiles and see their contributions to the Promptron community.
* Google Authentication: Create an account with Google and start sharing your own prompts.
* Create Prompts: Share your AI prompts with the world.
* Upload Images: Attach AI-generated images or art to your prompts.
* Interact: Like the prompts of other users and show your appreciation for their creativity.
* Copy Button: Easily copy text prompts.

## Technology Stack

* [Next.js](https://nextjs.org/) - The React framework for production.
* [React](https://reactjs.org/) - JavaScript library for building user interfaces.
* [Next-Auth](https://next-auth.js.org/) - Complete open source authentication solution for Next.js applications.
* [MongoDB](https://www.mongodb.com/) / [Mongoose](https://mongoosejs.com/) - Database management.
* [Firebase Storage](https://firebase.google.com/products/storage) - For storing user-generated images and AI art.
* [TailwindCSS](https://firebase.google.com/products/storage) - CSS Styling Framework.

## Installation

To run Promptron locally, you need to have Firebase and Google OAuth consent set up, as well as a MongoDB cluster for the backend.

Clone the repo:

```bash
git clone https://github.com/Rasheednour/promptron.git
```

Change into the project directory:

```bash
cd promptron
```

Install dependencies:

```bash
npm install
```

Finally, start the development server:

```bash
npm run dev
```

Now the application should be running on [localhost:3000](http://localhost:3000).

For more detailed instructions on setup and configuration for Google OAuth, Firebase, and MongoDB, please refer to their respective official documentation.

## Contributing

Promptron welcomes contributions! If you found a bug, want to propose a feature or feel the urge to correct my grammar, I would love to hear from you. Feel free to open an issue or create a pull request.

## License

MIT

## Contact

If you want to get in touch, you can reach out via [GitHub](https://github.com/<your-github-username>). 

Happy Coding!
