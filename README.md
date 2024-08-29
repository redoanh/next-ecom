This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Deploy 
```bash
docker build -t my-nuxt-app .
docker run -d -p 3000:3000 my-nuxt-app
```
Open [http://<ip>:3000](http://<ip>:3000) with your browser to see the result.

### Remove Container (if need ) 
```bash
docker ps
# stop image
docker stop <container_id>
# remove Image my-next-app
docker rm <container_id>
```
# next-ecom
