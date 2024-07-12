import path from "path";
import {
  AurorianData,
  AurorianSkin,
  AurorianType,
  FULL_OUTFIT_SEQUENCES,
} from "./index";

export const seqToColorName = {
  0: "Black",
  1: "Latino",
  2: "White",
};

const attributeToNewFilenameMap = {
  // Skin
  "0_Human": "Aurorian_Body_Black2",
  "1_Human": "Aurorian_Body_Latino2",
  "2_Human": "Aurorian_Body_White2",
  Zombie: "Aurorian_Body_Zombie",
  "Golden Skeleton": "", // handmade
  "Solana Blob": "Aurorian_Body_Blob",
  Skeleton: "Aurorian_Body_Skeleton",
  "Golden Blob": "Aurorian_Body_BlobGolden",
  Helios: "", // done later
  Head_0: "Aurorian_Head_Black",
  Head_1: "Aurorian_Head_Latino",
  Head_2: "Aurorian_Head_White_Main",
  // 'Cloth'
  "No Trait_1": "Aurorian_Cloth_HumbleTownsman",
  "No Trait_1_Aurory Necklace": "Aurorian_Necklace_Coral_HumbleTownsman",
  "No Trait_1_Shark Necklace": "Aurorian_Necklace_Bone_HumbleTownsman",
  "No Trait_1_Flower Necklace": "Aurorian_Necklace_Flower_HumbleTownsman",
  "No Trait_1_Solana Necklace": "Aurorian_Necklace_Golden_HumbleTownsman",
  "No Trait_2": "Aurorian_Cloth_HumbleAdventurer",
  "No Trait_2_Aurory Necklace": "Aurorian_Necklace_Coral_HumbleAdventurer",
  "No Trait_2_Shark Necklace": "Aurorian_Necklace_Bone_HumbleAdventurer",
  "No Trait_2_Flower Necklace": "Aurorian_Necklace_Flower_HumbleAdventurer",
  "No Trait_2_Solana Necklace": "Aurorian_Necklace_Gold_HumbleAdventurer",
  "No Trait_3": "Aurorian_Cloth_HumblePeasant",
  "No Trait_3_Aurory Necklace": "Aurorian_Necklace_Coral_HumblePeasant",
  "No Trait_3_Shark Necklace": "Aurorian_Necklace_Bone_HumblePeasant",
  "No Trait_3_Flower Necklace": "Aurorian_Necklace_Flower_HumblePeasant",
  "No Trait_3_Solana Necklace": "Aurorian_Necklace_Gold_HumblePeasant",
  "No Trait_Solana Blob_Aurory Necklace": "Aurorian_Necklace_Coral_Blob",
  "No Trait_Solana Blob_Shark Necklace": "Aurorian_Necklace_Bone_Blob",
  "No Trait_Solana Blob_Flower Necklace": "Aurorian_Necklace_Flower_Blob",
  "No Trait_Solana Blob_Solana Necklace": "Aurorian_Necklace_Gold_Blob",
  "No Trait_Golden Blob_Aurory Necklace": "Aurorian_Necklace_Coral_BlobGolden",
  "No Trait_Golden Blob_Shark Necklace": "Aurorian_Necklace_Bone_BlobGolden",
  "No Trait_Golden Blob_Flower Necklace": "Aurorian_Necklace_Flower_BlobGolden",
  "No Trait_Golden Blob_Solana Necklace": "Aurorian_Necklace_Gold_BlobGolden",
  "No Trait_Zombie_Aurory Necklace": "Aurorian_Necklace_Coral_Zombie",
  "No Trait_Zombie_Shark Necklace": "Aurorian_Necklace_Bone_Zombie",
  "No Trait_Zombie_Flower Necklace": "Aurorian_Necklace_Flower_Zombie",
  "No Trait_Zombie_Solana Necklace": "Aurorian_Necklace_Golden_Zombie",
  "No Trait_Skeleton_Aurory Necklace": "Aurorian_Necklace_Coral_Skeleton",
  "No Trait_Skeleton_Shark Necklace": "Aurorian_Necklace_Bone_Skeleton",
  "No Trait_Skeleton_Flower Necklace": "Aurorian_Necklace_Flower_Skeleton",
  "No Trait_Skeleton_Solana Necklace": "Aurorian_Necklace_Gold_Skeleton",
  "Black Hoodie": "Aurorian_Cloth_Houdi_Black",
  "Black Hoodie_Zombie": "Aurorian_Cloth_Houdi_Black_Zombie",
  "Black Hoodie_Aurory Necklace": "Aurorian_Necklace_Coral_Hoodie",
  "Black Hoodie_Aurory Necklace_Zombie":
    "Aurorian_Necklace_Coral_Hoodie_Zombie",
  "Black Hoodie_Shark Necklace": "Aurorian_Necklace_Bone_Hoodie",
  "Black Hoodie_Shark Necklace_Zombie": "Aurorian_Necklace_Bone_Hoodie_Zombie",
  "Black Hoodie_Flower Necklace": "Aurorian_Necklace_Flower_Hoodie",
  "Black Hoodie_Solana Necklace": "Aurorian_Necklace_Gold_Hoodie",
  // Overalls renamed as Overalls Solo for non humans
  Overalls: "Aurorian_Cloth_Salopette",
  Overalls_Zombie: "Aurorian_Cloth_Salopette_Zombie",
  "Overalls_Aurory Necklace": "Aurorian_Necklace_Coral_BlackSmith",
  "Overalls_Aurory Necklace_Zombie":
    "Aurorian_Necklace_Coral_BlackSmith_Zombie",
  "Overalls_Shark Necklace": "Aurorian_Necklace_Bone_BlackSmith",
  "Overalls_Shark Necklace_Zombie": "Aurorian_Necklace_Bone_BlackSmith_Zombie",
  "Overalls_Flower Necklace": "Aurorian_Necklace_Flower_BlackSmith",
  "Overalls_Flower Necklace_Zombie":
    "Aurorian_Necklace_Flower_BlackSmith_Zombie",
  "Overalls_Solana Necklace": "Aurorian_Necklace_Gold_BlackSmith",
  "Overalls_Solana Necklace_Zombie": "Aurorian_Necklace_Gold_BlackSmith_Zombie",
  "Overalls Solo": "Aurorian_Cloth_Salopette_#Speciaux",
  "Overalls Solo_Zombie": "Aurorian_Cloth_Salopette_#Speciaux_Zombie",
  "Overalls Solo_Skeleton": "Aurorian_Cloth_Salopette_#Speciaux_Skeleton",
  "Overalls Solo_Aurory Necklace": "Aurorian_Necklace_Coral_BlackSmith_NoShirt",
  "Overalls Solo_Aurory Necklace_Zombie":
    "Aurorian_Necklace_Coral_BlackSmith_NoShirt_Zombie",
  "Overalls Solo_Shark Necklace": "Aurorian_Necklace_Bone_BlackSmith_NoShirt",
  "Overalls Solo_Flower Necklace":
    "Aurorian_Necklace_Flower_BlackSmith_NoShirt",
  "Overalls Solo_Solana Necklace": "Aurorian_Necklace_Gold_BlackSmith_NoShirt",
  Jacket: "Aurorian_Cloth_Blouson",
  Jacket_Zombie: "Aurorian_Cloth_Blouson_Zombie",
  "Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Cuire",
  "Jacket_Aurory Necklace_Zombie": "Aurorian_Necklace_Coral_Cuire_Zombie",
  "Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Cuire",
  "Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Cuire",
  "Jacket_Solana Necklace": "Aurorian_Necklace_Golden_Cuire",
  "Puffy Jacket": "Aurorian_Cloth_Doudoune",
  "Puffy Jacket_Zombie": "Aurorian_Cloth_Doudoune_Zmobie",
  "Puffy Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Doudoune",
  "Puffy Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Doudoune",
  "Puffy Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Doudoune",
  "Puffy Jacket_Solana Necklace": "Aurorian_Necklace_Gold_Doudoune",
  // Renamed to Jean Jacket Solo for non humans
  "Jean Jacket": "Aurorian_Cloth_JeanJacket",
  "Jean Jacket_Zombie": "Aurorian_Cloth_JeanJacket_Zombie",
  "Jean Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Hoodie bleu",
  "Jean Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Hoodie bleu",
  "Jean Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Hoodie bleu",
  "Jean Jacket_Solana Necklace": "Aurorian_Necklace_Golden_Hoodie bleu",
  "Jean Jacket Solo": "Aurorian_Cloth_JeanJacket_#Speciaux",
  "Jean Jacket Solo_Aurory Necklace":
    "Aurorian_Necklace_Coral_Hoodie bleu_Open",
  "Jean Jacket Solo_Shark Necklace": "Aurorian_Necklace_Bone_Hoodie bleu_Open",
  "Jean Jacket Solo_Flower Necklace":
    "Aurorian_Necklace_Flower_Hoodie bleu_Open",
  "Jean Jacket Solo_Solana Necklace": "Aurorian_Necklace_Gold_Hoodie bleu_Open",
  "Classic Jacket": "Aurorian_Cloth_Veste",
  "Classic Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Veste",
  "Classic Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Veste",
  "Classic Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Veste",
  "Classic Jacket_Solana Necklace": "Aurorian_Necklace_Gold_Veste",
  "Hawaii Shirt": "Aurorian_Cloth_Hawaii",
  "Hawaii Shirt_Zombie": "Aurorian_Cloth_Hawaii_Zombie",
  "Hawaii Shirt_Aurory Necklace": "Aurorian_Necklace_Coral_Kimono",
  "Hawaii Shirt_Shark Necklace": "Aurorian_Necklace_Bone_Kimono",
  "Hawaii Shirt_Flower Necklace": "Aurorian_Necklace_Flower_Kimono",
  "Hawaii Shirt_Solana Necklace": "Aurorian_Necklace_Gold_Kimono",
  "Green Sweater": "Aurorian_Cloth_Bag",
  "Green Sweater_Zombie": "Aurorian_Cloth_Bag_Zombie",
  "Green Sweater_Aurory Necklace": "Aurorian_Necklace_Coral_Adventurer",
  "Green Sweater_Shark Necklace": "Aurorian_Necklace_Bone_Adventurer",
  "Green Sweater_Flower Necklace": "Aurorian_Necklace_Flower_Adventurer",
  "Green Sweater_Solana Necklace": "Aurorian_Necklace_Gold_Adventurer",
  "Open Leather Jacket": "Aurorian_Cloth_Cuir_#Speciaux",
  "Open Leather Jacket_Zombie": "Aurorian_Cloth_Cuir_#Speciaux_Zombie",
  "Open Leather Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Leather_Open",
  "Open Leather Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Leather_Open", // missing, yann est au courant
  "Open Leather Jacket_Flower Necklace":
    "Aurorian_Necklace_Flower_Leather_Open",
  "Open Leather Jacket_Solana Necklace": "Aurorian_Necklace_Gold_Leather_Open",
  "Open Jacket": "Aurorian_Cloth_Veste_Open",
  "Open Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Veste_Open",
  "Open Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Veste_Open",
  "Open Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Veste_Open",
  "Open Jacket_Solana Necklace": "Aurorian_Necklace_Gold_Veste_Open",
  "Shoulder Straps": "Aurorian_Cloth_Bretelle",
  "Shoulder Straps_Zombie": "Aurorian_Cloth_Bretelle_Zombie",
  "Shoulder Straps_Aurory Necklace": "Aurorian_Necklace_Coral_Cartographer",
  "Shoulder Straps_Shark Necklace": "Aurorian_Necklace_Bone_Cartographer",
  "Shoulder Straps_Flower Necklace": "Aurorian_Necklace_Flower_Cartographer",
  "Shoulder Straps_Solana Necklace": "Aurorian_Necklace_Gold_Cartographer",
  "Classy Outfit": "Aurorian_Cloth_Chic",
  "Classy Outfit_Zombie": "Aurorian_Cloth_Chic_Zombie",
  "Classy Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_HighClass",
  "Classy Outfit_Shark Necklace": "Aurorian_Necklace_Bone_HighClass",
  "Classy Outfit_Flower Necklace": "Aurorian_Necklace_Flower_HighClass",
  "Classy Outfit_Solana Necklace": "Aurorian_Necklace_Gold_HighClass",
  "Black T-Shirt": "Aurorian_Cloth_Black",
  "Black T-Shirt_Skeleton": "Aurorian_Cloth_Black_Skeleton",
  "Black T-Shirt_Zombie": "Aurorian_Cloth_Black_Zombie",
  "Black T-Shirt_Aurory Necklace": "Aurorian_Necklace_Coral_Black",
  "Black T-Shirt_Shark Necklace": "Aurorian_Necklace_Bone_Black",
  "Black T-Shirt_Flower Necklace": "Aurorian_Necklace_Flower_Black",
  "Black T-Shirt_Solana Necklace": "Aurorian_Necklace_Golden_Black",
  "Yellow Stripes": "Aurorian_Cloth_Rayure_Yellow",
  "Yellow Stripes_Aurory Necklace": "Aurorian_Necklace_Coral_YellowStroke",
  "Yellow Stripes_Shark Necklace": "Aurorian_Necklace_Bone_YellowStroke",
  "Yellow Stripes_Flower Necklace": "Aurorian_Necklace_Flower_YellowStroke",
  "Yellow Stripes_Solana Necklace": "Aurorian_Necklace_Gold_YellowStroke",
  "Pink Stripes": "Aurorian_Cloth_CrystalBag_PurpleShirt",
  "Pink Stripes_Zombie": "Aurorian_Cloth_CrystalBag_PurpleShirt_Zombie",
  "Pink Stripes_Aurory Necklace": "Aurorian_Necklace_Coral_CrystalBag",
  "Pink Stripes_Shark Necklace": "Aurorian_Necklace_Bone_CrystalBag",
  "Pink Stripes_Flower Necklace": "Aurorian_Necklace_Flower_CrystalBag",
  "Pink Stripes_Solana Necklace": "Aurorian_Necklace_Gold_CrystalBag",
  Polo: "Aurorian_Cloth_Polo",
  Polo_Zombie: "Aurorian_Cloth_Polo_Zombie",
  "Polo_Aurory Necklace": "Aurorian_Necklace_Coral_Gray",
  "Polo_Shark Necklace": "Aurorian_Necklace_Bone_Gray",
  "Polo_Flower Necklace": "Aurorian_Necklace_Flower_Gray",
  "Polo_Solana Necklace": "Aurorian_Necklace_Gold_Gray",
  "Leather Jacket": "Aurorian_Cloth_Cuir",
  "Leather Jacket_Zombie": "Aurorian_Cloth_Cuir_Zombie",
  "Leather Jacket_Aurory Necklace": "Aurorian_Necklace_Coral_Leather",
  "Leather Jacket_Shark Necklace": "Aurorian_Necklace_Bone_Leather",
  "Leather Jacket_Flower Necklace": "Aurorian_Necklace_Flower_Leather",
  "Leather Jacket_Solana Necklace": "Aurorian_Necklace_Gold_Leather",
  Scarf: "Aurorian_Cloth_Scarf_#Speciaux",
  "Scarf_Aurory Necklace": "Aurorian_Necklace_Coral_CrystalBag_NoShirt",
  "Scarf_Shark Necklace": "Aurorian_Necklace_Bone_CrystalBag_NoShirt",
  "Scarf_Flower Necklace": "Aurorian_Necklace_Flower_CrystalBag_NoShirt",
  "Scarf_Solana Necklace": "Aurorian_Necklace_Gold_CrystalBag_NoShirt",
  "Axobubble Outfit": "Aurorian_Cloth_Axo",
  "Axobubble Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Axo",
  "Axobubble Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Axo",
  "Axobubble Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Axo",
  "Axobubble Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Axo",
  "Dinobit Outfit": "Aurorian_Cloth_Dinobit",
  "Dinobit Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Dinobit",
  "Dinobit Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Dinobit",
  "Dinobit Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Dinobit",
  "Dinobit Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Dinobit",
  "Unika Outfit": "Aurorian_Cloth_Unika",
  "Unika Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Unika",
  "Unika Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Unika",
  "Unika Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Unika",
  "Unika Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Unika",
  "Helios Outfit": "Aurorian_Cloth_Helios",
  "Helios Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Helios",
  "Helios Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Helios",
  "Helios Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Helios",
  "Helios Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Helios",
  "Sam Outfit": "Aurorian_Cloth_Sam",
  "Sam Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Sam",
  "Sam Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Sam",
  "Sam Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Sam",
  "Sam Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Sam",
  "Bitebit Outfit": "Aurorian_Cloth_Bitebit",
  "Bitebit Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Bitebit",
  "Bitebit Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Bitebit",
  "Bitebit Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Bitebit",
  "Bitebit Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Bitebit",
  "Zzoo Outfit": "Aurorian_Cloth_Zzoo",
  "Zzoo Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Zzoo",
  "Zzoo Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Zzoo",
  "Zzoo Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Zzoo",
  "Zzoo Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Zzoo",
  "Dracurve Outfit": "Aurorian_Cloth_Dracurve",
  "Dracurve Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Dracurve",
  "Dracurve Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Dracurve",
  "Dracurve Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Dracurve",
  "Dracurve Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Dracurve",
  "Dipking Outfit": "Aurorian_Cloth_Dipking",
  "Dipking Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Dipking",
  "Dipking Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Dipking",
  "Dipking Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Dipking",
  "Dipking Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Dipking",
  "Beetlefox Outfit": "Aurorian_Cloth_Beeblock",
  "Beetlefox Outfit_Aurory Necklace": "Aurorian_Necklace_Coral_Beeblock",
  "Beetlefox Outfit_Shark Necklace": "Aurorian_Necklace_Bone_Beeblock",
  "Beetlefox Outfit_Flower Necklace": "Aurorian_Necklace_Flower_Beeblock",
  "Beetlefox Outfit_Solana Necklace": "Aurorian_Necklace_Gold_Beeblock",
  // Necklace
  // Mouth / Mask
  "1_Base Mouth_2": "Aurorian_Head_Mouth_Neutral_White",
  "2_Base Mouth_2": "Aurorian_Head_Mouth_Neutral_White01",
  "1_Base Mouth_1": "Aurorian_Head_Mouth_Neutral_Latino",
  "2_Base Mouth_1": "Aurorian_Head_Mouth_Neutral_Latino01",
  "1_Base Mouth_0": "Aurorian_Head_Mouth_Neutral_Black",
  "2_Base Mouth_0": "Aurorian_Head_Mouth_Neutral_Black01",
  "Base Mouth_Golden Blob": "Aurorian_Head_Mouth_Neutral_BlobGold",
  "Base Mouth_Solana Blob": "Aurorian_Head_Mouth_Neutral_Blob",
  "No Trait_Mouth_Skeleton": "Aurorian_Expression_NeutralSmile", // Verify
  "Base Mouth_Zombie": "Aurorian_Head_Mouth_Neutral_Zombie",
  Angry_2: "Aurorian_Head_Mouth_AngryOpen_White",
  Angry_1: "Aurorian_Head_Mouth_AngryOpen_Latino",
  Angry_0: "Aurorian_Head_Mouth_AngryOpen_Black",
  "Angry_Golden Blob": "Aurorian_Head_Mouth_AngryOpen_BlobGold",
  "Angry_Solana Blob": "Aurorian_Head_Mouth_AngryOpen_Blob",
  Angry_Zombie: "Aurorian_Head_Mouth_AngryOpen_Zombie",
  // zombie
  "Big Smile_2": "Aurorian_Head_Mouth_Serious Smile_White", // @help: what about zombie
  "Big Smile_1": "Aurorian_Head_Mouth_Serious Smile_Latino",
  "Big Smile_0": "Aurorian_Head_Mouth_Serious Smile_Black",
  "Big Smile_Golden Blob": "Aurorian_Head_Mouth_Serious Smile_BlobGold",
  "Big Smile_Solana Blob": "Aurorian_Head_Mouth_Serious Smile_Blob",
  "Big Smile_Zombie": "Aurorian_Head_Mouth_Serious Smile_Zombie",
  // zombie
  Grin_2: "Aurorian_Head_Mouth_NeutralSmile_White", // @ similaire à big smile
  Grin_1: "Aurorian_Head_Mouth_NeutralSmile_Latino",
  Grin_0: "Aurorian_Head_Mouth_NeutralSmile_Black",
  "Grin_Golden Blob": "Aurorian_Head_Mouth_NeutralSmile_BlobGold",
  "Grin_Solana Blob": "Aurorian_Head_Mouth_NeutralSmile_Blob",
  Grin_Zombie: "Aurorian_Head_Mouth_Serious Smile_Zombie",
  "Barely Angry_2": "Aurorian_Head_Mouth_Angry_White",
  "Barely Angry_1": "Aurorian_Head_Mouth_Angry_Latino",
  "Barely Angry_0": "Aurorian_Head_Mouth_Angry_Black",
  "Barely Angry_Golden Blob": "Aurorian_Head_Mouth_Angry_BlobGold",
  "Barely Angry_Solana Blob": "Aurorian_Head_Mouth_Angry_Blob",
  "Barely Angry_Zombie": "Aurorian_Head_Mouth_Angry_Zombie",
  "Zipper Mask_2": "Aurorian_Mask_Zipper_White",
  "Zipper Mask_1": "Aurorian_Mask_Zipper_Latino",
  "Zipper Mask_0": "Aurorian_Mask_Zipper_Black",
  "Zipper Mask_Zombie": "Aurorian_Mask_Zipper_Zombie",
  "Zipper Mask_Skeleton": "Aurorian_Mask_Zipper_Skeleton",
  "Zipper Mask_Golden Blob": "Aurorian_Mask_Zipper_BlolbGold",
  "Zipper Mask_Solana Blob": "Aurorian_Mask_Zipper_Blob",
  "Cat Mask_2": "Aurorian_Mask_Cat_White",
  "Cat Mask_1": "Aurorian_Mask_Cat_Latino",
  "Cat Mask_0": "Aurorian_Mask_Cat_Black",
  "Cat Mask_Zombie": "Aurorian_Mask_Cat_Zombie",
  "Cat Mask_Skeleton": "Aurorian_Mask_Cat_Skeleton",
  "Cat Mask_Golden Blob": "Aurorian_Mask_Cat_BlobGold",
  "Cat Mask_Solana Blob": "Aurorian_Mask_Cat_Blob",
  "Plague Mask_2": "Aurorian_Mask_Plague_White",
  "Plague Mask_1": "Aurorian_Mask_Plague_Latino",
  "Plague Mask_0": "Aurorian_Mask_Plague_Black",
  "Plague Mask_Zombie": "Aurorian_Mask_Plague_Zombie",
  "Plague Mask_Skeleton": "Aurorian_Mask_Plague_Skeleton",
  "Plague Mask_Golden Blob": "Aurorian_Mask_Plague_BlobGold",
  "Plague Mask_Solana Blob": "Aurorian_Mask_Plague_Blob",
  Lollipop_2: "Aurorian_Mask_Lollypop_White",
  Lollipop_1: "Aurorian_Mask_Lollypop_Latino",
  Lollipop_0: "Aurorian_Mask_Lollypop_Black",
  Lollipop_Zombie: "Aurorian_Mask_Lollypop_Zombie",
  Lollipop_Skeleton: "Aurorian_Mask_Lollypop_Skelet",
  "Lollipop_Golden Blob": "Aurorian_Mask_Lollypop_BlobGold",
  "Lollipop_Solana Blob": "Aurorian_Mask_Lollypop_Blob",
  "Paint Mask_2": "Aurorian_Mask_PaintMask_White",
  "Paint Mask_1": "Aurorian_Mask_PaintMask_Latino",
  "Paint Mask_0": "Aurorian_Mask_PaintMask_Black",
  "Paint Mask_Zombie": "Aurorian_Mask_PaintMask_Zombie",
  "Paint Mask_Skeleton": "Aurorian_Mask_PaintMask_Skeleton",
  "Paint Mask_Golden Blob": "Aurorian_Mask_PaintMask_BlobGold",
  "Paint Mask_Solana Blob": "Aurorian_Mask_PaintMask_Blob",
  "Oni Mask_2": "Aurorian_Mask_Oni_White",
  "Oni Mask_1": "Aurorian_Mask_Oni_Latino",
  "Oni Mask_0": "Aurorian_Mask_Oni_Black",
  "Oni Mask_Zombie": "Aurorian_Mask_Oni_Zombie",
  "Oni Mask_Skeleton": "Aurorian_Mask_Oni_Skeleton",
  "Oni Mask_Golden Blob": "Aurorian_Mask_Oni_BlobGold",
  "Oni Mask_Solana Blob": "Aurorian_Mask_Oni_Blob",
  "Bane Mask_2": "Aurorian_Mask_Bane_White",
  "Bane Mask_1": "Aurorian_Mask_Bane_Latino",
  "Bane Mask_0": "Aurorian_Mask_Bane_Black",
  "Bane Mask_Zombie": "Aurorian_Mask_Bane_Zombie",
  "Bane Mask_Skeleton": "Aurorian_Mask_Bane_Skeleton",
  "Bane Mask_Golden Blob": "Aurorian_Mask_Bane_BlobGold",
  "Bane Mask_Solana Blob": "Aurorian_Mask_Bane_Blob",
  "Steampunk Mask_2": "Aurorian_Mask_Steampunk_White",
  "Steampunk Mask_1": "Aurorian_Mask_Steampunk_Latino",
  "Steampunk Mask_0": "Aurorian_Mask_Steampunk_Black",
  "Steampunk Mask_Zombie": "Aurorian_Mask_Steampunk_Zombie",
  "Steampunk Mask_Skeleton": "Aurorian_Mask_Steampunk_Skeleton",
  "Steampunk Mask_Golden Blob": "Aurorian_Mask_Steampunk_BlobGold",
  "Steampunk Mask_Solana Blob": "Aurorian_Mask_Steampunk_Blob",
  // Clothing
  // Eyes
  "No Trait_Skeleton": "Aurorian_Head_Skeleton_BlueEyes_LookAtUs",
  "No Trait_Zombie": "Aurorian_Head_Zombie_GreenEyes_LookAtUs",
  "No Trait_Solana Blob": "Aurorian_Head_Blob_YellowEyes_LookStraight",
  "No Trait_Golden Blob": "Aurorian_Head_BlobGold_LookStraight",
  "Base Eyes_2": "Aurorian_Eyes_LookAtUs_Brown_WhiteSkin", // @missing straight. Note 2: not needed
  "Base Eyes_1": "Aurorian_Eyes_LookAtUs_Brown_LatinoSkin",
  "Base Eyes_0": "Aurorian_Eyes_LookAtUs_Brown_BlackSkin",
  "Cat Green Pupil_2": "Aurorian_EyesCat_LookAtUs_Yellow_WhiteSkin", // dans la version originale sous le même nom il y a 2 regards différents, peut être qu'on peut unifier avec l'upgrade?
  "Cat Green Pupil_1": "Aurorian_EyesCat_LookAtUs_Yellow_LatinoSkin",
  "Cat Green Pupil_0": "Aurorian_EyesCat_LookAtUs_Yellow_BlackSkin",
  Green_2: "Aurorian_Eyes_LookAtUs_Yellow_WhiteSkin", // @Missing for others
  Green_1: "Aurorian_Eyes_LookAtUs_Yellow_LatinoSkin", // @Missing for others
  Green_0: "Aurorian_Eyes_LookAtUs_Yellow_BlackSkin", // @Missing for others
  "Red Eyes_2": "Aurorian_Eyes_LookAtUs_Red_WhiteSkin",
  "Red Eyes_1": "Aurorian_Eyes_LookAtUs_Red_LatinoSkin",
  "Red Eyes_0": "Aurorian_Eyes_LookAtUs_Red_BlackSkin",
  "Red Eyes_2_lookAtUs": "Aurorian_Eyes_LookAtUs_Red_WhiteSkin",
  "Red Eyes_1_lookAtUs": "Aurorian_Eyes_LookAtUs_Red_LatinoSkin",
  "Red Eyes_0_lookAtUs": "Aurorian_Eyes_LookAtUs_Red_BlackSkin",
  "Black Eyes_2": "Aurorian_Eyes_LookAtUs_Blue_WhiteSkin",
  "Black Eyes_1": "Aurorian_Eyes_LookAtUs_Blue_LatinoSkin",
  "Black Eyes_0": "Aurorian_Eyes_LookAtUs_Blue_BlackSkin",
  "Cat Black Pupil_2": "Aurorian_EyesCat_LookAtUs_Brown_WhiteSkin",
  "Cat Black Pupil_1": "Aurorian_EyesCat_LookAtUs_Brown_LatinoSkin",
  "Cat Black Pupil_0": "Aurorian_EyesCat_LookAtUs_Brown_BlackSkin",
  "Cat Eyes Black_2": "Aurorian_EyesCat_LookAtUs_Brown_WhiteSkin",
  "Cat Eyes Black_1": "Aurorian_EyesCat_LookAtUs_Brown_LatinoSkin",
  "Cat Eyes Black_0": "Aurorian_EyesCat_LookAtUs_Brown_BlackSkin",
  "Cat Eyes Red_2": "Aurorian_EyesCat_LookAtUs_Red_WhiteSkin",
  "Cat Eyes Red_1": "Aurorian_EyesCat_LookAtUs_Red_LatinoSkin",
  "Cat Eyes Red_0": "Aurorian_EyesCat_LookAtUs_Red_BlackSkin",
  "Cat Eyes Red_2_lookAtUs": "Aurorian_EyesCat_LookAtUs_Red_WhiteSkin",
  "Cat Eyes Red_1_lookAtUs": "Aurorian_EyesCat_LookAtUs_Red_LatinoSkin",
  "Cat Eyes Red_0_lookAtUs": "Aurorian_EyesCat_LookAtUs_Red_BlackSkin",
  "Green Eyes_2": "Aurorian_EyesCat_LookStraight_Yellow_WhiteSkin",
  "Green Eyes_1": "Aurorian_EyesCat_LookStraight_Yellow_LatinoSkin",
  "Green Eyes_0": "Aurorian_EyesCat_LookStraight_Yellow_BrownSkin",
  "Spring Glasses_2": "Aurorian_Head_White_Glasses-Ressort",
  "Spring Glasses_1": "Aurorian_Head_Latino_Glasses-Ressort",
  "Spring Glasses_0": "Aurorian_Head_Black_Glasses-Ressort",
  "Spring Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Ressort",
  "Spring Glasses_Skeleton": "Aurorian_Head_Skeleton_Ressort",
  "Spring Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Ressort",
  "Spring Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Ressort",
  "Aave Glasses_2": "Aurorian_Head_White_Glasses-Golden",
  "Aave Glasses_1": "Aurorian_Head_Latino_Glasses-Golden",
  "Aave Glasses_0": "Aurorian_Head_Black_Glasses-Golden",
  "Aave Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Golden",
  "Aave Glasses_Skeleton": "Aurorian_Head_Skeleton_Glasses-Golden",
  "Aave Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Golden",
  "Aave Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Golden",
  "Viper Shades_2": "Aurorian_Head_White_Glasses-Sol",
  "Viper Shades_1": "Aurorian_Head_Latino_Glasses-Sol",
  "Viper Shades_0": "Aurorian_Head_Black_Glasses-Sol",
  "Viper Shades_Zombie": "Aurorian_Head_Zombie_Glasses-Sol",
  "Viper Shades_Skeleton": "Aurorian_Head_Skeleton_Glasses-Sol",
  "Viper Shades_Golden Blob": "Aurorian_Head_BlobGold_Glasses-Sol",
  "Viper Shades_Solana Blob": "Aurorian_Head_Blob_Glasses-Sol",
  "Heart Glasses_2": "Aurorian_Head_White_Glasses-Heart",
  "Heart Glasses_1": "Aurorian_Head_Latino_Glasses-Heart",
  "Heart Glasses_0": "Aurorian_Head_Black_Glasses-Heart",
  "Heart Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Heart",
  "Heart Glasses_Skeleton": "Aurorian_Head_Skeleton_Heart",
  "Heart Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Heart",
  "Heart Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Heart",
  "Steampunk Glasses_2": "Aurorian_Head_White_Glasses-Steampunk",
  "Steampunk Glasses_1": "Aurorian_Head_Latino_Glasses-Steampunk",
  "Steampunk Glasses_0": "Aurorian_Head_Black_GreenEyes_Steampunk",
  "Steampunk Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Steampunk",
  "Steampunk Glasses_Skeleton": "Aurorian_Head_Skeleton_Steampunk",
  "Steampunk Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Steampunk",
  "Steampunk Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Steampunk",
  "Aurory Glasses_2": "Aurorian_Head_White_Glasses-Aurory",
  "Aurory Glasses_1": "Aurorian_Head_Latino_Glasses-Aurory",
  "Aurory Glasses_0": "Aurorian_Head_Black_Glasses-Aurory",
  "Aurory Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Aurory",
  "Aurory Glasses_Skeleton": "Aurorian_Head_Skeleton_Aurory",
  "Aurory Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Aurory",
  "Aurory Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Aurory",
  "Blue Skull Glasses_2": "Aurorian_Head_White_Glasses-Skull",
  "Blue Skull Glasses_1": "Aurorian_Head_Latino_Glasses-Skull",
  "Blue Skull Glasses_0": "Aurorian_Head_Black_Glasses-Skull",
  "Blue Skull Glasses_Zombie": "Aurorian_Head_Zombie_Glasses-Skull",
  "Blue Skull Glasses_Skeleton": "Aurorian_Head_Skeleton_Skull",
  "Blue Skull Glasses_Golden Blob": "Aurorian_Head_BlobGold_Glasses_Skull",
  "Blue Skull Glasses_Solana Blob": "Aurorian_Head_Blob_Glasses-Skull",
  // Hair
  "2_No Trait_1": "Aurorian_Hairs_Chauve_White",
  "2_No Trait_2": "Aurorian_Hairs_Chauve02_White",
  "1_No Trait_1": "Aurorian_Hairs_Chauve_Latino",
  "1_No Trait_2": "Aurorian_Hairs_Chauve02_Latino",
  "0_No Trait_1": "Aurorian_Hairs_Chauve_Black",
  "0_No Trait_2": "Aurorian_Hairs_Chauve02_Black",
  "Blob Hair": "Aurorian_Hairs_SamBlob",
  "Blob Hair_Blob": "Aurorian_Hairs_SamBlob_Blob",
  "Blob Hair_Zombie": "Aurorian_Hairs_SamBlob_Zombie",
  "Blob Hair_Gold": "Aurorian_Hairs_SamBlob_BlobGold",
  Curly: "Aurorian_Hairs_Curved",
  Curly_Zombie: "Aurorian_Hairs_Curved_Zombie",
  Curly_Skeleton: "Aurorian_Hairs_Curved_Skeleton",
  Curly_Gold: "Aurorian_Hairs_Curved_BlobGold",
  Curly_Blob: "Aurorian_Hairs_Curved_Blob",
  "Clementine Hair": "Aurorian_Hairs_Clementine",
  "Clementine Hair_Zombie": "Aurorian_Hairs_Clementine_Zombie",
  "Clementine Hair_Skeleton": "Aurorian_Hairs_Clementine_Skeleton",
  "Clementine Hair_Gold": "Aurorian_Hairs_Clementine_BlobGold",
  "Clementine Hair_Blob": "Aurorian_Hairs_Clementine_Blob",
  "Purple Dreadlocks": "Aurorian_Hairs_Hat_Dreads",
  "Purple Dreadlocks_Zombie": "Aurorian_Hairs_Hat_Dreads_Zombie",
  "Purple Dreadlocks_Skeleton": "Aurorian_Hairs_Hat_Dreads_Skeleton",
  "Purple Dreadlocks_Gold": "Aurorian_Hairs_Hat_Dreads_BlobGold",
  "Purple Dreadlocks_Blob": "Aurorian_Hairs_Hat_Dreads_Blob",
  Pigtails: "Aurorian_Hairs_Woman_Couette",
  Pigtails_Zombie: "Aurorian_Hairs_Woman_Couette_Zombie",
  Pigtails_Skeleton: "Aurorian_Hairs_Woman_Couette_Skeleton",
  Pigtails_Gold: "Aurorian_Hairs_Woman_Couette_BlobGold",
  Pigtails_Blob: "Aurorian_Hairs_Woman_Couette_Blob",
  "Green Hair": "Aurorian_Hairs_Woman_Crotte",
  "Green Hair_Zombie": "Aurorian_Hairs_Woman_Crotte_Zombie",
  "Green Hair_Skeleton": "Aurorian_Hairs_Woman_Crotte_Skeleton",
  "Green Hair_Gold": "Aurorian_Hairs_Woman_Crotte_BlobGold",
  "Green Hair_Blob": "Aurorian_Hairs_Woman_Crotte_Blob",
  "Brown Dreadlocks": "Aurorian_Hairs_AttachedDreads",
  "Brown Dreadlocks_Zombie": "Aurorian_Hairs_AttachedDreads_Zombie",
  "Brown Dreadlocks_Skeleton": "Aurorian_Hairs_AttachedDreads_Skeleton",
  "Brown Dreadlocks_Gold": "Aurorian_Hairs_AttachedDreads_BlobGold",
  "Brown Dreadlocks_Blob": "Aurorian_Hairs_AttachedDreads_Blob",
  "White Hair": "Aurorian_Hairs_Sam",
  "White Hair_Zombie": "Aurorian_Hairs_Sam_Zombie",
  "White Hair_Skeleton": "Aurorian_Hairs_Sam_Skelet",
  "White Hair_Gold": "Aurorian_Hairs_Sam_BlobGold",
  "White Hair_Blob": "Aurorian_Hairs_Sam_Blob",
  Undercut: "Aurorian_Hairs_Hat_Houpette_01",
  Undercut_Zombie: "Aurorian_Hairs_Hat_Houpette_Zombie",
  Undercut_Skeleton: "Aurorian_Hairs_Hat_Houpette_Skelet",
  Undercut_Gold: "Aurorian_Hairs_Hat_Houpette_01_BlobGold",
  Undercut_Blob: "Aurorian_Hairs_Hat_Houpette_Blob",
  "Blond Hair Attached": "Aurorian_Hairs_Woman_BlondAttached",
  "Blond Hair Attached_Zombie": "Aurorian_Hairs_Woman_BlondAttached_Zombie",
  "Blond Hair Attached_Skeleton": "Aurorian_Hairs_Woman_BlondAttached_Skelet",
  "Blond Hair Attached_Gold": "Aurorian_Hairs_Woman_BlondAttached_BlobGold",
  "Blond Hair Attached_Blob": "Aurorian_Hairs_Woman_BlondAttached_Blob",
  "Long Blob Hair": "Aurorian_Hairs_LongHairsBlob",
  "Long Blob Hair_Zombie": "Aurorian_Hairs_LongHairsBlob_Zombie",
  "Long Blob Hair_Skeleton": "Aurorian_Hairs_LongHairsBlob_Skeleton",
  "Long Blob Hair_Gold": "Aurorian_Hairs_LongHairsBlob_BlobGold",
  "Long Blob Hair_Blob": "Aurorian_Hairs_LongHairsBlob_Blob",
  Shaved_2: "Aurorian_Hairs_Hat_Shaved_White",
  Shaved_1: "Aurorian_Hairs_Hat_Shaved_Latino",
  Shaved_0: "Aurorian_Hairs_Hat_Shaved_Black",
  Shaved_Zombie: "Aurorian_Hairs_Hat_Shaved_Zombie",
  Shaved_Skeleton: "Aurorian_Hairs_Hat_Shaved_Skeleton",
  Shaved_Gold: "Aurorian_Hairs_Hat_Shaved_BlobGold",
  Shaved_Blob: "Aurorian_Hairs_Hat_Shaved_Blob",
  "Combed Haircut": "Aurorian_Hairs_Combed",
  "Combed Haircut_Zombie": "Aurorian_Hairs_Combed_Zombie",
  "Combed Haircut_Skeleton": "Aurorian_Hairs_Combed_Squeleton",
  "Combed Haircut_Gold": "Aurorian_Hairs_Combed_BlobGold",
  "Combed Haircut_Blob": "Aurorian_Hairs_Combed_Blob",
  "Zero Two Hair": "Aurorian_Hairs_ReZero",
  "Zero Two Hair_Zombie": "Aurorian_Hairs_ReZero_Zombie",
  "Zero Two Hair_Skeleton": "Aurorian_Hairs_ReZero_Skelet",
  "Zero Two Hair_Gold": "Aurorian_Hairs_ReZero_BlobGold",
  "Zero Two Hair_Blob": "Aurorian_Hairs_ReZero_Blob",
  Playmobil: "Aurorian_Hairs_Hat_Playmobil",
  Playmobil_Zombie: "Aurorian_Hairs_Hat_Playmobil_Zombie",
  Playmobil_Skeleton: "Aurorian_Hairs_Hat_Playmobil_Skelet",
  Playmobil_Gold: "Aurorian_Hairs_Hat_Playmobil_BlobGold",
  Playmobil_Blob: "Aurorian_Hairs_Hat_Playmobil_Blob",
  // Hat
  "Dragon Hat_No Trait": "Aurorian_Hat_Chinese_ShavedHairs",
  "Dragon Hat_No Trait_Blob": "Aurorian_Hat_Chinese_ShavedHairs_Blob",
  "Dragon Hat_No Trait_Zombie": "Aurorian_Hat_Chinese_ShavedHairs_Zombie",
  "Dragon Hat_Clementine Hair": "Aurorian_Hat_Chinese_ClementineHairs",
  "Dragon Hat_Clementine Hair_Gold":
    "Aurorian_Hat_Chinese_ClementineHairs_BlobGold",
  "Dragon Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Chinese_ClementineHairs_Blob",
  "Dragon Hat_Clementine Hair_Zombie":
    "Aurorian_Hat_Chinese_ClementineHairs_Zombie",
  "Dragon Hat_Combed Haircut": "Aurorian_Hat_Chinese_CombedHairs",
  "Dragon Hat_Combed Haircut_Blob": "Aurorian_Hat_Chinese_CombedHairs_Blob",
  "Dragon Hat_Combed Haircut_Zombie": "Aurorian_Hat_Chinese_CombedHairs_Zombie",
  "Dragon Hat_Curly": "Aurorian_Hat_Chinese_CurvedHairs",
  "Dragon Hat_Curly_Blob": "Aurorian_Hat_Chinese_Curved_Blob",
  "Dragon Hat_Curly_Zombie": "Aurorian_Hat_Chinese_CurvedHairs_Zombie",
  "Dragon Hat_Playmobil": "Aurorian_Hat_Chinese_PlaymobileHairs",
  "Dragon Hat_Playmobil_Blob": "Aurorian_Hat_Chinese_PlaymobileHairs_Blob",
  "Dragon Hat_Playmobil_Zombie": "Aurorian_Hat_Chinese_PlaymobileHairs_Zombie",
  "Crazy Horse Hat_No Trait": "Aurorian_Hat_Horse_Shaved",
  "Crazy Horse Hat_No Trait_Blob": "Aurorian_Hat_Horse_Shaved_Blob",
  "Crazy Horse Hat_Clementine Hair": "Aurorian_Hat_Horse_Clementine",
  "Crazy Horse Hat_Combed Haircut": "Aurorian_Hat_Horse_Combed",
  "Crazy Horse Hat_Curly": "Aurorian_Hat_Horse_Curved",
  "Crazy Horse Hat_Playmobil": "Aurorian_Hat_Horse_Playmobile",
  "Gavroche Hat_No Trait": "Aurorian_Hat_Gapette_Shaved",
  "Gavroche Hat_No Trait_Blob": "Aurorian_Hat_Gapette_Shaved_Blob",
  "Gavroche Hat_No Trait_Zombie": "Aurorian_Hat_Gapette_Shaved_Zombie",
  "Gavroche Hat_Clementine Hair": "Aurorian_Hat_Gapette_Clementine",
  "Gavroche Hat_Clementine Hair_Blob": "Aurorian_Hat_Gapette_Clementine_Blob",
  "Gavroche Hat_Combed Haircut": "Aurorian_Hat_Gapette_Combed",
  "Gavroche Hat_Combed Haircut_Blob": "Aurorian_Hat_Gapette_Combed_Blob",
  "Gavroche Hat_Curly": "Aurorian_Hat_Gapette_Curved",
  "Gavroche Hat_Curly_Blob": "Aurorian_Hat_Gapette_Curved_Blob",
  "Gavroche Hat_Playmobil": "Aurorian_Hat_Gapette_Playmobile",
  "Gavroche Hat_Playmobil_Blob": "Aurorian_Hat_Gapette_Playmobile_Blob",
  "Gavroche Hat_Playmobil_Zombie": "Aurorian_Hat_Gapette_Playmobile_Zombie",
  "Sam Hat_No Trait": "Aurorian_Hat_Sam_ShavedHairs",
  "Sam Hat_No Trait_Gold": "Aurorian_Hat_Sam_ShavedHairs_BlobGold",
  "Sam Hat_No Trait_Blob": "Aurorian_Hat_Sam_ShavedHairs_Blob",
  "Sam Hat_No Trait_Zombie": "Aurorian_Hat_Sam_ShavedHairs_Zombie",
  "Sam Hat_Clementine Hair": "Aurorian_Hat_Sam_Clementine-CouetteHairs",
  "Sam Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Sam_Clementine-CouetteHairs_Blob",
  "Sam Hat_Combed Haircut": "Aurorian_Hat_Sam_Combed",
  "Sam Hat_Combed Haircut_Blob": "Aurorian_Hat_Sam_Combed_Blob",
  "Sam Hat_Combed Haircut_Gold": "Aurorian_Hat_Sam_Combed_BlobGold",
  "Sam Hat_Curly": "Aurorian_Hat_Sam_Curved-CouetteHairs",
  "Sam Hat_Playmobil": "Aurorian_Hat_Sam_Playmobile",
  "Dinobit Hat_No Trait": "Aurorian_Hat_Bitebit_Shaved",
  "Dinobit Hat_No Trait_Gold": "Aurorian_Hat_Bitebit_Shaved_BlobGold",
  "Dinobit Hat_No Trait_Blob": "Aurorian_Hat_Bitebit_Shaved_Blob",
  "Dinobit Hat_No Trait_Zombie": "Aurorian_Hat_Bitebit_Shaved_Zombie",
  "Dinobit Hat_Clementine Hair": "Aurorian_Hat_Bitebit_ClementineHairs",
  "Dinobit Hat_Combed Haircut": "Aurorian_Hat_Bitebit_CombedHairs",
  "Dinobit Hat_Curly": "Aurorian_Hat_Bitebit_CurvedHairs",
  "Dinobit Hat_Playmobil": "Aurorian_Hat_Bitebit_PlaymobileHairs",
  "Dinobit Hat_Playmobil_Gold": "Aurorian_Hat_Bitebit_PlaymobileHairs_BlobGold",
  "Dinobit Hat_Playmobil_Blob": "Aurorian_Hat_Bitebit_PlaymobileHairs_Blob",
  "Bitebit Hat_No Trait": "Aurorian_Hat_Dragoon_Bitebit_ShavedHairs",
  "Bitebit Hat_No Trait_Blob": "Aurorian_Hat_Dragoon_Bitebit_ShavedHairs_Blob",
  "Bitebit Hat_Clementine Hair": "Aurorian_Hat_Dragoon_Bitebit_ClementineHairs",
  "Bitebit Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Dragoon_Bitebit_ClementineHairs_Blob",
  "Bitebit Hat_Combed Haircut": "Aurorian_Hat_Dragoon_Bitebit_CombedHairs",
  "Bitebit Hat_Combed Haircut_Blob":
    "Aurorian_Hat_Dragoon_Bitebit_CombedHairs_Blob",
  "Bitebit Hat_Curly": "Aurorian_Hat_Dragoon_Bitebit_CurvedHairs",
  "Bitebit Hat_Playmobil": "Aurorian_Hat_Dragoon_Bitebit_PlaymobileHairs",
  "Axobubble Hat_No Trait": "Aurorian_Hat_Axo_ShavedHairs",
  "Axobubble Hat_No Trait_Blob": "Aurorian_Hat_Axo_ShavedHairs_Blob",
  "Axobubble Hat_Clementine Hair": "Aurorian_Hat_Axo_ClementineHairs",
  "Axobubble Hat_Combed Haircut": "Aurorian_Hat_Axo_CombedHairs",
  "Axobubble Hat_Combed Haircut_Blob": "Aurorian_Hat_Axo_CombedHairs_Blob",
  "Axobubble Hat_Curly": "Aurorian_Hat_Axo_CurvedHairs",
  "Axobubble Hat_Curly_Gold": "Aurorian_Hat_Axo_CurvedHairs_BlobGold",
  "Axobubble Hat_Curly_Blob": "Aurorian_Hat_Axo_CurvedHairs_Blob",
  "Axobubble Hat_Playmobil": "Aurorian_Hat_Axo_PlaymobileHairs",
  "Axobubble Hat_Playmobil_Blob": "Aurorian_Hat_Axo_PlaymobileHairs_Blob",
  "Beret Hat_No Trait": "Aurorian_Hat_Beret_ShavedHairs",
  "Beret Hat_No Trait_Zombie": "Aurorian_Hat_Beret_ShavedHairs_Zombie",
  "Beret Hat_No Trait_Gold": "Aurorian_Hat_Beret_ShavedHairs_BlobGold",
  "Beret Hat_No Trait_Blob": "Aurorian_Hat_Beret_ShavedHairs_Blob",
  "Beret Hat_Clementine Hair": "Aurorian_Hat_Beret_ClementineHairs",
  "Beret Hat_Clementine Hair_Blob": "Aurorian_Hat_Beret_ClementineHairs_Blob",
  "Beret Hat_Clementine Hair_Zombie":
    "Aurorian_Hat_Beret_ClementineHairs_Zombie",
  "Beret Hat_Combed Haircut": "Aurorian_Hat_Beret_CombedHairs",
  "Beret Hat_Combed Haircut_Blob": "Aurorian_Hat_Beret_CombedHairs_Blob",
  "Beret Hat_Combed Haircut_Zombie": "Aurorian_Hat_Beret_CombedHairs_Zombie",
  "Beret Hat_Curly": "Aurorian_Hat_Beret_CurvedHairs",
  "Beret Hat_Curly_Blob": "Aurorian_Hat_Beret_CurvedHairs_Blob",
  "Beret Hat_Curly_Zombie": "Aurorian_Hat_Beret_CurvedHairs_Zombie",
  "Beret Hat_Playmobil": "Aurorian_Hat_Beret_PlaymobileHairs",
  "Beret Hat_Playmobil_Blob": "Aurorian_Hat_Beret_PlaymobileHairs_Blob",
  "Beret Hat_Playmobil_Zombie": "Aurorian_Hat_Beret_PlaymobileHairs_Zombie",
  "Phantom Cap_No Trait": "Aurorian_Hat_Backpack_Shaved",
  "Phantom Cap_No Trait_Gold": "Aurorian_Hat_Backpack_Shaved_BlobGold",
  "Phantom Cap_No Trait_Blob": "Aurorian_Hat_Backpack_Shaved_Blob",
  "Phantom Cap_No Trait_Zombie": "Aurorian_Hat_Backpack_Shaved_Zombie",
  "Phantom Cap_No Trait_Skeleton": "Aurorian_Hat_Backpack_Shaved_Skeleton",
  "Phantom Cap_Clementine Hair": "Aurorian_Hat_Backpack_Clementine",
  "Phantom Cap_Clementine Hair_Blob": "Aurorian_Hat_Backpack_Clementine_Blob",
  "Phantom Cap_Clementine Hair_Zombie":
    "Aurorian_Hat_Backpack_Clementine_Zombie",
  "Phantom Cap_Combed Haircut": "Aurorian_Hat_Backpack_Combed",
  "Phantom Cap_Combed Haircut_Blob": "Aurorian_Hat_Backpack_Combed_Blob",
  "Phantom Cap_Combed Haircut_Zombie": "Aurorian_Hat_Backpack_Combed_Zombie",
  "Phantom Cap_Curly": "Aurorian_Hat_Backpack_Curved",
  "Phantom Cap_Curly_Blob": "Aurorian_Hat_Backpack_Curved_Blob",
  "Phantom Cap_Curly_Zombie": "Aurorian_Hat_Backpack_Curved_Zombie",
  "Phantom Cap_Playmobil": "Aurorian_Hat_Backpack_Playmobile",
  "Phantom Cap_Playmobil_Gold": "Aurorian_Hat_Backpack_Playmobile_BlobGold",
  "Phantom Cap_Playmobil_Blob": "Aurorian_Hat_Backpack_Playmobile_Blob",
  "Phantom Cap_Playmobil_Zombie": "Aurorian_Hat_Backpack_Playmobile_Zombie",
  "Jotaro Cap_No Trait": "Aurorian_Hat_Star_Shaved",
  "Jotaro Cap_No Trait_Blob": "Aurorian_Hat_Star_Shaved_Blob",
  "Jotaro Cap_Clementine Hair": "Aurorian_Hat_Star_Clementine",
  "Jotaro Cap_Combed Haircut": "Aurorian_Hat_Star_Combed",
  "Jotaro Cap_Curly": "Aurorian_Hat_Star_Curved",
  "Jotaro Cap_Curly_Blob": "Aurorian_Hat_Star_Curved_Blob",
  "Jotaro Cap_Playmobil": "Aurorian_Hat_Star_Playmobile",
  "Crown_No Trait": "Aurorian_Hat_Crown_Shaved",
  "Crown_No Trait_Blob": "Aurorian_Hat_Crown_Shaved_Blob",
  "Crown_No Trait_Zombie": "Aurorian_Hat_Crown_Shaved_Zombie",
  "Crown_Clementine Hair": "Aurorian_Hat_Crown_Clementine",
  "Crown_Clementine Hair_Blob": "Aurorian_Hat_Crown_Clementine_Blob",
  "Crown_Clementine Hair_Zombie": "Aurorian_Hat_Crown_Clementine_Blob",
  "Crown_Combed Haircut": "Aurorian_Hat_Crown_Combed",
  "Crown_Combed Haircut_Blob": "Aurorian_Hat_Crown_Combed_Blob",
  "Crown_Combed Haircut_Zombie": "Aurorian_Hat_Crown_Combed_Zombie",
  Crown_Curly: "Aurorian_Hat_Crown_Curved",
  Crown_Curly_Blob: "Aurorian_Hat_Crown_Curved_Blob",
  Crown_Curly_Zombie: "Aurorian_Hat_Crown_Curved_Zombie",
  Crown_Playmobil: "Aurorian_Hat_Crown_Playmobile",
  Crown_Playmobil_Blob: "Aurorian_Hat_Crown_Playmobile_Blob",
  Crown_Playmobil_Zombie: "Aurorian_Hat_Crown_Playmobile_Zombie",
  "Doughnut Hat_No Trait": "Aurorian_Hat_Doghnut_Shaved",
  "Doughnut Hat_No Trait_Gold": "Aurorian_Hat_Doghnut_Shaved_BlobGold",
  "Doughnut Hat_No Trait_Blob": "Aurorian_Hat_Doghnut_Shaved_Blob",
  "Doughnut Hat_No Trait_Skeleton": "Aurorian_Hat_Doghnut_Shaved_Skeleton",
  "Doughnut Hat_Clementine Hair": "Aurorian_Hat_Doghnut_Clementine",
  "Doughnut Hat_Clementine Hair_Blob": "Aurorian_Hat_Doghnut_Clementine_Blob",
  "Doughnut Hat_Clementine Hair_Zombie":
    "Aurorian_Hat_Doghnut_Clementine_Zombie",
  "Doughnut Hat_Combed Haircut": "Aurorian_Hat_Doghnut_Combed",
  "Doughnut Hat_Combed Haircut_Blob": "Aurorian_Hat_Doghnut_Combed_Blob",
  "Doughnut Hat_Curly": "Aurorian_Hat_Doghnut_Curved",
  "Doughnut Hat_Curly_Blob": "Aurorian_Hat_Doghnut_Curved_Blob",
  "Doughnut Hat_Curly_Zombie": "Aurorian_Hat_Doghnut_Curved_Zombie",
  "Doughnut Hat_Playmobil": "Aurorian_Hat_Doghnut_Playmobile",
  "Doughnut Hat_Playmobil_Blob": "Aurorian_Hat_Doghnut_Playmobile_Blob",
  "Beetlefox Hat_No Trait": "Aurorian_Hat_Beeblock_ShavedHairs",
  "Beetlefox Hat_No Trait_Gold": "Aurorian_Hat_Beeblock_ShavedHairs_BlobGold",
  "Beetlefox Hat_No Trait_Blob": "Aurorian_Hat_Beeblock_ShavedHairs_Blob",
  "Beetlefox Hat_Clementine Hair": "Aurorian_Hat_Beeblock_ClementineHairs",
  "Beetlefox Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Beeblock_ClementineHairs_Blob",
  "Beetlefox Hat_Combed Haircut": "Aurorian_Hat_Beeblock_CombedHairs",
  "Beetlefox Hat_Combed Haircut_Blob": "Aurorian_Hat_Beeblock_CombedHairs_Blob",
  "Beetlefox Hat_Curly": "Aurorian_Hat_Beeblock_CurvedHairs",
  "Beetlefox Hat_Curly_Blob": "Aurorian_Hat_Beeblock_CurvedHairs_Blob",
  "Beetlefox Hat_Playmobil": "Aurorian_Hat_Beeblock_Playmobile",
  "Beetlefox Hat_Playmobil_Blob": "Aurorian_Hat_Beeblock_PlaymobileHairs_Blob",
  "Witch Hat_No Trait": "Aurorian_Hat_Magic_ShavedHairs",
  "Witch Hat_No Trait_Zombie": "Aurorian_Hat_Magic_ShavedHairs_Zombie",
  "Witch Hat_No Trait_Blob": "Aurorian_Hat_Magic_ShavedHairs_Blob",
  "Witch Hat_No Trait_Gold": "Aurorian_Hat_Magic_ShavedHairs_Gold",
  "Witch Hat_Clementine Hair": "Aurorian_Hat_Magic_ClementineHairs",
  "Witch Hat_Clementine Hair_Zombie":
    "Aurorian_Hat_Magic_ClementineHairs_Zombie",
  "Witch Hat_Clementine Hair_Blob": "Aurorian_Hat_Magic_ClementineHairs_Blob",
  "Witch Hat_Combed Haircut": "Aurorian_Hat_Magic_CombedHairs",
  "Witch Hat_Combed Haircut_Blob": "Aurorian_Hat_Magic_CombedHairs_Blob",
  "Witch Hat_Combed Haircut_Zombie": "Aurorian_Hat_Magic_CombedHairs_Zombie",
  "Witch Hat_Curly": "Aurorian_Hat_Magic_CurvedHairs",
  "Witch Hat_Curly_Zombie": "Aurorian_Hat_Magic_CurvedHairs_Zombie",
  "Witch Hat_Playmobil": "Aurorian_Hat_Magic_PlaymobileHairs",
  "Witch Hat_Playmobil_Blob": "Aurorian_Hat_Magic_PlaymobileHairs_Blob",
  "Witch Hat_Playmobil_Zombie": "Aurorian_Hat_Magic_PlaymobileHairs_Zombie",
  "Big Crown_No Trait": "Aurorian_Hat_CrownBig_Shaved",
  "Big Crown_No Trait_Blob": "Aurorian_Hat_CrownBig_Shaved_Blob",
  "Big Crown_No Trait_Zombie": "Aurorian_Hat_CrownBig_Shaved_Zombie",
  "Big Crown_Clementine Hair": "Aurorian_Hat_CrownBig_Clementine",
  "Big Crown_Clementine Hair_Zombie": "Aurorian_Hat_CrownBig_Clementine_Zombie",
  "Big Crown_Clementine Hair_Blob": "Aurorian_Hat_CrownBig_Clementine_Blob",
  "Big Crown_Combed Haircut": "Aurorian_Hat_CrownBig_Combed",
  "Big Crown_Combed Haircut_Blob": "Aurorian_Hat_CrownBig_Combed_Blob",
  "Big Crown_Combed Haircut_Zombie": "Aurorian_Hat_CrownBig_Combed_Zombie",
  "Big Crown_Curly": "Aurorian_Hat_CrownBig_Curved",
  "Big Crown_Curly_Zombie": "Aurorian_Hat_CrownBig_Curved_Zombie",
  "Big Crown_Playmobil": "Aurorian_Hat_CrownBig_Playmobile",
  "Big Crown_Playmobil_Blob": "Aurorian_Hat_CrownBig_Playmobile_Blob",
  "Big Crown_Playmobil_Zombie": "Aurorian_Hat_CrownBig_Playmobile_Zombie",
  "Cute headphone_No Trait": "Aurorian_Hat_Dragoon_CatHeadphone_ShavedHairs",
  "Cute headphone_No Trait_Gold":
    "Aurorian_Hat_Dragoon_CatHeadphone_ShavedHairs_BlobGold",
  "Cute headphone_No Trait_Blob":
    "Aurorian_Hat_Dragoon_CatHeadphone_ShavedHairs_Blob",
  "Cute headphone_No Trait_Zombie":
    "Aurorian_Hat_Dragoon_CatHeadphone_ShavedHairs_Zombie",
  "Cute headphone_Clementine Hair":
    "Aurorian_Hat_Dragoon_CatHeadphone_ClementineHairs",
  "Cute headphone_Clementine Hair_Blob":
    "Aurorian_Hat_Dragoon_CatHeadphone_ClementineHairs_Blob",
  "Cute headphone_Combed Haircut":
    "Aurorian_Hat_Dragoon_CatHeadphone_CombedHairs",
  "Cute headphone_Combed Haircut_Blob":
    "Aurorian_Hat_Dragoon_CatHeadphone_CombedHairs_Blob",
  "Cute headphone_Combed Haircut_Zombie":
    "Aurorian_Hat_Dragoon_CatHeadphone_CombedHairs_Zombie",
  "Cute headphone_Curly": "Aurorian_Hat_Dragoon_CatHeadphone_CurvedHairs",
  "Cute headphone_Curly_Blob":
    "Aurorian_Hat_Dragoon_CatHeadphone_CurvedHairs_Blob",
  "Cute headphone_Curly_Zombie":
    "Aurorian_Hat_Dragoon_CatHeadphone_CurvedHairs_Zombie",
  "Cute headphone_Playmobil":
    "Aurorian_Hat_Dragoon_CatHeadphone_PlaymobileHairs",
  "Cute headphone_Playmobil_Blob":
    "Aurorian_Hat_Dragoon_CatHeadphone_PlaymobileHairs_Blob",
  "Cute headphone_Playmobil_Zombie":
    "Aurorian_Hat_Dragoon_CatHeadphone_PlaymobileHairs_Zombie",
  "Twitter Hat_No Trait": "Aurorian_Hat_Twitter_ShavedHairs",
  "Twitter Hat_No Trait_Blob": "Aurorian_Hat_Twitter_ShavedHairs_Blob",
  "Twitter Hat_No Trait_Zombie": "Aurorian_Hat_Twitter_ShavedHairs_Zombie",
  "Twitter Hat_Clementine Hair": "Aurorian_Hat_Twitter_ClementineHairs",
  "Twitter Hat_Clementine Hair_Gold":
    "Aurorian_Hat_Twitter_ClementineHairs_BlobGold",
  "Twitter Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Twitter_ClementineHairs_Blob",
  "Twitter Hat_Combed Haircut": "Aurorian_Hat_Twitter_CombedHairs",
  "Twitter Hat_Combed Haircut_Blob": "Aurorian_Hat_Twitter_CombedHairs_Blob",
  "Twitter Hat_Curly": "Aurorian_Hat_Twitter_CurvedHairs",
  "Twitter Hat_Curly_Blob": "Aurorian_Hat_Twitter_CurvedHairs_Blob",
  "Twitter Hat_Playmobil": "Aurorian_Hat_Twitter_PlaymobileHairs",
  "Twitter Hat_Playmobil_Blob": "Aurorian_Hat_Twitter_PlaymobileHairs_Blob",
  "Moogle_No Trait": "Aurorian_Hat_Mog_ShavedHairs",
  "Moogle_No Trait_Zombie": "Aurorian_Hat_Mog_ShavedHairs_Zombie",
  "Moogle_No Trait_Blob": "Aurorian_Hat_Mog_ShavedHairs_Blob",
  "Moogle_Clementine Hair": "Aurorian_Hat_Mog_ClementineHairs",
  "Moogle_Combed Haircut": "Aurorian_Hat_Mog_CombedHairs",
  "Moogle_Combed Haircut_Blob": "Aurorian_Hat_Mog_CombedHairs_Blob",
  Moogle_Curly: "Aurorian_Hat_Mog_CurvedHairs",
  Moogle_Curly_Blob: "Aurorian_Hat_Mog_CurvedHairs_Blob",
  Moogle_Playmobil: "Aurorian_Hat_Mog_PlaymobileHairs",
  "Luffy Hat_No Trait": "Aurorian_Hat_Luffy_ShavedHairs",
  "Luffy Hat_No Trait_Blob": "Aurorian_Hat_Luffy_ShavedHairs_Blob",
  "Luffy Hat_No Trait_Skeleton": "Aurorian_Hat_Luffy_ShavedHairs_Skeleton",
  "Luffy Hat_Clementine Hair": "Aurorian_Hat_Luffy_ClementineHairs",
  "Luffy Hat_Combed Haircut": "Aurorian_Hat_Luffy_CombedHairs",
  "Luffy Hat_Curly": "Aurorian_Hat_Luffy_CurvedHairs",
  "Luffy Hat_Playmobil": "Aurorian_Hat_Luffy_PlaymobileHairs",
  "Luffy Hat_Playmobil_Zombie": "Aurorian_Hat_Luffy_PlaymobileHairs_Zombie",
  "Plague Hat_No Trait": "Aurorian_Hat_Riche_ShavedHairs",
  "Plague Hat_No Trait_Blob": "Aurorian_Hat_Riche_ShavedHairs_Blob",
  "Plague Hat_No Trait_Zombie": "Aurorian_Hat_Riche_ShavedHairs_Zombie",
  "Plague Hat_No Trait_Skeleton": "Aurorian_Hat_Riche_ShavedHairs_Skeleton",
  "Plague Hat_Clementine Hair": "Aurorian_Hat_Riche_ClementineHairs",
  "Plague Hat_Clementine Hair_Blob": "Aurorian_Hat_Riche_ClementineHairs_Blob",
  "Plague Hat_Combed Haircut": "Aurorian_Hat_Riche_CombedHairs",
  "Plague Hat_Combed Haircut_Blob": "Aurorian_Hat_Riche_CombedHairs_Blob",
  "Plague Hat_Curly": "Aurorian_Hat_Riche_CurvedHairs",
  "Plague Hat_Curly_Blob": "Aurorian_Hat_Riche_CurvedHairs_Blob",
  "Plague Hat_Playmobil": "Aurorian_Hat_Riche_PlaymobileHairs",
  "Plague Hat_Playmobil_Blob": "Aurorian_Hat_Riche_PlaymobileHairs_Blob",
  "Unika Hat_No Trait": "Aurorian_Hat_Unika_Shaved",
  "Unika Hat_Clementine Hair": "Aurorian_Hat_Unika_ClementineHairs",
  "Unika Hat_Combed Haircut": "Aurorian_Hat_Unika_CombedHairs",
  "Unika Hat_Curly": "Aurorian_Hat_Unika_CurvedHairs",
  "Unika Hat_Playmobil": "Aurorian_Hat_Unika_PlaymobileHairs",
  "Helios Hat_No Trait": "Aurorian_Hat_Helios_Shaved",
  "Helios Hat_Clementine Hair": "Aurorian_Hat_Helios_ClementineHairs",
  "Helios Hat_Combed Haircut": "Aurorian_Hat_Helios_CombedHairs",
  "Helios Hat_Curly": "Aurorian_Hat_Helios_CurvedHairs",
  "Helios Hat_Playmobil": "Aurorian_Hat_Helios_PlaymobileHairs",
  "Helios Hat_Playmobil_Blob": "Aurorian_Hat_Helios_PlaymobileHairs_Blob",
  "Raccoon Hat_No Trait": "Aurorian_Hat_Racoon_Shaved",
  "Raccoon Hat_No Trait_Blob": "Aurorian_Hat_Racoon_Shaved_Blob",
  "Raccoon Hat_No Trait_Zombie": "Aurorian_Hat_Racoon_Shaved_Zombie",
  "Raccoon Hat_No Trait_Skeleton": "Aurorian_Hat_Racoon_Shaved_Skeleton",
  "Raccoon Hat_No Trait_Gold": "Aurorian_Hat_Racoon_Shaved_BlobGold",
  "Raccoon Hat_Clementine Hair": "Aurorian_Hat_Racoon_Clementine",
  "Raccoon Hat_Clementine Hair_Gold": "Aurorian_Hat_Racoon_Clementine_BlobGold",
  "Raccoon Hat_Clementine Hair_Blob": "Aurorian_Hat_Racoon_Clementine_Blob",
  "Raccoon Hat_Clementine Hair_Zombie": "Aurorian_Hat_Racoon_Clementine_Zombie",
  "Raccoon Hat_Combed Haircut": "Aurorian_Hat_Racoon_Combed",
  "Raccoon Hat_Combed Haircut_Blob": "Aurorian_Hat_Racoon_Combed_Blob",
  "Raccoon Hat_Combed Haircut_Zombie": "Aurorian_Hat_Racoon_Combed_Zombie",
  "Raccoon Hat_Curly": "Aurorian_Hat_Racoon_Curved",
  "Raccoon Hat_Curly_Blob": "Aurorian_Hat_Racoon_Curved_Blob",
  "Raccoon Hat_Playmobil": "Aurorian_Hat_Racoon_Playmobile",
  "Raccoon Hat_Playmobil_Blob": "Aurorian_Hat_Racoon_Playmobile_Blob",
  "Raccoon Hat_Playmobil_Zombie": "Aurorian_Hat_Racoon_Playmobile_Zombie",
  "Feather Hat_No Trait": "Aurorian_Hat_Featherr_Shaved",
  "Feather Hat_No Trait_Blob": "Aurorian_Hat_Featherr_Shaved_Blob",
  "Feather Hat_No Trait_Zombie": "Aurorian_Hat_Featherr_Shaved_Zombie",
  "Feather Hat_No Trait_Skeleton": "Aurorian_Hat_Featherr_Shaved_Skeleton",
  "Feather Hat_Clementine Hair": "Aurorian_Hat_Featherr_Clementine",
  "Feather Hat_Clementine Hair_Blob": "Aurorian_Hat_Featherr_Clementine_Blob",
  "Feather Hat_Clementine Hair_Zombie":
    "Aurorian_Hat_Featherr_Clementine_Zombie",
  "Feather Hat_Combed Haircut": "Aurorian_Hat_Featherr_Combed",
  "Feather Hat_Combed Haircut_Blob": "Aurorian_Hat_Featherr_Combed_Blob",
  "Feather Hat_Combed Haircut_Zombie": "Aurorian_Hat_Featherr_Combed_Zombie",
  "Feather Hat_Curly": "Aurorian_Hat_Featherr_Curved",
  "Feather Hat_Curly_Blob": "Aurorian_Hat_Featherr_Curved_Blob",
  "Feather Hat_Curly_Zombie": "Aurorian_Hat_Featherr_Curved_Zombie",
  "Feather Hat_Playmobil": "Aurorian_Hat_Featherr_Playmobile",
  "Feather Hat_Playmobil_Blob": "Aurorian_Hat_Featherr_Playmobile_Blob",
  "Feather Hat_Playmobil_Zombie": "Aurorian_Hat_Featherr_Playmobile_Zombie",
  "Dracurve Hat_No Trait": "Aurorian_Hat_Dragoon_ShavedHairs",
  "Dracurve Hat_Clementine Hair": "Aurorian_Hat_Dragoon_ClementineHairs",
  "Dracurve Hat_Combed Haircut": "Aurorian_Hat_Dragoon_CombedHairs",
  "Dracurve Hat_Combed Haircut_Blob": "Aurorian_Hat_Dragoon_CombedHairs_Blob",
  "Dracurve Hat_Curly": "Aurorian_Hat_Dragoon_CurvedHairs",
  "Dracurve Hat_Playmobil": "Aurorian_Hat_Dragoon_PlaymobileHairs",
  "Dracurve Hat_Playmobil_Blob": "Aurorian_Hat_Dragoon_PlaymobileHairs_Blob",
  "Dipking Hat_No Trait": "Aurorian_Hat_Dipking_NoHairs",
  "Dipking Hat_No Trait_Gold": "Aurorian_Hat_Dipking_ShavedHairs_BlobGold",
  "Dipking Hat_No Trait_Blob": "Aurorian_Hat_Dipking_ShavedHairs_Blob",
  "Dipking Hat_Clementine Hair": "Aurorian_Hat_Dipking_ClementineHairs",
  "Dipking Hat_Clementine Hair_Blob":
    "Aurorian_Hat_Dipking_ClementineHairs_Blob",
  "Dipking Hat_Combed Haircut": "Aurorian_Hat_Dipking_CombedHairs",
  "Dipking Hat_Curly": "Aurorian_Hat_Dipking_CurvedHairs",
  "Dipking Hat_Playmobil": "Aurorian_Hat_Dipking_PlaymobileHairs",
  "Zzoo Hat_No Trait": "Aurorian_Hat_Zzoo_Shaved",
  "Zzoo Hat_No Trait_Blob": "Aurorian_Hat_Zzoo_Shaved_Blob",
  "Zzoo Hat_Clementine Hair": "Aurorian_Hat_Zzoo_ClementineHairs",
  "Zzoo Hat_Combed Haircut": "Aurorian_Hat_Zzoo_CombedHairs",
  "Zzoo Hat_Curly": "Aurorian_Hat_Zzoo_CurvedHairs",
  "Zzoo Hat_Playmobil": "Aurorian_Hat_Zzoo_PlaymobileHairs",
  // "bg_Gradient Blue"
  // "bg_Special Orange"
  // "bg_Special Blue"
  // "bg_Blue"
  // "bg_Base Background"
  // "bg_Lagoon"
  // "bg_Soft Blue"
  "Gradient Blue": "bg_Gradient Blue",
  "Special Orange": "bg_Special Orange",
  "Special Blue": "bg_Special Blue",
  Blue: "bg_Blue",
  "Base Background": "bg_Base Background",
  Lagoon: "bg_Lagoon",
  "Soft Blue": "bg_Soft Blue",
};

