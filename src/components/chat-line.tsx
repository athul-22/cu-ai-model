import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatGPTMessage } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import { sanitizeAndFormatText } from "@/lib/utils";
import ReactLinkify from "react-linkify";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

// Function to convert plain text with URLs into clickable links
const parseTextWithLinks = (
  text: string | React.ReactNode,
  isDarkTheme: boolean
) => {
  if (typeof text === "string") {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isDarkTheme
                ? "text-blue-400 underline"
                : "text-blue-500 underline"
            }
          >
            {part}
          </a>
        );
      }
      return convertNewLines(part);
    });
  }

  // If the input is already a ReactNode, return it as is
  return text;
};

export function ChatLine({
  role = "assistant",
  content,
  sources,
  isDarkTheme = false,
}: ChatGPTMessage & { isDarkTheme?: boolean }) {
  if (!content) {
    return null;
  }

  // Check if content includes "tokens-ended"
  const isTokenEnded = content.includes("tokens-ended");

  // Display only the part of content before "tokens-ended"
  const displayContent = isTokenEnded ? content.split("tokens-ended")[0] : content;


  const formattedMessage = convertNewLines(content);

  // Define styles for light and dark themes
  const lightLinkStyle = {
    color: "#032D42", 
    backgroundColor: "#C6EBFD",
    padding: "3.5px",
    borderRadius: "5px",
  };

  const darkLinkStyle = {
    color: "#032D42", // Dark green color
    backgroundColor: "#F0FAFF",
    padding: "3.5px",
    borderRadius: "5px",
  };

  const linkDecorator = (
    href: string | undefined,
    text: string,
    key: React.Key
  ) => (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={isDarkTheme ? darkLinkStyle : lightLinkStyle}
    >
      {text}
    </a>
  );

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role !== "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : isDarkTheme
                ? "text-blue-400"
                : "text-blue-500"
            }
          >
            {role === "assistant" ? "SAGA" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ReactLinkify componentDecorator={linkDecorator}>
            {displayContent}
          </ReactLinkify>
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown linkTarget="_blank">
                        {sanitizeAndFormatText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
