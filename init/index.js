const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  try {
    if (!initData || !Array.isArray(initData.data)) {
      throw new Error("initData.data is missing or not an array");
    }
    console.log("seed count:", initData.data.length);

    // normalize each doc to match schema: image should be an object { filename, url } and title must exist
    const normalized = initData.data
      .filter(d => {
        if (!d || !d.title) {
          console.warn("Skipping doc missing title:", d && JSON.stringify(d).slice(0, 80));
          return false;
        }
        return true;
      })
      .map(d => {
        const out = { ...d };
        // handle image being a string url or an object
        if (!out.image) {
          out.image = { filename: "", url: "" };
        } else if (typeof out.image === "string") {
          out.image = { filename: "", url: out.image };
        } else if (out.image.url && typeof out.image.url === "string") {
          out.image = { filename: out.image.filename || "", url: out.image.url };
        } else {
          out.image = { filename: out.image.filename || "", url: "" };
        }
        return out;
      });

    await Listing.deleteMany({});
    const res = await Listing.insertMany(normalized, { ordered: false, runValidators: true });
    console.log("data initialized, inserted:", res.length);
  } catch (err) {
    console.error("initDB error:", err);
    if (err && err.writeErrors) {
      console.error("writeErrors:", err.writeErrors.map(e => e.err && e.err.message));
    }
  }
}

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
  await initDB();
}

// only run when executed directly
if (require.main === module) {
  main().catch(err => console.error("connection error:", err));
}

module.exports = { main, initDB };
// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();