export const oldNameToNewName = {
  // Cloth
  "Open Leather Jacket": "Open Commander",
  Scarf: "Open Collector",
  "Open Jacket": "Open Trader",
  "Zzoo Outfit": "Zzoo Knight",
  "Dracurve Outfit": "Dracurve Knight",
  "Dipking Outfit": "Dipking Knight",
  "Sam Outfit": "Legend of Tokane",
  "Axobubble Outfit": "Axobubble Knight",
  "Helios Outfit": "Helios Knight",
  "Beetlefox Outfit": "Beeblock Knight",
  "Dinobit Outfit": "Dinobit Knight",
  "Bitebit Outfit": "Bitebit Knight",
  "Unika Outfit": "Unika Knight",
  "Classic Jacket": "Miner",
  "Green Sweater": "Adventurer",
  "Shoulder Straps": "Cartographer",
  "Hawaii Shirt": "Hatamoto",
  "Jean Jacket": "Trader",
  "Pink Stripes": "Collector",
  "Leather Jacket": "Commander",
  "Puffy Jacket": "Rider",
  Polo: "Noble",
  Jacket: "Explorer",
  "Black Hoodie": "Cultist",
  "Black T-Shirt": "Squire",
  "Classy Outfit": "Lord",
  Overalls: "Blacksmith",
  "Yellow Stripes": "Guard",
  "Base Cloth": "Base Cloth",
  "Base Cloth_1": "Townsman",
  "Base Cloth_2": "Freeman",
  "Base Cloth_3": "Craftman",
  // hat
  "Unika Har": "Unika Hat",
  "Helios Hat": "Helios Hat",
  "Dipking Hat": "Dipking Hat",
  "Dinobit Hat": "Dinobit Hat",
  "Dracurve Hat": "Dracurve Hat",
  "Zzoo Hat": "Zzoo Hat",
  "Axoubble Hat": "Axoubble Hat",
  "Crazy Horse Hat": "Eomer Helmet",
  "Bitebit Hat": "Bitebit Hat",
  "Beetlefox Hat": "Beeblock Hat",
  "Jotaro Cap": "It's-a-me Cap",
  "Dragon Hat": "Emperor Hat",
  Moogle: "Kupo Kupo Beanie",
  "Luffy Hat": "Kaizoku Hat",
  "Sam Hat": "SOLDIER Wig",
  "Witch Hat": "Sorting Hat",
  "Plague Hat": "McDuck Hat",
  "Doughnut Hat": "Jester Hat",
  "Feather Hat": "Cavalier Hat",
  "Twitter Hat": "TwiXtter Hat",
  "Gavroche Hat": "Gavroche Cap",
  "Phantom Cap": "Backpack Cap",
  "Raccoon Hat": "Raccoin Hat",
  "Beret Hat": "Beret",
  "Cute headphone": "Cat Headphones",
  Crown: "Jeweled Crown",
  "Big Crown": "Crown",
  // hair
  "Long Blob Hair": "Long Blob Hair",
  "White Hair": "White Hair",
  "Brown Dreadlocks": "Brown Braids",
  "Purple Dreadlocks": "Short Dreadlocks",
  "Blob Hair": "Blob Hair",
  "Clementine Hair": "Blue Hair",
  "Zero Two Hair": "Zero Two Hair",
  "Blond Hair Attached": "Blond Hair",
  Pigtails: "Space Buns",
  Shaved: "Shaved",
  Undercut: "Purple Hair",
  "Green Hair": "Long Hair",
  Curly: "Curly Hair",
  Playmobil: "Short Hair",
  "Combed Haircut": "Combed Hair",
  // mouth
  Angry: "Angry",
  "Barely Angry": "Open",
  "Steampunk Mask": "Greed Grill",
  "Paint Mask": "Onizuka Smoke",
  "Bane Mask": "Scars",
  Lollipop: "Gamabunta Pipe",
  "Oni Mask": "Oni Tattoo",
  "Big Smile": "Smile",
  Grin: "Grin",
  "Plague Mask": "Cursed",
  "Zipper Mask": "Kurama Streaks",
  "Cat Mask": "Tongue Out",
  "Base Mouth": "Base Mouth",
  "Base Mouth_1": "Neutral",
  "Base Mouth_2": "Neutral 2",
  // eyes
  "Cat Eyes Black": "Brown Cat Eyes",
  "Aurory Glasses": "Tokane Eyes",
  "Cat Black Pupil": "Brown Cat Eyes",
  "Spring Glasses": "Yuna Eyes",
  "Cat Green Pupil": "Green Cat Eyes",
  "Steampunk Eyes": "Steampunk Eyes",
  "Green Eyes": "Yellow Cat Eyes",
  "Blue Skull Glasses": "Skull Eyes",
  Green: "Yellow Eyes",
  "Aave Glasses": "Golden Eyes",
  "Black Eyes": "Blue Eyes",
  "Heart Glasses": "Heart Eyes",
  "Viper Shades": "Viper Eyes",
  "Red Eyes": "Red Eyes",
  "Base Eyes": "Brown Eyes",

  "Solana Necklace": "Golden Necklace",
  "Flower Necklace": "Flower Necklace",
  "Shark Necklace": "Bone Necklace",
  "Aurory Necklace": "Coral Necklace",

  "Golden Skeleton": "Golden Skeleton",
  Helios: "Helios",
  Skeleton: "Skeleton",
  "Golden Blob": "Golden Blob",
  Zombie: "Zombie",
  "Solana Blob": "Blob",
  Human: "Human",

  Blue: "Lagoon",
  Lagoon: "Ocean",
  "Gradient Blue": "Dusk",
  "Soft Blue": "Dawn",
  "Base Background": "Violet",
  "Special Blue": "Special Blue",
  "Special Orange": "Special Orange",
};

