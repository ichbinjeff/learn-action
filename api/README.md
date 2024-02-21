# Website

## Tech stack

The website is built using NextJS 14 and is set to generate a static export when the build is run.
This project uses typescript. Styles are handled by tailwindcss.

## Development

Website code is under `articul8` folder. NodeJS is required.
Run `npm i` to install the dependencies, and then `npm run dev` to spin up the development server. 

The website reloads automatically when any files are changed.

Static assets are stored unders `/articul8/public` folder. When adding an image, save it to this folder, and on the img html tag, set 
the src as `<img src="/myimage.png" />` 

Before commiting the code with changes, run `npm run build` to make sure there are no issues in generating the static export.

## Deployment

The deployment is handled by the github actions pipeline whenever a branch is merged into the `dev` branch.

# SES Configuration Instructions

This service requires SES configuration: 

1. In the AWS console, open SES and verify the email addresses and/or domains. 
2. In the file `index.mjs` set the constants `EMAIL_SOURCE` and `EMAIL_DESTINATION` 
   accordingly (e.g. new_contact@articul8.com, info@articul8.com). 
