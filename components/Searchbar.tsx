"use client";

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon")) {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

const Searchbar = () => {

  const [searchPrompt, setSearchPrompt] = useState("https://www.amazon.in/dp/B0CS5XW6TN/ref=syn_sd_onsite_desktop_0?ie=UTF8&psc=1&pd_rd_plhdr=t&aref=QUjPRysp9O");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);
      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder='Enter product link'
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)} />

      <button
        type='submit'
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default Searchbar