enum SkinColor {
  Black = 0,
  Latino = 1,
  White = 2,
}

enum COMMANDS {
  SKIP = "SKIP",
}

export interface Attribute {
  display_type?: "number";
  trait_type: string;
  value: string | number;
}

interface KeyAttribute {
  key: string;
  attributes: Attribute[];
}

export function mouthFilenameConverter(
  value: string,
  skin: string,
  color: string,
  sequence: number,
  baseMouthVersion: { version: number }[]
): KeyAttribute {
  let key: string;
  let attributes: Attribute[] = [];

  if (value === "Base Mouth") {
    if (skin === "Human") {
      const version = baseMouthVersion[sequence].version
        ? baseMouthVersion[sequence].version + 1
        : 1;
      key = `${version}_Base Mouth_${color}`;
      attributes.push({
        trait_type: "Mouth",
        value: oldNameToNewName[`Base Mouth_${version}`],
      });
    } else {
      key = `Base Mouth_${skin}`;
      attributes.push({
        trait_type: "Mouth",
        value: oldNameToNewName[`Base Mouth`],
      });
    }
  } else {
    attributes.push({
      trait_type: "Mouth",
      value: value === "No Trait" ? value : oldNameToNewName[value],
    });
    if (skin === "Human") {
      key = `${value}_${color}`;
    } else {
      key = `${value}_${skin}`;
    }
  }
  return { key, attributes };
}

