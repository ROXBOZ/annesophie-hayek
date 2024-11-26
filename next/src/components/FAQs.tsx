import React, { useState } from "react";

import { PortableText } from "@portabletext/react";

function FAQs({ faqs, lang }: { faqs: FAQ[]; lang: "en" | "fr" }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="mt-24 flex flex-col">
      <h2 className="sr-only">
        {lang === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
      </h2>
      <div className="flex w-full flex-col gap-1 divide-y divide-primary-300 *:pt-1">
        {faqs &&
          faqs.map((faq: FAQ, index: number) => (
            <div key={index} className="flex w-full flex-col first:pt-0">
              <button
                onClick={() => toggleAnswer(index)}
                className="flex w-full items-center justify-between"
              >
                <h3 className={` ${expandedIndex === index && "font-bold"}`}>
                  {faq.question[lang]}
                </h3>
                <div className="relative *:absolute *:right-0 *:flex *:h-[1.5px] *:w-3 *:bg-primary-950">
                  <span />
                  <span
                    className={`rotate-90 ${expandedIndex === index && "opacity-0"}`}
                  />
                </div>
              </button>
              {expandedIndex === index && (
                <div className="pb-8 pt-2">
                  <PortableText value={faq.answer[lang]} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FAQs;
