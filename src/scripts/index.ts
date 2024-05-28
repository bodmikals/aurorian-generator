import fs from "fs";
import path from "path";
import sharp from "sharp";
import { generateAurorianOldvsNew } from "./generateOldvsNew";
import { generateSingle } from "./generateSingle";
import { AurorianV2Generator } from "../sdk/index";

const width = 2048;
const height = 2560;

declare global {
  interface Array<T> {
    last(): T;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

async function runMultiple() {
  const outputFolder = "output";
  // delete folder first
  // if (fs.existsSync(outputFolder)) {
  //   fs.rmdirSync(outputFolder, { recursive: true });
  // }
  // fs.mkdirSync(outputFolder);
  const seqToColorNamePath = path.join(
    path.resolve(),
    "deps",
    "seq_to_color.json"
  );

  const hairlessVersion = JSON.parse(
    fs.readFileSync(
      path.join(path.resolve(), "deps", "hairless-versions.json"),
      "utf-8"
    )
  );

  const whiteshirtVersion = JSON.parse(
    fs.readFileSync(
      path.join(path.resolve(), "deps", "white-shirt-versions.json"),
      "utf-8"
    )
  );

  const baseMouthVersion = JSON.parse(
    fs.readFileSync(
      path.join(path.resolve(), "deps", "base-mouth-versions.json"),
      "utf-8"
    )
  );
  // 0 black, 1 latino, 2 white
  const seqToColorName = JSON.parse(
    fs.readFileSync(seqToColorNamePath, "utf-8")
  );

  const oldAuroriansPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/processed_files/consolidated_data.json";
  const oldAurorians = JSON.parse(fs.readFileSync(oldAuroriansPath, "utf-8"));
  const defaultBackGroundPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/SocialMedia/Skins/background/BG_Background_Orange.png";
  const newAssetsPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/NFT/Aurorian_Tokané";

  const backgroundPaths = fs
    .readdirSync(path.join(newAssetsPath, "Backgrounds"))
    .map((v) => path.join(newAssetsPath, "Backgrounds", v));

  const line = await sharp({
    create: {
      width: 5,
      height: height,
      channels: 3,
      background: "black",
    },
  })
    .png()
    .toBuffer();

  // for (let index = 330; index < 1000; index++) {
  for (let index = 100; index < 10000; index++) {
    // cl(index);
    await generateAurorianOldvsNew(
      // 50,
      index,
      oldAurorians,
      seqToColorName,
      newAssetsPath,
      defaultBackGroundPath,
      outputFolder,
      line,
      backgroundPaths,
      hairlessVersion,
      whiteshirtVersion,
      baseMouthVersion
    );
  }
  process.exit(0);
}

async function runSingleWithSDK() {
  const outputFolder = "output";
  // delete folder first
  // if (fs.existsSync(outputFolder)) {
  //   fs.rmdirSync(outputFolder, { recursive: true });
  // }
  // fs.mkdirSync(outputFolder);
  const seqToColorNamePath = path.join(
    path.resolve(),
    "deps",
    "seq_to_color.json"
  );

  // 0 black, 1 latino, 2 white
  const seqToColorName = JSON.parse(
    fs.readFileSync(seqToColorNamePath, "utf-8")
  );

  const oldAuroriansPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/processed_files/consolidated_data.json";
  const oldAurorians = JSON.parse(fs.readFileSync(oldAuroriansPath, "utf-8"));
  const defaultBackGroundPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/SocialMedia/Skins/background/BG_Background_Orange.png";
  const newAssetsPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/NFT/Aurorian_Tokané";

  const sdk = new AurorianV2Generator(
    newAssetsPath,
    oldAuroriansPath,
    path.resolve(path.resolve(), "deps", "hairless-versions.json"),
    path.resolve(path.resolve(), "deps", "white-shirt-versions.json"),
    path.resolve(path.resolve(), "deps", "base-mouth-versions.json"),
    seqToColorName
  );
  const sequence = 5;
  const { buffer: data } = await sdk.generate(sequence, defaultBackGroundPath);
  const savePath = path.join(outputFolder, `${sequence}.png`);
  fs.writeFileSync(savePath, data);
}

async function runMultipleWithSDK() {
  const outputFolder = "output";
  // delete folder first
  if (fs.existsSync(outputFolder)) {
    fs.rmdirSync(outputFolder, { recursive: true });
  }
  fs.mkdirSync(outputFolder);
  const seqToColorNamePath = path.join(
    path.resolve(),
    "deps",
    "seq_to_color.json"
  );

  // 0 black, 1 latino, 2 white
  const seqToColorName = JSON.parse(
    fs.readFileSync(seqToColorNamePath, "utf-8")
  );

  const oldAuroriansPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/processed_files/consolidated_data.json";
  const oldAurorians = JSON.parse(fs.readFileSync(oldAuroriansPath, "utf-8"));
  const defaultBackGroundPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/SocialMedia/Skins/background/BG_Background_Orange.png";
  const newAssetsPath =
    "/home/levani/tevle/Aurory Dropbox/AuroryProject/NFT/Aurorian_Tokané";

  const sdk = new AurorianV2Generator(
    newAssetsPath,
    oldAuroriansPath,
    path.resolve(path.resolve(), "deps", "hairless-versions.json"),
    path.resolve(path.resolve(), "deps", "white-shirt-versions.json"),
    path.resolve(path.resolve(), "deps", "base-mouth-versions.json"),
    seqToColorName
  );
  const start = 0;
  const end = 1;
  for (let sequence = start; sequence < end; sequence++) {
    const sequence = 5;
    const { buffer: data } = await sdk.generate(sequence);
    const savePath = path.join(outputFolder, `${sequence}.png`);
    fs.writeFileSync(savePath, data);
  }
}

runMultipleWithSDK();