export function hairFilenameConverter(
  value: string,
  skin: string,
  color: string,
  sequence: number,
  hairlessVersion: { version: number }[]
): string {
  let key: string;
  if (value === "No Trait" && skin === "Human") {
    if (hairlessVersion === undefined) {
      throw new Error("Hairless version expected");
    }
    key = `${color}_${value}_${hairlessVersion[sequence].version + 1}`;
  } else if (value !== "No Trait") {
    if (skin === "Human") {
      if (value === "Shaved") {
        key = `Shaved_${color}`;
      } else {
        key = `${value}`;
      }
    } else {
      const skinNameToFileSuffix: { [key: string]: string } = {
        "Solana Blob": "Blob",
        "Golden Blob": "Gold",
        Zombie: "Zombie",
        Skeleton: "Skeleton",
      };
      key = `${value}_${skinNameToFileSuffix[skin]}`;
    }
  }
  return key;
}

export function necklaceFilenameConverter(
  necklaceRaw: string,
  skin: string,
  clothRaw: string,
  color: string,
  sequence: number,
  whiteshirtVersion: { version: number }[]
): KeyAttribute {
  const necklace = necklaceRaw.trim();
  const cloth = clothRaw.trim();
  let key: string;
  let attributes: Attribute[] = [
    {
      trait_type: "Necklace",
      value: oldNameToNewName[necklace],
    },
  ];

  if (skin === "Human") {
    if (cloth === "Base Cloth" && necklace === "No Trait") {
      key = `No Trait_${whiteshirtVersion[sequence].version + 1}`;
      attributes.push({
        trait_type: "Cloth",
        value:
          oldNameToNewName[
            `${cloth}_${whiteshirtVersion[sequence].version + 1}`
          ],
      });
    } else if (cloth === "Base Cloth") {
      key = `No Trait_${whiteshirtVersion[sequence].version + 1}_${necklace}`;
      attributes.push({
        trait_type: "Cloth",
        value:
          oldNameToNewName[
            `${cloth}_${whiteshirtVersion[sequence].version + 1}`
          ],
      });
    } else if (necklace === "No Trait") {
      key = `${cloth}`;
      attributes.push({
        trait_type: "Cloth",
        value: oldNameToNewName[cloth],
      });
    } else {
      key = `${cloth}_${necklace}`;
      attributes.push({
        trait_type: "Cloth",
        value: oldNameToNewName[cloth],
      });
    }
  } else {
    attributes.push({
      trait_type: "Cloth",
      value: cloth === "No Trait" ? cloth : oldNameToNewName[cloth],
    });
    if (cloth === "Base Cloth" && necklace === "No Trait") {
      throw new Error(
        `Error (necklaceFilenameConverter): cloth === "Base Cloth" && necklace === "No Trait"`
      );
    } else if (cloth === "Base Cloth" || cloth === "No Trait") {
      key = `No Trait_${skin}_${necklace}`;
    } else if (necklace === "No Trait") {
      key = `${cloth}_${skin}`;
    } else {
      key = `${cloth}_${necklace}`;
    }
  }

  return { key, attributes };
}

