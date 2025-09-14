import React from 'react'

const Footer = () => {
  return (
    <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-twitter-surface border-t border-twitter-border md:hidden shadow ">
    <span class="text-sm text-twitter-textSecondary sm:text-center">
      © 2023{" "}
      <a href="https://flowbite.com/" class="hover:underline text-twitter-primary">
        Flowbite™
      </a>
      . All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-twitter-textSecondary sm:mt-0">
      <li>
        <a href="#" class="hover:underline me-4 md:me-6 hover:text-twitter-primary">
          About
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline me-4 md:me-6 hover:text-twitter-primary">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline me-4 md:me-6 hover:text-twitter-primary">
          Licensing
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline hover:text-twitter-primary">
          Contact
        </a>
      </li>
    </ul>
  </footer>
  )
}

export default Footer