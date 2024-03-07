/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },

      {
        protocol: "https",
        hostname: "scontent.fhan3-3.fna.fbcdn.net",
        port: "",
      },

      {
        protocol: "https",
        hostname: "cdn.sforum.vn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nhanmachatc.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "down-vn.img.susercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cf.shopee.vn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "inkythuatso.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
        port: ""
      },
      {
        protocol:"https",
        hostname:"image.uniqlo.com",
        port:''
      }

    ],
  },
};