export function hatFilenameConverter(
  skin: string,
  hat: string,
  hair: string
): KeyAttribute {
  const hairT = hair.trim();
  let attributes: Attribute[] = [
    {
      trait_type: "Hat",
      value: oldNameToNewName[hat],
    },
    {
      trait_type: "Hair",
      value: hairT === "No Trait" ? hairT : oldNameToNewName[hairT],
    },
  ];

  let key = `${hat}_${hairT}`;
  if (skin !== "Human") {
    const skinNameToFileSuffix: { [key: string]: string } = {
      "Solana Blob": "Blob",
      "Golden Blob": "Gold",
      Zombie: "Zombie",
      Skeleton: "Skeleton",
    };
    key += `_${skinNameToFileSuffix[skin]}`;
  }
  return { key, attributes };
}

export function skinFilenameConverter(skin: string, color: string): string {
  if (skin === "Human") {
    return `${color}_Human`;
  } else {
    return skin;
  }
}

export function eyesFilenameConverter(
  value: string,
  skin: string,
  color: string
): KeyAttribute {
  const attributes: Attribute[] = [];
  let key;
  if (skin === "Human") {
    key = `${value}_${color}`;
    attributes.push({
      trait_type: "Eyes",
      value: oldNameToNewName[value],
    });
    // } else if (value === "No Trait" && skin !== "Skeleton") {
    //   key = "No Trait";
    //   attributes.push({
    //     trait_type: "Eyes",
    //     value: "No Trait",
    //   });
  } else {
    key = `${value}_${skin}`;
    attributes.push({
      trait_type: "Eyes",
      value: value === "No Trait" ? "No Trait" : oldNameToNewName[value],
    });
  }
  return { key, attributes };
}

