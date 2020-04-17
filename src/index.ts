import fastify from "fastify";
import Helmet from "fastify-helmet";

import config from "./config";

// -- SETUP -------------------------------------------------------------- //

const app = fastify({
  logger: { prettyPrint: config.debug ? { forceColor: true } : undefined },
});

app.register(Helmet);

// -- GET ---------------------------------------------------------------- //

app.get("/health", (req, res) => {
  res.status(204).send();
});

app.get("/hello", (req, res) => {
  res.status(200).send(`Hello World, this is Fastify Test Server `);
});

// -- POST --------------------------------------------------------------- //

app.post("/webhook", async (req, res) => {
  try {
    app.log.info(`req.body: ${JSON.stringify(req.body, null, 2)}`);
    res.status(200).send({ success: true });
  } catch (error) {
    app.log.error(error);
    res.status(500).send({ message: error.message });
  }
});

// -- INIT --------------------------------------------------------------- //

app.ready(async () => {
  // app ready
});

const [host, port] = config.host.split(":");
app.listen(+port, host, (err, address) => {
  if (err) throw err;
  app.log.info(`Server listening on ${address}`);
});
