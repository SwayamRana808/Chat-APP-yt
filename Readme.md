initializing npm init -y in root so both frontend and backend can be deployed together.
MONGO_DB_URI=mongodb+srv://swayamrana808: <PASSWORD>@cluster0.cgt4y5x.mongodb.net/<DATABASENAME (you can name any or the present one)>?retryWrites=true&w=majority&appName=Cluster0

to generate JWT TOKEN random secret key put command "<openssl rand -base64 32>" in git bash 

we use proxy in client side as we will deploy app in same domain so only need in development phase 

<export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{  
      "/api":{
        target:"http://localhost:8000"
      }
    }
  }
})>


deploying backend and frontend---

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


  "start": "nodemon backend/server.js",
  "build":"npm install && npm install --prefix frontend && npm run build --prefix frontend"

  <npm run build> in root that contains both frontend and backend 