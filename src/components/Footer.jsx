import React from 'react'

const Footer = () => {
  return (
    <footer class="fixed bottom-0 left-0 z-20 w-full p-4  bg-gray-800 border-t border-gray-600 md:hidden shadow ">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © 2023{" "}
      <a href="https://flowbite.com/" class="hover:underline">
        Flowbite™
      </a>
      . All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a href="#" class="hover:underline me-4 md:me-6">
          About
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline me-4 md:me-6">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline me-4 md:me-6">
          Licensing
        </a>
      </li>
      <li>
        <a href="#" class="hover:underline">
          Contact
        </a>
      </li>
    </ul>
  </footer>
  )
}

export default Footer