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
import ReactLinkify from 'react-linkify';


// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

// Function to convert plain text with URLs into clickable links
const parseTextWithLinks = (text: string | React.ReactNode, isDarkTheme: boolean) => {
  if (typeof text === 'string') {
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
            className={isDarkTheme ? "text-blue-400 underline" : "text-blue-500 underline"}
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

  const formattedMessage = convertNewLines(content);

  // Define styles for light and dark themes
  const lightLinkStyle = {
    color: '#006da3', // Light green color
    backgroundColor:'#abe3ff',
    padding:'5px',
    borderRadius:'5px',
    
  };

  const darkLinkStyle = {
    color: '#003e64', // Dark green color
    backgroundColor:'#abe3ff',
    padding:'5px',
    borderRadius:'5px',
  };

  // Custom component decorator for links
  const linkDecorator = (href, text, key) => (
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
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ReactLinkify componentDecorator={linkDecorator}>
            {formattedMessage}
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