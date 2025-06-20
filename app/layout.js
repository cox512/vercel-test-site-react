import "./globals.css";
import IntercomProvider from "../components/IntercomProvider";

export const metadata = {
  title: "Intercom Test Site - React",
  description: "A React-based Intercom test site",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <IntercomProvider>{children}</IntercomProvider>
      </body>
    </html>
  );
}
