import React from "react";
import Footer from "./FooterUI";
import { getData } from "@/app/services/strapi/page/footer";

export default async function index() {
  try {
    const data = await getData();
    return <Footer icons={data.icons} copyrightNotice={data.copyrightNotice} />;
  } catch (e) {
    console.error(e);
  }
}
