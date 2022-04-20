# Image Processing API using sharp

## Project Description

The aim of this project was to build an API, that utilizes the sharp package for processing images located on the local drive. These images are then saved locally in one folder to form a library, which contains various processed versions of each source image.

### Operational Details

To test the project (since it is only a backend project **for now** ;) ):

1- To perform the project unit tests:
    - Using the prepared script for **building & testing**: **npm run test**

2- To check the project formatting:
    - Using the prepared script for prettier (checks both Js & Ts): **npm run prettier**

3- To check the project linting: 
    - Using the prepared script for eslint (checks both Js & Ts): **npm run lint**

4- Fire up the server:
    - From start (src) code using nodemon: **npm run start**.
    - From build code: **node dist/index**.

5- Enter the route in the browser to test project manually:
    - Ex: **localhost:3000/api/images?filename=fjord&width=750&height=750&rotate=30&process=resize&ext=jpeg**

6- The Project has utilized the following processing methods from sharp package (which are set through **process** query parameter):
    - Resize (main requirement of the project).
    - Rotate (where the rotation angle is set throught the query parameter **rotate**)
    - Flip (which flips the image around the vertical axis).
    - Flop (which flips the image around the horizontal axis).
    - Sharpen & Median (which are used with the rotate middleware to enhance the image).

### Project Notes

These are some **Important notes for the reviewer** about the project:
1- The unit tests made are designed to test **each middleware** which in turns test the behaviour of the entire endpoint.

2- The main lint script compose of two linting calls (for Js & Ts each) as there are differences between the two. Ex: using Es6 import & export in TypeScript, While using Require keyword for the compiled JavaScript. Those diffrences required the use of different configuration files.

3- **Important notes for unit testing**:
    - As stated before, each middleware has it own unit tests which are written to test its functionality.
    - **To ensure** that the unit tests actually test the targeted middleware, the thumb folder (which is located inside of assets folder) **should be completely empty except for the two images already generated**.
    - The names of the images are: "thumb_fjord_500_500_0_resize" & "thumb_fjord_1920_1280_0_flip".
    - These two images are placed **Intentionally** to test the **checker** middleware.
    - It is worth noting that, **after the first iteration** of tests are run. Most of the tests which are designed to test processing middlewares would then return an OK response with status of 200, However, this response is generated from the checker function as it recognize that the file already exists (which means that the targted middleware isn't actually run).

4- The Project has six middlewares which shape the endpoint functionality (In Order):
    - Verifier: ensures that request info are valid (including process type, file extension...) and includes error handlers to provide the user with a detailed feedback about the problem (if exists).
    - Checker: searches for the existence of the required image in the thumbnail folder.
    - Resize: uses the sharp package to resize the image based on the provided dimensions.
    - Rotate: uses the sharp package to rotate the image based on the provided angle. It also enables for the image to be also resized based on the dimensions provided within the request. If no dimensions were provided, The API utilizes the **image-size** package to set the dimensions of the rotated image based on the dimensions of the source image.
    - Flip & Flop: flips the image around Y & X axis. And also include the resizing option.

5- This project has achieved the following extra functionalities: 
 - Utilizes all the available image extensions with the sharp package.
 - Capable of creating multiple resized images from the same sources image by modifiying the thumbnail name.
 - Added extra processing capabilities by utilizing more aviable methods of the sharp package.
 - Added logging functionality to the code to record when a file is generated or accessed.