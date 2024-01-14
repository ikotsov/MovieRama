## Introduction
This repository contains the source code for a front-end project designed as part of an assignment.

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
