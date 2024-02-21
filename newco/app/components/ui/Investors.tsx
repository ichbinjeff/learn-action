import { FC } from "react";
import QuoteCard from "../common/QuoteCard";
import { getData } from "@/app/services/strapi/page/homepage/investors";
import { IInvestorQuote } from "@/app/services/strapi/types";

const Investors: FC = async () => {
  try {
    const data = await getData();

    return (
      <div className="mx-4 mb-8 content-container">
        <h2 className="pb-7 pt-8 text-center">{data.header}</h2>
        <div className="justify-center flex flex-col md:flex-row md:flex-wrap md:gap-7">
          {data?.quotes.map((quote: IInvestorQuote, index) => (
            <QuoteCard
              key={`quoteCard-${index}`}
              text={quote.quote}
              author={quote.personName}
              authorTitle={quote.personRole}
              companyName={quote.companyName}
              logo={quote.companyLogo?.url || ""}
              cardWidthClass="md:w-[550px]"
              imgAlt={quote.companyLogo?.alternativeText || ""}
            />
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

export default Investors;
