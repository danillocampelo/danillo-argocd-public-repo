# Smiles Web ![Prod](https://github.com/outsmartdigital/smiles-web/actions/workflows/deploy.yaml/badge.svg?branch=main)

It's an application built for Smiles, delivering select packages for clients.
It is built on top of [Next.js](https://nextjs.org/) project and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install project dependencies using yarn:

```bash
yarn
## or
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Requests / Server-Side State

In `src/api/_common/api.ts` we have an middleware that is used by all requests in our application.

We use react-query for handling requests for our back-end, bringing all the benefits that comes with it, using the previously mentioned middleware.

We are using the concept of [Hydration](https://tanstack.com/query/v4/docs/guides/ssr#using-hydration) of react-query, that prefetches queries of
server-side, "Dehydrates" them of the library's functionalities, and once the page loads those queries are "Hydrated" again gaining the functionality of
react-query again.

**For a new request, you need to create:**

- **Data Transfer Object (DTO)**: Data that comes from API in this format.
- **Mapper Function**: Maps the DTO to a **Model**.
- **Model**: model data used inside the project
- **Service API**: Handles the request using the common middleware, and returns the DTO being Mapped.
- **Query Hook**: Receives the input necessary for the request, optionally queryOptions. Creates a useQuery hook, using a constant query-key and the **Service API** request.

**Then for use:**

- Make a request on server side using `getQueryAndDehydrateProps`, the constant query-key and the **Service API** request.
- On client-side use created hook and consume the hydrated data.

# Structure

## pages/

This folder contains all the next endpoints, being them actual pages or a request to the Next.js API.

App.tsx on this file we wrap all the providers needed for the pages inside our application.

- [QueryClientProvider](https://tanstack.com/query/v4/docs/reference/QueryClientProvider)
- [Hydrate](https://tanstack.com/query/v4/docs/reference/hydration#hydrate-1)

## public/

This folder contains all assets (images/audios/favicon/svgs) provided by our application.

## src/

- **api/**: Logic involved in making the requests mentioned on the previous section.
- **components/**: Components that can be used anywhere on out application.
- **hooks/**: Custom hooks (requests/miscellaneous) on our application.
- **models/**: Data models used in our application.
- **utils/**: Enviroment configurations, constants, and a Feature Manager based on the Enviroment
- **views/**: All the page structures in our app. Each having their own components folder for page-specific components.
- **styles/**: Only used for importing tailwind base styling.

# Styling (Tailwind)

We are using Tailwind to stylize the application take a look at the following resources:

- [Tailwind documentation](https://tailwindcss.com/docs/installation)
- [Tailwind cheat sheet](https://tailwindcomponents.com/cheatsheet/)
- [Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (for an easier development)

# Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

# Localization

For localization using SSR we are using [next-i18next](https://github.com/i18next/next-i18next) a package recommended by Next for using [i18next](https://www.i18next.com/) and [react-i18next](https://github.com/i18next/react-i18next) in a Next.js application.

The language JSONs that store all the translated text are saved in `public/locales/`, with a different folder for each language. We can separate the translated text into different JSONs and use them accordingly.

**How to use:**
On the page-level component, on the server-side, by calling either `getStaticProps` or `getServerSideProps`, return the result of the `serverSideTranslations` function inside the props.

And on the client-side use the `useTranslation` hook to obtain the translated text.

# Staging deploy
If you need to deploy a new staging version, just follow these steps:
- `git checkout main`
- `git pull origin main`
- `git branch -D staging`
- `git checkout -b staging`
- `git push origin staging`
