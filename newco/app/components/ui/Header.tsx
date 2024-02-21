import NavBar from "@/app/components/common/Nav/NavBar";
import { getData } from "@/app/services/strapi/page/header";

export default async function Header({ current }: { current: string }) {
  try {
    const data = await getData();
    return (
      <div id="header">
        <NavBar
          // Check if current link is active, if so, underline it
          current={current}
          logo={data.companyLogo.url || "/a8logo_new.svg"}
          hotzoneText={data.hotzoneText}
          navLinks={data.navLinks || [{ href: "/about", text: "company" }]}
          buttonColor="black"
        />
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