export function clothFilenameConverter(
  value: string,
  skin: string,
  sequence: number,
  whiteshirtVersion: { version: number }[]
): KeyAttribute {
  const attributes: Attribute[] = [];
  let key;
  if (value === "No Trait" || value === "Base Cloth") {
    if (skin !== "Human") {
      throw new Error("This shouldn't happen");
    }
    attributes.push({
      trait_type: "Cloth",
      value:
        oldNameToNewName[
          `Base Cloth_${whiteshirtVersion[sequence].version + 1}`
        ],
    });
    key = `No Trait_${whiteshirtVersion[sequence].version + 1}`;
  } else {
    key = skin === "Zombie" ? `${value}_${skin}` : value;
    attributes.push({
      trait_type: "Cloth",
      value: oldNameToNewName[value],
    });
  }
  return { key, attributes };
}

interface ConvertedAttribute {
  trait_type: string;
  value: string;
  filePath: string;
  skinColor: string | null;
  attributes: Attribute[];
}

export function attributeConverter(
  attribute: Attribute,
  oldAttributes: Attribute[],
  skin: string,
  color: string,
  sequence: number,
  hairlessVersion: { version: number }[],
  whiteshirtVersion: { version: number }[],
  baseMouthVersion: { version: number }[]
): ConvertedAttribute | COMMANDS {
  const { trait_type, value: valueRaw } = attribute;
  const value = (valueRaw as string).trim();
  let key: string;
  let attributes: Attribute[] = [];
  if (trait_type === "Skin") {
    key = skinFilenameConverter(skin, color);
    attributes.push({
      trait_type: "Skin",
      value: oldNameToNewName[skin],
    });
  } else if (trait_type === "Mouth") {
    const keyWithAttributeKeys = mouthFilenameConverter(
      value,
      skin,
      color,
      sequence,
      baseMouthVersion
    );
    key = keyWithAttributeKeys.key;
    attributes = keyWithAttributeKeys.attributes;
  } else if (trait_type === "Hair") {
    key = hairFilenameConverter(value, skin, color, sequence, hairlessVersion);
    attributes.push({
      trait_type: "Hair",
      value: value === "No Trait" ? value : oldNameToNewName[value],
    });
  } else if (trait_type === "Necklace") {
    const cloth = oldAttributes.find((a) => a.trait_type === "Cloth")?.value;
    const keyWithAttributeKeys = necklaceFilenameConverter(
      value,
      skin,
      cloth! as string,
      color,
      sequence,
      whiteshirtVersion
    );
    key = keyWithAttributeKeys.key;
    attributes = keyWithAttributeKeys.attributes;
  } else if (trait_type === "Hat") {
    const hair = oldAttributes.find((a) => a.trait_type === "Hair")?.value;
    const keyWithAttributeKeys = hatFilenameConverter(
      skin,
      value,
      hair! as string
    );
    key = keyWithAttributeKeys.key;
    attributes = keyWithAttributeKeys.attributes;
  } else if (trait_type === "Eyes") {
    const keyWithAttributeKeys = eyesFilenameConverter(value, skin, color);
    key = keyWithAttributeKeys.key;
    attributes = keyWithAttributeKeys.attributes;
  } else if (trait_type === "Cloth") {
    const keyWithAttributeKeys = clothFilenameConverter(
      value,
      skin,
      sequence,
      whiteshirtVersion
    );
    key = keyWithAttributeKeys.key;
    attributes = keyWithAttributeKeys.attributes;
  } else if (trait_type === "Background") {
    key = value;
    attributes.push({
      trait_type: "Background",
      value: oldNameToNewName[value],
    });
  } else {
    throw new Error("Unknown trait_type " + trait_type);
  }
  if (key === COMMANDS.SKIP) {
    return COMMANDS.SKIP;
  }
  if (!attributeToNewFilenameMap[key]) {
    debugger;
    throw new Error(`No mapping found for ${key} (${trait_type})`);
  }
  const filePath = attributeToNewFilenameMap[key] + ".png";
  const skinColor = trait_type === "Skin" ? color : null;
  return {
    trait_type: trait_type,
    value: value,
    filePath: filePath,
    skinColor: skinColor,
    attributes,
  };
}

