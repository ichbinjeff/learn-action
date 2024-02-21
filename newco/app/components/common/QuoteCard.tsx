import { FC } from "react";

export interface IQuoteCard {
  text: string;
  author: string;
  authorTitle: string;
  imgAlt?: string;
  companyName: string;
  logo: string;
}
interface IQuoteCardProps extends IQuoteCard {
  cardWidthClass?: string;
  cardHeightClass?: string;
}

const QuoteCard: FC<IQuoteCardProps> = ({
  text,
  author,
  authorTitle,
  companyName,
  logo,
  imgAlt,
  cardWidthClass = "md:max-w-[550px]",
  cardHeightClass = "max-h-[700px] md:h-[440px]"
}: IQuoteCardProps) => {
  return (
    <div
      className={`border-rounded-bl-none  default-border bg-neutral-white mt-3 ${cardHeightClass} ${cardWidthClass} overflow-auto `}>
      <div className="flex flex-col pt-6 px-4 h-full">
        <blockquote className="body1 mb-7">“{text}”</blockquote>
        <div className="flex items-center justify-between mt-auto mb-7">
          <div>
            {logo && (
              <img src={logo} alt={imgAlt || ""} className="h-6 md:h-7" />
            )}
          </div>
          <div className="flex flex-row">
            <div>—</div>
            <div className="pl-1">
              <div className="subtitle2">{author}</div>
              <div className="subtitle2">
                {authorTitle}, {companyName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
