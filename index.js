const dasha = require("@dasha.ai/sdk");
const csv = require("./csv-plugin");
const simpleCsvSchedule = require("./sdk-upload");
const fs = require("fs");
const moment = require("moment");

async function main() {
  const app = await dasha.deploy("./app");

  app.ttsDispatcher = () => "Default";

  await app.start({concurrency:10});
  
  if(process.argv[2] === "chat"){
    const file = process.argv[3];
    const data = csv.load(file, null);
    const conv = app.createConversation({...data[0], phone: "chat"});

    const logFile = await fs.promises.open(`./log.txt`, "w");
    await logFile.appendFile("#".repeat(100) + "\n");

    conv.on("transcription", async (entry) => {
      await logFile.appendFile(`${entry.speaker}: ${entry.text}\n`);
    });

    conv.on("debugLog", async (event) => {
      if (event?.msg?.msgId === "RecognizedSpeechMessage") {
        const logEntry = event?.msg?.results[0]?.facts;
        await logFile.appendFile(
          JSON.stringify(logEntry, undefined, 2) + "\n"
        );
      }
    });

  conv.audio.tts = "dasha";

  if (conv.input.phone === "chat") {
    await dasha.chat.createConsoleChat(conv);
  } else {
    conv.on("transcription", console.log);
  }
    
    await app.stop();
    app.dispose();
    await logFile.close();
    
  } else {
    const fileIn = process.argv[2];
    let fileOut = process.argv[3];
    if(!fileOut) {
      fileOut = `${moment().format("YYYY-MM-DD_HH-mm-ss")}.csv`;
    }
    await simpleCsvSchedule.loadAndQueue(app, fileIn);
    simpleCsvSchedule.handleCalls(app, fileOut, async () => {
      console.log(`Calls completed`);
      await app.stop();
      app.dispose();
      process.exit(0);
    });
  }
}

main();
