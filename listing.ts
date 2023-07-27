import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import ProgressBar from "progress";

export async function downloadListing() {
  const apiURL = process.env["YGO_API_URL"];

  try {
    const { data, headers } = await axios({
      url: apiURL,
      method: "GET",
      responseType: "stream",
    });

    //Estimate based on the last time I downloaded the file. The API doesn't provide a content-length header.
    const totalLength = 15832487;

    const writer = fs.createWriteStream(
      path.resolve(__dirname, "./cards.json")
    );

    const progressBar = new ProgressBar(
      "-> Downloading Card Listing from Ygopro [:bar] :percent :etas",
      {
        width: 40,
        complete: "=",
        incomplete: " ",
        renderThrottle: 1,
        total: totalLength,
      }
    );

    data.on("data", (chunk) => {
      progressBar.tick(chunk.length);
    });

    data.pipe(writer);
  } catch (error) {
    console.error(error);
  }
}