export function buildAttributes(
  oldAttributes: Attribute[],
  seqToColorName: { [key: string]: string },
  hairlessVersion: { version: number }[],
  whiteshirtVersion: { version: number }[],
  baseMouthVersion: { version: number }[],
  customBgFilePath?: string
): ConvertedAttribute[] {
  const sequence = oldAttributes.find(
    ({ trait_type }) => trait_type === " sequence" || trait_type === "sequence"
  )?.value as any as number;
  if (!sequence) {
    throw new Error("No sequence found");
  }
  const color = seqToColorName[sequence];
  const oam: { [key: string]: string } = {};
  oldAttributes.forEach(({ trait_type, value }) => {
    oam[trait_type] = value as string;
  });
  const skin = oam["Skin"];
  if (!skin) {
    throw new Error("No skin found");
  }
  const hat = oam["Hat"];
  const hair = oam["Hair"];
  const necklace = oam["Necklace"];
  const cloth = oam["Cloth"];
  const eyes = oam["Eyes"];
  const mouth = oam["Mouth"];
  const bg = oam["Background"];
  const newAttributes = oldAttributes
    .filter(({ trait_type, value }) => {
      const trait_types = ["Type", "Clothing", "generation", " sequence"];
      const excludeBg = trait_type === "Background" && customBgFilePath;
      const excludeMouth =
        trait_type === "Mouth" && skin === "Skeleton" && value === "No Trait";
      const exludeHair =
        trait_type === "Hair" &&
        (hat !== "No Trait" || (skin !== "Human" && hair === "No Trait"));
      const excludeNecklace = trait_type === "Necklace" && value === "No Trait";
      const excludeCloth_1 =
        trait_type === "Cloth" &&
        value === "No Trait" &&
        ((skin !== "Human" && necklace === "No Trait") ||
          necklace !== "No Trait");
      const excludeCloth_2 =
        trait_type === "Cloth" &&
        value !== "No Trait" &&
        necklace !== "No Trait";
      const excludeCloth = excludeCloth_1 || excludeCloth_2;
      const excludeHat = trait_type === "Hat" && value === "No Trait";
      const excludeEyes =
        trait_type === "Eyes" && value === "No Trait" && skin === "Human";

      return (
        !excludeBg &&
        !exludeHair &&
        !excludeNecklace &&
        !excludeCloth &&
        !excludeHat &&
        !trait_types.includes(trait_type) &&
        !excludeMouth &&
        !excludeEyes
      );
    })
    .map(({ trait_type, value }) =>
      attributeConverter(
        { trait_type, value: (value as string).trim() },
        oldAttributes,
        skin,
        color,
        sequence,
        hairlessVersion,
        whiteshirtVersion,
        baseMouthVersion
      )
    )
    .filter((a) => a !== COMMANDS.SKIP) as ConvertedAttribute[];

  return newAttributes;
}

