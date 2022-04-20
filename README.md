# Image Processing API using sharp

## Project Description

The aim of this project was to build an API, that utilizes the sharp package for processing images located on the local drive. These images are then saved locally in one folder to form a library, which contains various processed versions of each source image.

### Operational Details

To test the project (since it is only a backend project **for now** ;) ):

1- To perform the project unit tests: <br> - Using the prepared script for **building & testing**: **npm run test**

2- To check the project formatting: <br> - Using the prepared script for prettier (checks both Js & Ts): **npm run prettier**

3- To check the project linting: <br> - Using the prepared script for eslint (checks both Js & Ts): **npm run lint**

4- Fire up the server: <br> - From start (src) code using nodemon: **npm run start**. <br> - From build code: **node dist/index**.

5- Enter the route in the browser to test project manually: <br> - Ex: **localhost:3000/api/images?filename=fjord&width=750&height=750&rotate=30&process=resize&ext=jpeg**

6- The Project has utilized the following processing methods from sharp package (which are set through **process** query parameter): <br> - Resize (main requirement of the project). <br> - Rotate (where the rotation angle is set throught the query parameter **rotate**). <br> - Flip (which flips the image around the vertical axis). <br> - Flop (which flips the image around the horizontal axis). <br> - Sharpen & Median (which are used with the rotate middleware to enhance the image).

### Project Notes

These are some **Important notes for the reviewer** about the project: <br>
1- The unit tests made are designed to test **each middleware** which in turns test the behaviour of the entire endpoint.

2- The main lint script compose of two linting calls (for Js & Ts each) as there are differences between the two. Ex: using Es6 import & export in TypeScript, While using Require keyword for the compiled JavaScript. Those diffrences required the use of different configuration files.

3- **Important notes for unit testing**: <br> - As stated before, each middleware has it own unit tests which are written to test its functionality. <br> - **To ensure** that the unit tests actually test the targeted middleware, the thumb folder (which is located inside of assets folder) **should be completely empty except for the two images already generated**. <br> - The names of the images are: "thumb_fjord_500_500_0_resize" & "thumb_fjord_1920_1280_0_flip". <br> - These two images are placed **Intentionally** to test the **checker** middleware. <br> - It is worth noting that, **after the first iteration** of tests are run. Most of the tests which are designed to test processing middlewares would then return an OK response with status of 200, However, this response is generated from the checker function as it recognize that the file already exists (which means that the targted middleware isn't actually run).

4- The Project has six middlewares which shape the endpoint functionality (In Order): <br> - Verifier: ensures that request info are valid (including process type, file extension...) and includes error handlers to provide the user with a detailed feedback about the problem (if exists). <br> - Checker: searches for the existence of the required image in the thumbnail folder. <br> - Resize: uses the sharp package to resize the image based on the provided dimensions. <br> - Rotate: uses the sharp package to rotate the image based on the provided angle. It also enables for the image to be also resized based on the dimensions provided within the request. If no dimensions were provided, The API utilizes the **image-size** package to set the dimensions of the rotated image based on the dimensions of the source image. <br> - Flip & Flop: flips the image around Y & X axis. And also include the resizing option.

5- This project has achieved the following extra functionalities: <br>

- Utilizes all the available image extensions with the sharp package. <br>
- Capable of creating multiple resized images from the same sources image by modifiying the thumbnail name. <br>
- Added extra processing capabilities by utilizing more aviable methods of the sharp package. <br>

**The following updates are made for the project based on the review** <br>
1- The package.json dependencies now only includes: sharp, images-size, express.<br>
2- Taken into consideraton the errors that may occur in the case of (width, height, angle) being an alphabet character. Also taken into consideration that the width & height should be always a positive integer. <br>
3- included tests for the new image processing functions (sharp*.ts) after it has been seperated (resize.ts -> resize.ts & sharpResize.ts). <br>
4- included missing type parameters and return types. <br>
5- prettier & lint only work on the ts files now.
