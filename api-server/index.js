const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand, ECSClient } = require("@aws-sdk/client-ecs");
const { Server } = require("socket.io");
const Redis = require("ioredis");

const subscriber = new Redis(
  ""
);

const io = new Server({ cors: "*" });

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);
  });
});
io.listen(9001, () => {
  console.log(`Socket server 9001`);
});

const app = express();
const PORT = 9000;
const ecsClient = new ECSClient({
  region: "",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const config = {
  // AWS ECS cluster arn
  CLUSTER: "",

  // Task Defination in ECS arn
  // !!!!! remove number at the end of the arn !!!!!
  TASK: "",
};

app.use(express.json());

app.post("/project", async (req, res) => {
  const { gitURL ,slug } = req.body();
  const projectSlug = slug ? slug : generateSlug();

  // sping the container
  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: [
          "subnet-0c364045c881f1aad",
          "subnet-0b70fd02fcb7a6d19",
          "subnet-0c1ddfb525fdc019fJ",
        ],
        securityGroups: ["sg-Of68ac449a85ac7"],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "builder-image",
          environment: [
            { name: "GIT_REPOSITORY__URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);

  return res.json({
    status: "queued",
    data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
  });
});

async function initRedisSubscribe() {
  console.log("Subscribe to logs....")
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.listen(PORT, () => {
  console.log(`API SERVER  Running... ${PORT}`);
});