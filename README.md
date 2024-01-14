## Introduction
This repository contains the source code for a front-end project designed as part of an assignment.

## Setup and Running the Project

This project uses [Parcel](https://parceljs.org/) as its web application bundler. To get started with running the project locally on your machine, follow the steps below.

Please note that simply downloading the code and opening the `index.html` file in a browser will not work correctly. Due to the use of ES6 modules (`type="module"` in the script tag), opening the file directly from the file system will result in Cross-Origin Resource Sharing (CORS) errors.

To avoid these CORS errors, it's necessary to serve the project through a local server, which is automatically handled by Parcel.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system. This will include npm (Node Package Manager), which is required to install dependencies and run the project.

### Installation

1. Clone the repository to your local machine using your preferred method (GitHub GUI, SSH, or HTTPS).

2. Navigate to the project directory in your terminal or command prompt.

3. Run the following command to install all the required dependencies:
    ```sh
    npm install
    ```
### Running the project

After installing the dependencies, you can start the project using Parcel:

1. In the project directory, run the following command to build and run the project:
    ```sh
    npx parcel index.html
    ```
2. Parcel will start a local development server. Once the build is complete, it will provide you with a URL, usually http://localhost:1234, where you can view the application in your web browser.

## Architecture
The project follows the Model-View-Controller (MVC) architectural pattern. This separation of concerns allows for better code organization and scalability. The MVC architecture is depicted as follows:

- **Model**: Manages the data and business logic of the application.
- **View**: Handles the presentation logic and UI components.
- **Controller**: Acts as an intermediary between the Model and View, managing user interactions and updating the View accordingly. Holds the application logic.

## Folder Structure
Below is the folder structure for the project, providing an overview of how the files are organized:

![Screenshot 2024-01-14 at 8 18 11 PM](https://github.com/ikotsov/Frontend-MovieRama-YiannosKotsovilis/assets/15989223/dcbe9c08-6edc-4493-9d29-d1aa86713a4c)

## Refactor Plans
- **Observer Refactor**: Replace the current bottom screen observer with the Intersection Observer API for enhanced performance and better resource management.
- **Animation Refactor**: Update the expand/collapse animation for more performance, following best practices as described in [this article by Google Developers](https://developer.chrome.com/blog/performant-expand-and-collapse/).

## Performance Optimizations
- **Debounce Usage**: Implemented a debounce function for the search feature to minimize excessive API calls, thereby enhancing the performance and reducing the load on the server.

## Utilities and Helpers

- **Utils**: These are project-agnostic functions that can be reused across different projects. They provide a set of utility operations that are not tied to the specific business logic of the current application.
- **Helpers**: These are customized functions that are specific to the needs of this project, though they can be adapted for use in other projects if necessary.

## Possible Improvements

- **Mutation Observer**: Exploring the Mutation Observer could be a potential benefit for simplifying dynamic DOM manipulations.