export function generateHandMadeAurorian(
  attributes: Attribute[],
  sequence: number,
  imagesDirPath: string
): { bgPath: string; aurorianPath: string } | null {
  let bg, aurorianType, aurorianSkin;
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.trait_type === "Type") {
      aurorianType = attr.value;
    } else if (attr.trait_type === "Skin") {
      aurorianSkin = attr.value;
    } else if (attr.trait_type === "Background") {
      bg = attr.value;
    }
  }

  let bgPath, aurorianPath;
  if (FULL_OUTFIT_SEQUENCES.includes(sequence)) {
    aurorianPath = path.join(
      imagesDirPath,
      "1-1",
      `Aurorian_#${sequence - 1}_NoBG.png`
    );
    bgPath = path.join(imagesDirPath, `bg_${sequence - 1}.png`);
  } else if (aurorianSkin === AurorianSkin.GOLDEN_SKELETON) {
    aurorianPath = path.join(imagesDirPath, "1-1", `Aurorian_#${sequence}.png`);
    bgPath = path.join(imagesDirPath, "bg_gold_skeleton_base.png");
  } else if (aurorianSkin === AurorianSkin.SKELETON) {
    aurorianPath = path.join(imagesDirPath, "1-1", `Aurorian_#${sequence}.png`);
    bgPath = path.join(imagesDirPath, attributeToNewFilenameMap[bg] + ".png");
  } else {
    throw new Error("Unable to generate Aurorian by generateHandMadeAurorian.");
  }
  return { bgPath, aurorianPath };
}

export function buildSharpInputs(
  newAssetsPath: string,
  attributes: ConvertedAttribute[],
  width: number = 0
): { input: string; left: number; top: number }[] {
  const newAttributesMap: { [key: string]: string } = {};
  let humanSkinColor: string | undefined;
  attributes
    .filter(({ filePath }) => filePath)
    .forEach(({ trait_type, filePath, value, skinColor }) => {
      if (trait_type === "Skin") {
        humanSkinColor = skinColor!;
      }
      newAttributesMap[trait_type] = path.join(newAssetsPath, filePath);
    });
  const traitTypeOrder = [
    "Background",
    "Skin",
    "Cloth",
    "Necklace",
    "Eyes",
    "Mouth",
    "Hat",
    "Hair",
  ];
  const checkIfHead = traitTypeOrder.slice(-4);
  const specialOrder = [
    "Background",
    "Skin",
    "Cloth",
    "Necklace",
    "Eyes",
    "Hat",
    "Hair",
    "Mouth",
  ];
  let isHeadSet = false;
  const traitOrder = attributes.some(
    (a) => a.value.trim() === "Lollipop" || a.value.trim() === "Paint Mask"
  )
    ? specialOrder
    : traitTypeOrder;
  const sortedAttributes: { input: string; left: number; top: number }[] = [];
  traitOrder.forEach((traitType, i) => {
    if (
      humanSkinColor !== undefined &&
      checkIfHead.includes(traitType) &&
      !isHeadSet
    ) {
      isHeadSet = true;
      sortedAttributes.push({
        input: path.join(
          newAssetsPath,
          attributeToNewFilenameMap[`Head_${humanSkinColor}`] + ".png"
        ),
        left: width,
        top: 0,
      });
    }
    if (newAttributesMap[traitType]) {
      sortedAttributes.push({
        input: newAttributesMap[traitType],
        left: width,
        top: 0,
      });
    }
  });
  return sortedAttributes;
}
