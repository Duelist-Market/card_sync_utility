import * as fs from "fs";
import * as path from "path";
import Axios from "axios";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import cards from "./cards.json";
import { YgoCardEntry } from "./types/YgoCardEntry";

async function saveCardImagesToS3() {
  const cardData = cards["data"] as YgoCardEntry[];

  for (let i = 0; i < cardData.length; i++) {
    const card = cardData[i];
    console.log("====================================");
    console.log("Syncing Images for: ", card.name, "index: ", i);
    const cardImage = card["card_images"][0];

    console.log("Downloading Image: ", cardImage["image_url"]);
    const response = await Axios({
      url: cardImage["image_url"],
      method: "GET",
      responseType: "stream",
    });

    const fullFileName = `${card.id}_full.jpg`;
    const smallFileName = `${card.id}_small.jpg`;

    const fullImagePath = path.resolve(__dirname, fullFileName);
    const smallImagePath = path.resolve(__dirname, smallFileName);

    await downloadImage(cardImage["image_url"], fullImagePath);
    await downloadImage(cardImage["image_url_small"], smallImagePath);

    console.log("Uploading full image.");
    await uploadCardImage(`card_images/full/${card.id}.jpg`, fullImagePath);
    console.log("Finished uploading full image.");

    console.log("Uploading small image.");
    await uploadCardImage(`card_images/small/${card.id}.jpg`, smallImagePath);
    console.log("Finished uploading small image.");
  }
}

async function downloadImage(url: string, imagePath: string) {
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(imagePath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function uploadCardImage(s3FileName: string, fileName: string) {
  const bucketName = "duelistmarketimages";
  const body = fs.readFileSync(fileName);

  // Upload the stream
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3FileName,
    Body: body,
  });

  return await client.send(command);
}

saveCardImagesToS3();
