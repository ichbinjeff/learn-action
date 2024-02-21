import ContactForm from "@/app/components/common/Form/ContactForm";
import { getData } from "@/app/services/strapi/page/homepage/contactUs";

export default async function ContactUs() {
  try {
    const data = await getData();
    const formHeight = "max-h-[880px] md:h-[780px]";
    return (
      <div id="contact-us">
        <div
          className={`w-full ${formHeight} bg-primary-darkBlue relative overflow-hidden`}>
          {/* Gradients */}
          <div className="hero-top-gradient"></div>
          <div className="hero-bottom-gradient"></div>

          <div className="relative mt-8  mx-auto ">
            <ContactForm header={data.header} />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
