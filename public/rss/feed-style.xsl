<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.01//EN" doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>

  <xsl:template match="/rss">
    <html>
      <head>
        <title><xsl:value-of select="channel/title"/></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&amp;family=Poppins:wght@700;800&amp;display=swap');

          :root {
            /* LIGHT MODE (Default) */
            --color-primary: #2563eb; 
            --color-accent: #f59e0b; 
            --color-surface-base: #ffffff; 
            --color-surface-secondary: #f8fafc;
            --color-text-main: #1f2937; 
            --color-text-sub: #6b7280; 
            
            /* Fonts */
            --font-sans: 'Inter', sans-serif, ui-sans-serif, system-ui; 
            --font-display: 'Poppins', sans-serif, ui-sans-serif, system-ui;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --color-primary: #3b82f6; /* Lighter Blue */
              --color-accent: #fcd34d; /* Lighter Amber */
              --color-surface-base: #0f172a; /* Deep blue-gray */
              --color-surface-secondary: #1e293b; /* Slightly lighter background */
              --color-text-main: #f3f4f6; /* Near-white */
              --color-text-sub: #9ca3af; /* Light gray */
            }
          }

          body {
            font-family: var(--font-sans);
            line-height: 1.625; 
            color: var(--color-text-main);
            background-color: var(--color-surface-base);
            max-width: 800px;
            margin: 2em auto;
            padding: 0 1.5rem;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          header {
            border-bottom: 2px solid var(--color-text-sub);
            padding-bottom: 1.5em;
            margin-bottom: 2em;
          }
          
          h1 {
            font-family: var(--font-display);
            color: var(--color-text-main);
            font-size: 2.5em;
            margin-bottom: 0.2em;
          }

          a {
            color: var(--color-primary);
            text-decoration: none;
          }
          
          a:hover {
            color: var(--color-accent);
          }
          
          .description {
            color: var(--color-text-sub);
            font-size: 1.1em;
          }
          
          .feed-item {
            border-bottom: 1px solid var(--color-text-sub);
            padding: 1.5em 0;
          }
          
          .feed-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          
          .item-title a {
            font-family: var(--font-display);
            font-size: 1.5em;
            font-weight: bold;
          }
          
          .item-title a:hover {
            color: var(--color-accent);
          }
          
          .item-description {
            margin-top: 0.5em;
            color: var(--color-text-main);
          }
          
          .item-date {
            font-size: 0.9em;
            color: var(--color-text-sub);
            margin-top: 0.5em;
            display: block;
          }
        </style>
      </head>
      
      <body>
        <header>
          <h1><xsl:value-of select="channel/title"/></h1>
          <p class="description"><xsl:value-of select="channel/description"/></p>
          <p><a href="{channel/link}">View Website</a></p>
        </header>

        <main>
          <xsl:for-each select="channel/item">
            <div class="feed-item">
              <h2 class="item-title">
                <a href="{link}">
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <span class="item-date">
                Published: <xsl:value-of select="substring(pubDate, 6, 11)"/> 
              </span>
              <p class="item-description"><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
